import { getRandomInt } from '@utils/general.utils';
import * as StorageUtils from '@utils/storage.utils';
import cacheConfigs from '../configs/cache.config';
import categoriesConfig from '../configs/categories.config';

const categoriesBasePath = '../images/categories';
const localPhotosCacheKey = cacheConfigs.localPhotos;

/**
 * Gets the local photos object from cache if present.
 *
 * @return {Object} Photos object with `localPath` as the key
 */
function getLocalPhotosFromCache() {
    const localPhotos = StorageUtils.get(localPhotosCacheKey);

    // no local photos, return
    if (!localPhotos || !Object.keys(localPhotos).length) {
        return;
    }

    return localPhotos;
}

const categories = Object.keys(categoriesConfig);

// if the local photo paths are not populated
// dynamically import all locally stored photos json
// along with their paths and update the local storage
// to indicate they are available for the next usage
// storage format -> { 'local/path/to/photo' : {photo_json} }
!getLocalPhotosFromCache() && categories.forEach(c => {
    import(`${categoriesBasePath}/${c}.json`)
        .then(photos => {
            photos.forEach(p => {
                import(`${categoriesBasePath}/${c}/${p.id}.jpg`)
                    .then(path => StorageUtils.update(localPhotosCacheKey, {[path]: p}))
                    .catch(error => error)
            });
        }).catch(error => error);
});

/**
 * Extracts local path from the photo object.
 *
 * @param  {Object} photo   Photo object returned by the API
 * @return {String}         Local path to use
 */
export function getLocalPhotoPath(photo = {}) {
    return photo.localPath;
}

/**
 * Returns a random local photo object from the cache.
 * The returned photo object is extended with `localPath` property.
 *
 * @todo: accept param to allow getting
 * a random photo from specific category(ies)
 *
 * @return {Object}     Photo object as per the API
 */
export function getRandomLocalPhoto() {
    const localPhotos = getLocalPhotosFromCache();

    // no local photos, return
    if (!localPhotos) return;

    // there is at least one local photo, pick a random one
    // @todo: optimize randomness to favour least shown photo
    // one strategy would be to store the display timestamp
    // of each photo in the local storage and favour the
    // photos without a timestamp or the one with oldest timestamp
    const prefetchedPhotosIds = Object.keys(localPhotos);
    const selectedLocalPhotoPath = prefetchedPhotosIds[getRandomInt(0, prefetchedPhotosIds.length)];
    const randomLocalPhoto = localPhotos[selectedLocalPhotoPath];

    // add an extra property `localPath`
    // to indicate the locally stored location
    return { ...randomLocalPhoto, localPath: selectedLocalPhotoPath };
}
