import * as StorageUtils from '@utils/storage.utils';
import cacheConfigs from '../configs/cache.config';
import store, { getStateObject } from './store';

const DEFAULT_NOTE_MESSAGE = '→ Hover and click the info icon for options.\n\n→ Use menu in the top right corner to add more.'

export const refresh = () => {
    const stateObj = getStateObject();

    // add an empty default sticky note item
    // in case there are no items to begin with
    // this would ensure that there is a
    // sticky note to show on first installs
    if (!stateObj.items) {
        const value = DEFAULT_NOTE_MESSAGE;
        stateObj.items = addItemToStorage({ value });
    }

    store.state = { ...store.state, ...stateObj };
}

/**
 * Useful to cache the last drag position of the
 * sticky note widget on the screen.
 *
 * @param  {Object} payload     Payload containing position data
 */
export function updatePosition(payload = {}) {
    const { position = {}, id } = payload;
    if (!id) return;

    const positionObject = { [id]: position };
    StorageUtils.update(cacheConfigs.lastPositions, positionObject);

    store.state = {
        ...store.state,
        positions: { ...store.state.positions, ...positionObject }
    };
}

/**
 * A map with id as key is used as the data structure
 * for storing the list of items.
 *
 * {
 *     id : {value, theme},
 *     ...
 * }
 */

/**
 * Returns a unique id to be used as the sticky note item id.
 * It simply scans the existing items and returns an id greater
 * than the max existing id. Can we do better?
 *
 * @fixme:
 *     the method is error prone and inefficient, find alternate?
 *
 * @return {Number} Unique id that can be used for sticky note item
 */
function getUniqueId() {
    const itemsCacheKey = cacheConfigs.items;
    const existingItems = StorageUtils.get(itemsCacheKey);
    const existingItemsKeys = existingItems && Object.keys(existingItems);
    let id = 1;

    if (existingItemsKeys && existingItemsKeys.length) {
        const ids = existingItemsKeys.map(id => parseInt(id, 10));
        const lastId = Math.max(...ids);
        id = lastId + 1;
    }

    return id;
}

/**
 * Adds a new note item to the existing sticky notes list.
 * Returns the newly added note item object.
 *
 * @param {Object} payload  Payload with value
 * @return {Object} The newly added note object
 */
function addItemToStorage(payload = {}) {
    const { value, theme } = payload;

    const id = getUniqueId();
    const item = { value, theme };
    const itemObj = { [id]: item };

    StorageUtils.update(cacheConfigs.items, itemObj);

    return itemObj;
}

/**
 * Adds a new note item to the existing sticky notes list.
 * Also updates the related store and state.
 *
 * @param {Object} payload  Payload with value
 */
export function addItem(payload = {}) {
    const itemObj = addItemToStorage(payload);

    store.state = {
        ...store.state,
        items: { ...store.state.items, ...itemObj }
    };
}

/**
 * Updates a previously added item from the existing sticky notes list.
 * Expects mandatory id property as the payload.
 *
 * @param {Object} payload  Payload with id and value
 */
export function updateItem(payload = {}) {
    const { id } = payload;

    if (!id) return;

    const itemsCacheKey = cacheConfigs.items;
    const existingItems = StorageUtils.get(itemsCacheKey) || {};
    const existingItem = existingItems[id];

    if (!existingItem) return;

    if ('value' in payload) {
        existingItem.value = payload.value;
        store.state.items[id].value = payload.value;
    }
    if ('theme' in payload) {
        existingItem.theme = payload.theme;
        store.state.items[id].theme = payload.theme;
    }

    StorageUtils.set(cacheConfigs.items, existingItems);

    store.state = {
        ...store.state,
        items: { ...store.state.items }
    };
}

/**
 * Deletes a previously added item from the existing sticky notes list.
 * Expects mandatory id property as the payload.
 *
 * @param {Object} payload  Payload with id
 */
export function removeItem(payload = {}) {
    const { id } = payload;

    if (!id) return;

    const itemsCacheKey = cacheConfigs.items;
    const lastPositionsCacheKey = cacheConfigs.lastPositions;
    const existingItems = StorageUtils.get(itemsCacheKey) || {};
    const existingPositions = StorageUtils.get(lastPositionsCacheKey) || {};

    delete existingItems[id];
    delete store.state.items[id];
    delete existingPositions[id];
    delete store.state.positions[id];

    StorageUtils.set(itemsCacheKey, existingItems);
    StorageUtils.set(lastPositionsCacheKey, existingPositions);

    store.state = {
        ...store.state,
        items: { ...store.state.items },
        positions: { ...store.state.positions },
    };
}
