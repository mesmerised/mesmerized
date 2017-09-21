import store, { getStateObject } from './store';
import { prefetchRandomPhotos } from './api';

export const refresh = () => {
    const { photoUrl: previousPhotoUrl } = store.state;
    const updatedState = getStateObject();
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
