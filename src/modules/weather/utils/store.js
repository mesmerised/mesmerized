import { createStore } from '@utils/store.utils';
import * as StorageUtils from '@utils/storage.utils';
import cacheConfigs from '../configs/cache.config';
import Settings from './settings';

const lastPositionCacheKey = cacheConfigs.lastPosition;

export const getSettingsObject = () => ({
    unit: Settings.unit,
    refreshInterval: Settings.refreshInterval,
    showWeather: Settings.showWeather,
});

const initialState = {
    position: StorageUtils.get(lastPositionCacheKey) || {},
    temperature: 0,
    cityName: '',
    iconId: '',
    isLoading: true,
};

export default createStore({...getSettingsObject(), ...initialState});
