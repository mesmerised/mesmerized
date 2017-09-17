import configs from '../configs/settings.config';
import { METRIC } from '../configs/constants';
import { settingsFactory } from '@utils/settings.utils';

/**
 * Default settings
 * @type {Object}
 */
const defaults = {
    unit: METRIC.CELSIUS,
    showWeather: true,
    refreshInterval: 45 * 60 * 1000 // 45mins
};

export default settingsFactory({ configs, defaults });
