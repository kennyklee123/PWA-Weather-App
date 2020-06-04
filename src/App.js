import React, { useState } from 'react' ;
import { fetchWeather } from './api.fetchWeather';
import './App.css';

//value needs to be something in the state
//onChange has to be something coming from the state 
const App = () => {
    const[query,setQuery] = useState(''); 
    
    //an async function to search
    const search = async (e) => {
        //if the pressed key = enter, we make a search
        if(e.key === 'Enter'){

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
            />
        </div>
    );
}

export default App;