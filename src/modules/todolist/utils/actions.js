import * as StorageUtils from '@utils/storage.utils';
import cacheConfigs from '../configs/cache.config';
import store, { getStateObject } from './store';
import Settings from './settings';
import { setSettingByStoreAndSettings } from '@actions/settings';

export const refresh = () =>
    store.state = {...store.state, ...getStateObject()};

export const setSetting = (payload = {}) =>
    setSettingByStoreAndSettings({data: payload, store, Settings});

export const showTodoList = () =>
    setSetting({showTodoList: true});

export const hideTodoList = () =>
    setSetting({showTodoList: false});

/**
 * Toggles the todo list visibility.
 */
export const toggleTodoList = () => {
    const { showTodoList: isVisible } = store.state;
    if (isVisible) {
        hideTodoList();
    } else {
        showTodoList();
    }
}

/**
 * Useful to cache the last drag position of the
 * Todo List widget on the screen.
 *
 * @param  {Object} payload     Payload containing position data
 */
export function updatePosition(payload = {}) {
    const { position = {} } = payload;
    StorageUtils.set(cacheConfigs.lastPosition, position);
    store.state = {...store.state, position};
}

/**
 * A map with id as key is used as the data structure
 * for storing the list of items.
 *
 * {
 *     id : {value, createdAt, reminderAt, completedAt},
 *     ...
 * }
 */

/**
 * Returns a unique id to be used as the todo list item id.
 * It simply scans the existing items and returns an id greater
 * than the max existing id. Can we do better?
 *
 * @fixme:
 *     the method is error prone and inefficient, find alternate?
 *
 * @return {Number} Unique id that can be used for todolist item
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
 * Adds a new item to the existing todo list.
 * Expects mandatory value property as the payload.
 *
 * @todo: set reminder if `reminderAt` is provided
 *
 * @param {Object} payload  Payload with values
 */
export function addItem(payload = {}) {
    const { value, reminderAt } = payload;

    if (!value) return;

    const id = getUniqueId();
    const item = {
        value, reminderAt,
        createdAt: new Date().getTime(),
    };
    const itemObj = {[id]: item};

    StorageUtils.update(cacheConfigs.items, itemObj);

    store.state = {
        ...store.state,
        items: {...store.state.items, ...itemObj}
    };
}

/**
 * Deletes a previously added item from the existing todo list.
 * Expects mandatory id property as the payload.
 *
 * @todo: remove reminder if present as part of the item
 *
 * @param {Object} payload  Payload with id
 */
export function removeItem(payload = {}) {
    const { id } = payload;

    if (!id) return;

    const itemsCacheKey = cacheConfigs.items;
    const existingItems = StorageUtils.get(itemsCacheKey) || {};

    delete existingItems[id];
    delete store.state.items[id];

    StorageUtils.set(cacheConfigs.items, existingItems);

    store.state = {
        ...store.state,
        items: {...store.state.items}
    }
}

/**
 * Marks the given item as completed/incomplete.
 * Expects the mandatory id property and optional completed.
 * This method can also be used to mark as incomplete by
 * setting the optional `completed` property to `false`.
 *
 * @todo: clear existing added reminder if completed
 *
 * @param {Object} payload  Payload with values
 */
export function markAsCompleted(payload = {}) {
    const { id, completed = true } = payload;

    if (!id) return;

    const itemsCacheKey = cacheConfigs.items;
    const existingItems = StorageUtils.get(itemsCacheKey);
    const existingItemsKeys = existingItems && Object.keys(existingItems);

    if (!existingItemsKeys || !existingItemsKeys.length) return;

    const item = existingItems[id];

    if (!item) return;

    const currentTime = new Date().getTime();

    // add current time to indicate the completed time
    item.completedAt = completed ? currentTime : null;

    // clear reminder if completed or the reminder is in past
    if (item.reminderAt) {
        const reminderAt = completed || (item.reminderAt <= currentTime)
            ? null : item.reminderAt;
        item.reminderAt = reminderAt;
    }

    const itemObj = {[id]: item};

    StorageUtils.update(cacheConfigs.items, itemObj);

    store.state = {
        ...store.state,
        items: {...store.state.items, ...itemObj}
    };
}
