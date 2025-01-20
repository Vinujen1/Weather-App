import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    // OpenWeatherMap API Key
    const API_KEY = '386221a6e5169c9fb0b1462a425d4391'; // Replace with your actual API key

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );
            setWeather({
                city: response.data.name,
                temperature: response.data.main.temp,
                description: response.data.weather[0].main.toLowerCase(),
                icon: response.data.weather[0].icon,
            });
        } catch (error) {
            alert('City not found. Please try again.');
            console.error('Error fetching weather:', error);
        }
    };

    // Function to get the appropriate background style based on weather description
    const getBackgroundStyle = (description) => {
        switch (description) {
            case 'snow':
                return {
                  background: 'linear-gradient(to bottom, #dfe4ea, #c8d6e5)',
                  animation: 'gradientAnimation 8s ease infinite',                };
            case 'rain':
            case 'drizzle':
                return {
                  background: 'linear-gradient(to bottom, #74b9ff, #0984e3)',
                  animation: 'gradientAnimation 8s ease infinite',                };
            case 'clouds':
                return {
                  background: 'linear-gradient(to bottom, #b2bec3, #636e72)',
                  animation: 'gradientAnimation 8s ease infinite',                };
            case 'clear':
                return {
                  background: 'linear-gradient(to bottom, #ffeb3b, #ffc107)',
                  animation: 'gradientAnimation 8s ease infinite',                };
            default:
                return {
                  background: 'linear-gradient(to bottom, #6a89cc, #4a69bd)',                };
        }
    };

    // Preload GIFs to avoid loading delay
    useEffect(() => {
        const preloadImages = () => {
            const images = ['./assets/snow.gif', './assets/rain.gif', './assets/clouds.gif', './assets/clear.gif'];
            images.forEach((src) => {
                const img = new Image();
                img.src = src;
            });
        };
        preloadImages();
    }, []);

    return (
        <div
            className="app"
            style={weather ? getBackgroundStyle(weather.description) : {}}
        >
            <h1>Weather App</h1>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Get Weather</button>
            {weather && (
                <div className="weather-card">
                    <h2>{weather.city}</h2>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        alt="Weather Icon"
                    />
                    <p>{weather.temperature}°C</p>
                    <p>{weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}</p>
                </div>
            )}
        </div>
    );
};

export default App;
