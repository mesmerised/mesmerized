import store, { getStateObject } from './store';
import { prefetchRandomPhotos } from './api';

export const refresh = () => {
    const updatedState = getStateObject();
    const { fetchFromServer } = updatedState;
    // prefetch if allowed by settings
    fetchFromServer && prefetchRandomPhotos();
    // set the updated state on the store
    store.state = {...store.state, ...updatedState};
}
