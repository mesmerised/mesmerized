import configs from './configs/settings.config';
import { settingsFactory } from '@utils/settings.utils';

/**
 * Default settings
 * @type {Object}
 */
const defaults = {
    fetchFromServer: true,
}

export default settingsFactory({ configs, defaults });
