export const openSettingsPage = () =>
    chrome.runtime.openOptionsPage();

export const resetApp = () =>
    localStorage.clear();

/**
 * A generic action to set the setting on the Settings object
 * of the module and update the store. It is handy for updating
 * individual module settings.
 *
 * @example
 *     // module level set setting action
 *     // that can be called ideally from a settings page
 *     const setSetting = (payload = {}) =>
 *         setSettingByStoreAndSettings({data: payload, store, Settings});
 *     // setSetting({showModule: false});
 *
 * @param {Object} payload  store, Settings, and data should be provided
 */
export function setSettingByStoreAndSettings(payload = {}) {
    const { store, Settings, data = {} } = payload;

    if (!store || !Settings) return;

    const keys = Object.keys(data);
    const updatedState = {};

    keys.forEach(key => {
        const value = data[key];
        Settings[key] = value;
        updatedState[key] = value;
    });

    store.state = {...store.state, ...updatedState};
}
