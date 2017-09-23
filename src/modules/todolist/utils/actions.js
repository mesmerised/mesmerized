import * as StorageUtils from '@utils/storage.utils';
import cacheConfigs from '../configs/cache.config';
import store, { getSettingsObject } from './store';
import Settings from './settings';
import { setSettingByStoreAndSettings } from '@actions/settings';

export const refresh = () =>
    store.state = {...store.state, ...getSettingsObject()};

export const setSetting = (payload = {}) =>
    setSettingByStoreAndSettings({data: payload, store, Settings});

export const showTodoList = () =>
    setSetting({showTodoList: true});

export const hideTodoList = () =>
    setSetting({showTodoList: false});

export const toggleTodoList = () => {
    const { showTodoList: isVisible } = store.state;
    if (isVisible) {
        hideTodoList();
    } else {
        showTodoList();
    }
}

export function updatePosition(payload = {}) {
    const { position = {} } = payload;

    // cache last dragged position update
    StorageUtils.set(cacheConfigs.lastPosition, position);

    store.state = {...store.state, position};
}
