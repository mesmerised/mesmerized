import { createStore } from '@utils/store.utils';
import placeholderImage from '../images/placeholder.jpeg';
import { getPhotoUrl, getPrefetchedPhotoForDisplay } from './api';
import { getLocalPhotoPath, getRandomLocalPhoto } from './photos.local';
import Settings from './settings';

export const getStateObject = (force = false) => {
    const fetchFromServer = Settings.fetchFromServer;
    const newPhotoDuration = Settings.newPhotoDuration;

    let photoUrl;
    let placeholderPhotoUrl;
    let photoMeta;
    let placeholderPhotoMeta;

    // if allowed to fetch from server
    // begin with assuming we get a
    // prefetched photo from the api
    if (fetchFromServer) {
        photoMeta = getPrefetchedPhotoForDisplay(force ? 0 : newPhotoDuration);
        photoUrl = getPhotoUrl(photoMeta);
    }

    // or a locally stored photo
    if (!photoUrl) {
        photoMeta = getRandomLocalPhoto();
        photoUrl = getLocalPhotoPath(photoMeta);
    }
    // or a fallback placeholder photo
    if (!photoUrl) {
        photoMeta = null;
        photoUrl = placeholderImage;
    }

    // get a random image as placeholder
    // to handle offline network scenarios
    placeholderPhotoMeta = getRandomLocalPhoto();
    placeholderPhotoUrl = getLocalPhotoPath(placeholderPhotoMeta);

    return {
        fetchFromServer,
        photoUrl,
        photoMeta,
        placeholderPhotoUrl,
        placeholderPhotoMeta,
        newPhotoDuration,
    };
};

export default createStore();
