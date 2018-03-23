import configs from '../configs/settings.config';
import { PURGE_INTERVALS } from '../configs/constants';
import { settingsFactory } from '@utils/settings.utils';

/**
 * Default settings
 * @type {Object}
 */
const defaults = {
    showTodoList: true,
    purgeInterval: PURGE_INTERVALS.THREE_DAYS,
}

export default settingsFactory({ configs, defaults });
