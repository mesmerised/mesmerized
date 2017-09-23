import store, { getStateObject } from './store';
import { prefetchRandomQuote } from './api';
import Settings from './settings';
import { setSettingByStoreAndSettings } from '@actions/settings';

export const refresh = () => {
    const updatedState = getStateObject();
    const { fetchFromServer } = updatedState;
    // prefetch if allowed by settings
    fetchFromServer && prefetchRandomQuote();
    // set the updated state on the store
    store.state = {...store.state, ...updatedState};
}

export const setSetting = (payload = {}) =>
    setSettingByStoreAndSettings({data: payload, store, Settings});
