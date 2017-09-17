import React, { Component } from 'react';
import WeatherComponent from '../components/Weather';
import { getWeatherForLocation } from '../utils/api';
import { toCelsius, toFahrenheit } from '@utils/general.utils';
import * as StorageUtils from '@utils/storage.utils';
import { METRIC } from '../configs/constants';
import cacheConfigs from '../configs/cache.config';
import Settings from '../utils/settings';

const lastPositionCacheKey = cacheConfigs.lastPosition;
const GEO_OPTIONS = { enableHighAccuracy: true };

// call the handler if there is an existing position in the cache
function handleGeolocationUpdateForLastFetchedPosition(context) {
    const lastPosition = StorageUtils.get(lastPositionCacheKey);
    lastPosition && Object.entries(lastPosition).length
        && context.handleGeolocationUpdate(lastPosition);
}

class Weather extends Component {
    state = {
        temperature: 0,
        cityName: '',
        iconId: '',
        unit: Settings.unit,
        refreshInterval: Settings.refreshInterval,
        showWeather: Settings.showWeather,
    };

    // @todo: handle geolocation errors
    componentDidMount() {
        const { refreshInterval } = this.state;

        // initialize the initial update
        handleGeolocationUpdateForLastFetchedPosition(this);

        // update in the given intervals
        this.intervalId = setInterval(() =>
            handleGeolocationUpdateForLastFetchedPosition(this), refreshInterval);

        // listen to any geolocation updates
        this.wpid = navigator.geolocation.watchPosition(
            this.handleGeolocationUpdate, () => {}, GEO_OPTIONS);
    }

    componentWillUnmount() {
        this.intervalId && clearInterval(this.intervalId);
        this.wpid && navigator.geolocation.clearWatch(this.wpid);
    }

    handleGeolocationUpdate = position => {
        const { coords = {} } = position;
        const { latitude, longitude } = coords;

        // cache last position update
        StorageUtils.set(lastPositionCacheKey,
            { coords: { latitude, longitude } });

        const { refreshInterval } = this.state;
        // @todo: handle errors
        getWeatherForLocation({latitude, longitude, refreshInterval})
            .then(this.handleDataUpdate).catch(x => x);
    };

    handleDataUpdate = (data = {}) => {
        const { main = {}, weather = [], name = '' } = data;
        const { temp } = main;
        const { icon } = weather[0];
        const { unit } = this.state;
        let temperature;

        if (temp) {
            temperature = unit === METRIC.FAHRENHEIT ?
                toFahrenheit(temp) : toCelsius(temp);
        }
        this.setState({temperature, cityName: name, iconId: icon});
    };

    render() {
        const { temperature, cityName, iconId, showWeather } = this.state;
        const props = { temperature, cityName, iconId };

        if (!showWeather) return null;

        return (
            temperature ? <WeatherComponent { ...props } /> : null
        );
    }
}

export default Weather;
