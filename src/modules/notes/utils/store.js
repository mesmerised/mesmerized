import { createStore } from '@utils/store.utils';
import * as StorageUtils from '@utils/storage.utils';
import cacheConfigs from '../configs/cache.config';

const lastPositionsCacheKey = cacheConfigs.lastPositions;
const itemsCacheKey = cacheConfigs.items;

export const getStateObject = () => ({
    positions: StorageUtils.get(lastPositionsCacheKey) || {},
    items: StorageUtils.get(itemsCacheKey) || {},
});

export default createStore();
