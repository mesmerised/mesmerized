import { createStore } from '@utils/store.utils';
import placeholderImage from '../images/placeholder.jpeg';
import { getPhotoUrl, getRandomPrefetchedPhoto } from './api';
import { getLocalPhotoPath, getRandomLocalPhoto } from './photos.local';
import Settings from './settings';

export const getStateObject = () => {
    const fetchFromServer = Settings.fetchFromServer;
    let photoUrl;

    // if allowed to fetch from server
    // begin with assuming we get a
    // prefetched photo from the api
    if (fetchFromServer) {
        photoUrl = getPhotoUrl(getRandomPrefetchedPhoto());
    }

    // prefetched api photo
    // or a locally stored photo
    // or a fallback placeholder photo
    photoUrl = photoUrl
        || getLocalPhotoPath(getRandomLocalPhoto())
        || placeholderImage;

    return { fetchFromServer, photoUrl };
};

export default createStore(getStateObject());;
