import { createSetting } from 'persistme';
import MesmerizedStorage from './storage.utils';

export function settingsFactory(options = {}) {
    options.storage = MesmerizedStorage;
    return createSetting(options);
}
