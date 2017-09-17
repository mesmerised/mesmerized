import { toUrl } from '@utils/url.utils';
import * as StorageUtils from '@utils/storage.utils';
import apiConfigs from '../configs/api.config';
import cacheConfigs from '../configs/cache.config';

const { appid, base, uris } = apiConfigs;
const currentWeatherApiUrl = `${base}${uris.current}`;
const prefetchedWeatherCacheKey = cacheConfigs.current;

// weather api defaults
const DEFAULTS = {
    appid,
};


/**
 * Fetch current weather from the API.
 *
 * @see https://openweathermap.org/current
 *
 * @param  {Object} params  Supported parameters
 * @return {Promise}        Promise that returns JSON data (Quote object)
 */
export function fetchCurrentWeather(params = {}) {
    params = {...DEFAULTS, ...params};

    const url = toUrl(currentWeatherApiUrl, params);

    return fetch(url)
        .then(response => response.json())
        .catch(response => ({}));
}


/**
 * Returns a promise that resolves with the weather data
 * for the given coordinates. It also accepts an optional
 * refresh interval configuration to return either cached
 * data or a fresh one.
 *
 * @param  {Number} options.longitude       Longitude
 * @param  {Number} options.latitude        Latitude
 * @param  {Number} options.refreshInterval Refresh Interval
 * @return {Promise}                        Weather Data Promise
 */
export function getWeatherForLocation({ longitude, latitude, refreshInterval = 0 }) {
    if (!longitude || !latitude) return Promise.reject();

    longitude = longitude.toFixed(2);
    latitude = latitude.toFixed(2);

    const prefetchedWeather = StorageUtils.get(prefetchedWeatherCacheKey);

    if (prefetchedWeather) {
        const { coord = {}, dt } = prefetchedWeather;
        let { lon, lat } = coord;
        const lastUpdateTime = new Date(dt*1000).getTime();
        const currentTime = new Date().getTime();

        lon = lon.toFixed(2);
        lat = lat.toFixed(2);

        // if the provided coordinates match
        // and the last updated time was in
        // the recent past, return the prefetched weather data
        if (lon === longitude && lat === latitude
            && (currentTime - lastUpdateTime) < refreshInterval) {
            return Promise.resolve().then(x => prefetchedWeather);
        }
    }

    return fetchCurrentWeather({lon: longitude, lat: latitude})
        .then(weatherData => {
            StorageUtils.set(prefetchedWeatherCacheKey, weatherData);
            return weatherData;
        });
}
