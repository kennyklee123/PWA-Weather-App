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
             */}
            {weather.main && (
                <div className = "city">
                    <h2 className = "city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                </div>
            )}
        </div>
    );
}

export default App;