import React from 'react';
import './style.css'

const Weather = ({ temperature, cityName, iconId, isLoading }) => (
    <div className={ isLoading ? "weather weather__loading" : "weather" }>
        { temperature &&
            <div className="weather__temperature">{ Math.round(temperature) }</div>
        }
        { iconId &&
            <i className={`weather__icon weather__icon_${iconId}`} />
        }
        { cityName &&
            <div className="weather__cityName">{ cityName }</div>
        }
    </div>
);

export default Weather;
