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
            console.log(data);
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
        </div>
    );
}

export default App;