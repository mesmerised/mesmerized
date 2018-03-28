import * as StorageUtils from '@utils/storage.utils';
import cacheConfigs from '../configs/cache.config';
import { METRIC } from '../configs/constants';
import { toCelsius, toFahrenheit } from '@utils/general.utils';
import store, { getStateObject } from './store';
import { getWeatherForLocation } from '../utils/api';
import Settings from './settings';
import { setSettingByStoreAndSettings } from '@actions/settings';


export function refresh(force = true) {
    store.state = { ...store.state, ...getStateObject() };
    refreshWeather({ cacheEnabled: !force });
}

export function updatePosition(payload = {}) {
    let { position = {} } = payload;
    const { coords = {} } = position;
    const { latitude, longitude } = coords;

    // simplified object structure which can be persisted
    // the `position` and `coords` objects returned by
    // the `geolocation` api is not plain object
    // and hence storing it in the localStorage will not work
    position = { coords: { latitude, longitude } };

    // cache last position update
    StorageUtils.set(cacheConfigs.lastPosition, position);

    store.state = {...store.state, position};
}

export function handleDataUpdate(payload = {}) {
    const { data = {} } = payload;
    const { main = {}, weather = [], name: cityName = '' } = data;
    const { temp } = main;
    const { icon: iconId } = weather[0];
    const { unit } = store.state;
    const isLoading = false;
    let temperature;

    if (temp) {
        temperature = unit === METRIC.FAHRENHEIT ?
            toFahrenheit(temp) : toCelsius(temp);
    }

    store.state = {
        ...store.state,
        temperature, isLoading, cityName, iconId,
    };
}

export async function refreshWeather(payload = {}) {
    const { showWeather } = store.state;

    // no need to make a query if the
    // the module is disabled in settings
    if (!showWeather) return;

    const { cacheEnabled = false } = payload;
    const { position = {} } = store.state;
    const { coords = {} } = position;
    const { latitude, longitude } = coords;

    if (!latitude || !longitude) return;

    let { refreshInterval } = store.state;
    if (!cacheEnabled) refreshInterval = 0;

    store.state = {...store.state, isLoading: true};

    try {
        const data = await getWeatherForLocation(
            {latitude, longitude, refreshInterval});
        handleDataUpdate({data});
    } catch(ex) {
        // do nothing on weather update failure
        // the state would not change and
        // the weather module would not show up
    }
}

export const setSetting = (payload = {}) =>
    setSettingByStoreAndSettings({data: payload, store, Settings});
