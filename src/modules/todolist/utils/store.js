import { createStore } from '@utils/store.utils';
import * as StorageUtils from '@utils/storage.utils';
import cacheConfigs from '../configs/cache.config';
import Settings from './settings';

const lastPositionCacheKey = cacheConfigs.lastPosition;

// @todo save/update/initialize data
const data = [{
    id: 1,
    value: 'Buy Groceries',
}, {
    id: 2,
    value: 'Visit Dental Store',
}, {
    id: 3,
    value: 'This is a very long todo list item that is very very very long.',
    hasReminder: true,
}];

export const getSettingsObject = () => ({
    showTodoList: Settings.showTodoList
});

const initialState = {
    items: data,
    position: StorageUtils.get(lastPositionCacheKey) || {x: 0, y: 0},
};

export default createStore({...getSettingsObject(), ...initialState});;
