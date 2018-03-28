import { createStore } from '@utils/store.utils';
import * as StorageUtils from '@utils/storage.utils';
import cacheConfigs from '../configs/cache.config';
import Settings from './settings';

const lastPositionCacheKey = cacheConfigs.lastPosition;
const itemsCacheKey = cacheConfigs.items;

export const getStateObject = () => ({
    showTodoList: Settings.showTodoList,
    purgeInterval: Settings.purgeInterval,
    position: StorageUtils.get(lastPositionCacheKey) || {x: 0, y: 0},
    items: StorageUtils.get(itemsCacheKey) || {},
});

export default createStore();
