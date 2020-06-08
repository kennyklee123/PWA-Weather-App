const CACHE_NAME = "version-1"; //v1 of the cache
const urlsToCache = ['index.html', 'offline.html'];

const self = this; //this refers to the service worker

//Install the Service Worker and 
self.addEventListener('install', (event) => {
    //We wait until the cache opens and it returns a promise
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache); //add the urls to the cache
            })
    )

}); 

/*Listen for any requests, a promise is returned and for each request we return a fetch of that request
  the fetch is another promise, so we handle a promise's .then with another promise
  we match all the request that the page is receiving like a request for the API call, to show an image, etc
 .then: for all requests we fetch them again(the return part) because we don't want to store the data about the API, since they alwys want the current weather
 .catch it couldnt fetch the data which means no internet connection so we load offline.html
*/
self.addEventListener('fetch', () => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
}); 

//Active the Service worker
self.addEventListener('activate', () => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);//we want to keep the cache we are working iwth
    //caches.keys returns a promise that resolves to an array of Cache keys
    //for the .then we receive cacheNames
    // we loop through the cacheNames and  do the if check
    //we end up with an arraylist of allowed caches since we used .map
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) //if the cache white list doesn't include the cache name, we delete it
                    return caches.delete(cacheName);
            })
        ))
    )
}); 
