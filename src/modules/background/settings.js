import * as StorageUtils from '@utils/storage.utils';
import settingsConfigs from './configs/settings.config';

/**
 * Default settings
 * @type {Object}
 */
const DEFAULTS = {
    fetchFromServer: true,
}

/**
 * Returns the previously stored settings.
 * If no setting is present for the given key,
 * it returns the default value.
 *
 * @param  {String} key     The settings to get
 * @return {Mixed}          The settings value, or default
 */
function getValue(key) {
    const val = StorageUtils.get(settingsConfigs[key]);
    if (typeof val === 'undefined' || val === null) {
        return DEFAULTS[key];
    }
    return val;
}

/**
 * Stores the given settings in the appropriate key
 *
 * @param {String} key      The settings to store
 * @param {Mixed} value     The value to store
 */
function setValue(key, value) {
    StorageUtils.set(settingsConfigs[key], value);
}

/**
 * List of available settings
 */
export default {
    get fetchFromServer() {
        return getValue('fetchFromServer');
    },
    set fetchFromServer(value) {
        setValue('fetchFromServer', value);
    }
}
