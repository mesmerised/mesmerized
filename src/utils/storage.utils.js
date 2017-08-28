import LZString from 'lz-string';

const { compress, decompress } = LZString;
const APP_BASE = 'mesmerized';
const getKey = key => `${APP_BASE}.${key}`;
const isValid = val => ((typeof val !== 'undefined') && val !== null);

/**
 * Sets a given key and value in the `localStorage`.
 * Uses lz-string compression before storage.
 *
 * @param {String} key  Storage key
 * @param {Mixed} val   Value to store
 */
export function set(key, val) {
    try {
        val = JSON.stringify(val);
        typeof val !== 'undefined' && localStorage.setItem(getKey(key), compress(val));
    } catch(ex) {
        console.warn(`something went wrong while trying to store value for ${key}.`, ex);
    }
}

/**
 * Retrieves the value from the `localStorage`.
 * Assumes that provided `set` method was used
 * as the value is decompressed using the lz-string compression.
 *
 * @param {String} key  Storage key
 * @return {Mixed}      Stored Value
 */
export function get(key) {
    let item = localStorage.getItem(getKey(key));
    let val;

    if (isValid(item)) {
        item = decompress(item);
    }

    try {
        val = JSON.parse(item);
    } catch(ex) {
        val = item;
    }

    return val;
}

/**
 * Similar to `set` method, but extends the
 * original stored value if it is of type array or object.
 *
 * Note: The type of both stored as well as provided value
 * should match in order for the update to work. Also
 * the value should exist initially to begin with
 * Otherwise the behaviour is equivalent to `set` method.
 *
 * @param {String} key  Storage key
 * @param {Mixed} val   Value to update
 */
export function update(key, val) {
    let existingVal = get(key);

    // not present yet in storage, store
    if (!isValid(existingVal)) {
        set(key, val);
    } else if (Array.isArray(existingVal) && Array.isArray(val)) {
        // is an array, extend original and set
        set(key, [...existingVal, ...val]);
    } else if (typeof existingVal === 'object' && typeof val === 'object') {
        // is an object, extend original and et
        set(key, {...existingVal, ...val});
    } else {
        // incompatible or other primitive values, use normal set
        set(key, val);
    }
}

export function remove(keys) {
    if (!Array.isArray(keys)) keys = [keys];
    keys.forEach(k => localStorage.removeItem(getKey(k)));
}
