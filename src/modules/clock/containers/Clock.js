import React from 'react';
import ClockComponent from '../components/Clock';
import ConnectedStoreHOC from '../utils/connect.store.hoc';

function ClockContainer({is12hours, blinkForSeconds, showDate, showClock}) {
    const props = { is12hours, blinkForSeconds, showDate };
    return (
        showClock && <ClockComponent { ...props } />
    );
}

export default ConnectedStoreHOC(ClockContainer);
