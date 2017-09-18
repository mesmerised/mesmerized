import store, { getSettingsObject } from '../utils/store';

export const refresh = () =>
    store.state = {...store.state, ...getSettingsObject()};
