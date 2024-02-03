import { useState } from 'react';

function Weather() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const searchLocation = async (event) => {
        if (event.key === 'Enter') {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=12370b6a18e1adac5de15398925cab67`);
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const jsonData = await response.json();
                setData(jsonData);
                console.log(jsonData);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const kelvinToCelsius = (kelvin) => {
        const celsius = Math.round((kelvin - 273) * 10) / 10;
        return celsius;
    };

    const mphToKph = (mph) => {
        const kph = Math.round(mph * 1.609344 * 10) / 10;
        return kph;
    };

    return (
        <div className="weather">
            <div className="search">
                <input  type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        placeholder="Enter location" 
                        onKeyPress={searchLocation}>
                        </input>
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{kelvinToCelsius(data.main.temp)}°C</h1> : null}
                    </div>
                    <div className="desc">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>
                { data.main && 
                <div className="bottom">
                    <div className="feels">
                        {data.main ? <p className="bold"> {kelvinToCelsius(data.main.temp)}°C </p> : null}
                        <p>Feels Like</p>
                    </div>
                    <div className="humidity">
                        {data.main ? <p className="bold"> {data.main.humidity}% </p> : null}
                        <p>Humidity</p>
                    </div>
                    <div className="wind">
                        {data.main ? <p className="bold"> {mphToKph(data.wind.speed)} KPH </p> : null}
                        <p>Wind Speed</p>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}

export default Weather;