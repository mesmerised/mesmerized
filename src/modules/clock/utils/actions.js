import store, { getSettingsObject } from './store';

export const refresh = () =>
    store.state = {...store.state, ...getSettingsObject()};
