import store, { getSettingsObject } from './store';
import Settings from './settings';
import { setSettingByStoreAndSettings } from '@actions/settings';

export const refresh = () =>
    store.state = {...store.state, ...getSettingsObject()};

export const setSetting = (payload = {}) =>
    setSettingByStoreAndSettings({data: payload, store, Settings});
