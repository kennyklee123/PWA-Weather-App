import React, { useState } from 'react' ;
import { fetchWeather } from './api/fetchWeather';
import './App.css';

//value needs to be something in the state
//onChange has to be something coming from the state 
const App = () => {
    const[query,setQuery] = useState(''); 
    const[weather, setWeather] = useState({});//{} means an empty object

    //an async function to search
    const search = async (e) => {
        //handling the event where the pressed key is enter which makes a search
        if(e.key === 'Enter'){
            const data = await fetchWeather(query) 
           // console.log(data);
            setWeather(data); //setweather = data we have received
            setQuery('');//resets the query string after they hit enter
        }
    }
    return (
        <div className = "main-container">
            <input
                type = "text"
                className = "search"
                placeholder = "Search ..."
                value = {query} 
                onChange = {(e) => setQuery(e.target.value)}
                onKeyPress = {search}
            />
            {/*If weather.main exists then it will return the react component in the ( ) part, thats what the && does, if it doesnt exist it doesnt makea the component
               I have the country super scripped(on top) of the city
             */}
            {weather.main && (
                <div className = "city">
                    <h2 className = "city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className = "city-temp">
                        {weather.main.temp}
                        <sup>&deg;F</sup>
                    </div>
                    {/*Improve by maybe desstructuring weather instead of doing weather.weight[0]
                        the first item in weather is the description*/}
                    <div className = "info">                    
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
                        <p>{weather.weather[0].description}</p>
                        <p>{weather.main.humidity}</p>
                        <p>{weather.main.feels_like}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;