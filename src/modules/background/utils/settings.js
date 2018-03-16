import configs from '../configs/settings.config';
import { NEW_PHOTO_DURATIONS } from '../configs/constants';
import { settingsFactory } from '@utils/settings.utils';

/**
 * Default settings
 * @type {Object}
 */
const defaults = {
    fetchFromServer: true,
    newPhotoDuration: NEW_PHOTO_DURATIONS.HOURLY,
}

export default settingsFactory({ configs, defaults });
