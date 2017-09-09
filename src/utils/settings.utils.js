import * as StorageUtils from './storage.utils';

/**
 * Returns the previously stored settings.
 * If no setting is present for the given key,
 * it returns the default value.
 *
 * @param  {String} key         The settings to get
 * @param  {Object} configs     The configuration object
 * @param  {Object} defaults    The default values
 * @return {Mixed}              The settings value, or default
 */
function getValue(key, configs, defaults) {
    const val = StorageUtils.get(configs[key]);
    if (typeof val === 'undefined' || val === null) {
        return defaults[key];
    }
    return val;
}

/**
 * Stores the given settings in the appropriate key
 *
 * @param {String} key      The settings to store
 * @param {Mixed} value     The value to store
 * @param {Object} configs  The configuration object
 */
function setValue(key, value, configs) {
    StorageUtils.set(configs[key], value);
}

export function settingsFactory(options = {}) {
    const { defaults = {}, configs = {} } = options;

    return new Proxy({}, {
        get(target, property) {
            return getValue(property, configs, defaults);
        },
        set(target, property, value) {
            setValue(property, value, configs);
            return true;
        }
    });
}
