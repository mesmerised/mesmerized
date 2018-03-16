import { createStore } from '@utils/store.utils';
import Settings from './settings';

export const getSettingsObject = () => ({
    tewelveHourFormat: Settings.tewelveHourFormat,
    blinkForSeconds: Settings.blinkForSeconds,
    showClock: Settings.showClock,
    showDate: Settings.showDate,
});

export default createStore(getSettingsObject());;
