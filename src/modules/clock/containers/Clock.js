import React from 'react';
import ClockComponent from '../components/Clock';
import ConnectedStoreHOC from '../utils/connect.store.hoc';

function ClockContainer({tewelveHourFormat, blinkForSeconds, showDate, showClock}) {
    const props = { tewelveHourFormat, blinkForSeconds, showDate };
    return (
        showClock && <ClockComponent { ...props } />
    );
}

export default ConnectedStoreHOC(ClockContainer);
