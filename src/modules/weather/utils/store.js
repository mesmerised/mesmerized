import { createStore } from '@utils/store.utils';
import * as StorageUtils from '@utils/storage.utils';
import cacheConfigs from '../configs/cache.config';
import Settings from './settings';

const lastPositionCacheKey = cacheConfigs.lastPosition;

export const getStateObject = () => ({
    unit: Settings.unit,
    refreshInterval: Settings.refreshInterval,
    showWeather: Settings.showWeather,
    position: StorageUtils.get(lastPositionCacheKey) || {},
    temperature: 0,
    cityName: '',
    iconId: '',
    isLoading: true,
});

export default createStore();
