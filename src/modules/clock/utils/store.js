import { createStore } from '@utils/store.utils';
import Settings from './settings';

const getState = () => ({
    is12hours: Settings.tewelveHourFormat,
    blinkForSeconds: Settings.blinkForSeconds,
    showClock: Settings.showClock,
});

const Store = createStore(getState());
export default Store;

export const refresh = () =>  Store.state = {...Store.state, ...getState()};
