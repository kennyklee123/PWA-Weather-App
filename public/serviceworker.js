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
  the fetch is another promise, so we handle a promise's .theb with another promise
  we match all the request that the page is receiving like a request for the API call, to show an image
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
    
}); 
