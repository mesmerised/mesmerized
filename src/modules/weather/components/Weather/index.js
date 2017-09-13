import React from 'react';
import './style.css'

const imageBaseUrl = 'https://openweathermap.org/img/w';

const Weather = ({ temperature, cityName, iconId }) => (
    <div className="weather">
        { temperature &&
            <div className="weather__temperature">{ Math.round(temperature) }</div>
        }
        { iconId &&
            <img src={`${imageBaseUrl}/${iconId}.png`} className="weather__image" alt="" />
        }
        { cityName &&
            <div className="weather__cityName">{ cityName }</div>
        }
    </div>
);

export default Weather;
