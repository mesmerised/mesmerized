import store, { getStateObject } from './store';
import { prefetchRandomPhotos } from './api';
import Settings from './settings';
import { setSettingByStoreAndSettings } from '@actions/settings';

export const refresh = (force = true) => {
    const { photoUrl: previousPhotoUrl } = store.state;
    const updatedState = getStateObject(force);
    const { fetchFromServer } = updatedState;
    // prefetch if allowed by settings
    fetchFromServer && prefetchRandomPhotos();
    // set the updated state on the store
    // also set the previous photo url as a prop
    store.state = {
        ...store.state,
        previousPhotoUrl,
        ...updatedState
    };
}

export const setSetting = (payload = {}) =>
    setSettingByStoreAndSettings({data: payload, store, Settings});
