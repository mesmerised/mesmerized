import React from 'react';
import ClockComponent from '../components/Clock';
import { connect } from '@utils/connect.utils';
import store from '../utils/store';

function ClockContainer({is12hours, blinkForSeconds, showClock}) {
    const props = { is12hours, blinkForSeconds };
    return (
        showClock && <ClockComponent { ...props } />
    );
}

export default connect(store)(ClockContainer);
