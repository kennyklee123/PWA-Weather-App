import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

//use an async function to fetch data
//only paramter query is the name of the town we are searching for 
export const fetchWeather = async (query) => {
    //second paramter to our get request is our object of parameters
    //we don't want the whole response, we just want the data hence why i use destructure
    const {data} = await axios.get(URL, { 
        params: {
            q: query, 
            units: 'metric',
            APPID: API_KEY
        }
    });
    return data;
}     