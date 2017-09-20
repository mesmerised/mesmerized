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

/**
 * Factory function to create a Settings proxy object
 * with getters and setters for persistent storage.
 *
 * Note: For the proxy to work as expected, make sure to
 * create `configs` and `defaults` objects with exact
 * keys to be able to return fallback values.
 *
 * @example
 * const configs = {
 *     showSomething: 'mymodule.show.something',
 *     showSomethingElse: 'mymodule.show.somethingelse',
 * };
 * const defaults = {
 *     showSomething: true,
 *     showSomethingElse: false,
 * };
 * const UserSettings = settingsFactory({defaults, configs});
 *
 * UserSettings.showSomething // true
 * UserSettings.showSomethingElse // false
 * // set some settings
 * UserSettings.showSomethingElse = true;
 * // after app reload, etc
 * UserSettings.showSomethingElse // true
 *
 * @param  {Object} options.defaults    Map of setting names and corresponding default values
 * @param  {Object} options.configs     Map of setting names and corresponding storage key
 * @return {Object}                     The settings proxy
 */
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
