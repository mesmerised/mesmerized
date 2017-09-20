import { toUrl } from '@utils/url.utils';
import { prefetch as prefetchImage } from '@utils/image.utils';
import * as StorageUtils from '@utils/storage.utils';
import apiConfigs from '../configs/api.config';
import cacheConfigs from '../configs/cache.config';

const { client_id, base, uris } = apiConfigs;
const randomPhotoApiUrl = `${base}${uris.randomPhoto}`;
const prefetchedPhotoCacheKey = cacheConfigs.prefetchedPhotos;

// random photos api defaults
const DEFAULTS = {
    featured: true, orientation: 'landscape',
    w: 1920, h: 1048, count: 20,
    client_id,
};

// max photos to prefetch
const PREFETCH_THRESHOLD = 10;

/**
 * Returns the photo url to use from the photo object.
 *
 * @param  {Object} photo   Photo object returned by the API
 * @return {String}         Photo url to use
 */
export function getPhotoUrl(photo = {}) {
    const { urls = {} } = photo;
    return urls.custom || urls.regular;
}

/**
 * Fetched random photos from the API.
 *
 * @see https://unsplash.com/documentation#get-a-random-photo
 *
 * @param  {Object} params  Supported parameters
 * @return {Promise}        Promise that returns JSON data (Array of photos)
 */
export function fetchRandomPhotos(params = {}) {
    params = {...DEFAULTS, ...params};

    const url = toUrl(randomPhotoApiUrl, params);

    return fetch(url).then(response => response.json())
            .catch(response => []);
}

/**
 * Prefetches the usable photo urls and
 * stores corresponding photo objects in the cache.
 *
 * @todo: configurable categories option
 */
export async function prefetchRandomPhotos() {
    const prefetchedPhotos = StorageUtils.get(prefetchedPhotoCacheKey);
    const exisitngPrefetchedPhotosCount = prefetchedPhotos
        && Object.keys(prefetchedPhotos).length;

    // if sufficient buffer, do not prefetch
    if (exisitngPrefetchedPhotosCount >= PREFETCH_THRESHOLD) return;

    // call random photos api
    // then use image prefetch technique to prefetch the photo url
    // then store each prefetched photo object in the cache
    // { [photo id] : { photo object }, ... }
    const photos = await fetchRandomPhotos();
    photos.forEach(async photo => {
        const url = getPhotoUrl(photo);
        try {
            await prefetchImage(url);
            StorageUtils.update(prefetchedPhotoCacheKey, {[photo.id]: photo});
        } catch(ex) {
            // do nothing on image prefetch failure
        }
    });
}

/**
 * Returns a random prefetched photo object from the cache.
 * The returned photo is removed from the cache.
 *
 * @return {Object}     Photo object as per the API
 */
export function getRandomPrefetchedPhoto() {
    const prefetchedPhotos = StorageUtils.get(prefetchedPhotoCacheKey);

    // no pre-fetched photos, return
    if (!prefetchedPhotos || !Object.keys(prefetchedPhotos).length) {
        return;
    }

    // there is at least one unused photo, pick the first one
    const prefetchedPhotosIds = Object.keys(prefetchedPhotos);
    const selectedId = prefetchedPhotosIds[0];
    const unusedPhoto = prefetchedPhotos[selectedId];
    // delete from cache and return the photo
    delete prefetchedPhotos[selectedId];
    StorageUtils.set(prefetchedPhotoCacheKey, prefetchedPhotos);
    return unusedPhoto;
}
