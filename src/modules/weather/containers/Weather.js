import React, { Component } from 'react';
import WeatherComponent from '../components/Weather';
import { connect } from '@utils/connect.utils';
import store from '../utils/store';
import * as Actions from '../utils/actions';

const GEO_OPTIONS = { enableHighAccuracy: true };
const cacheEnabled = true;

class Weather extends Component {
    // @todo: handle geolocation errors
    componentDidMount() {
        const { refreshInterval } = this.props;

        // initialize the initial update
        Actions.refresh({cacheEnabled});

        // update in the given intervals
        this.intervalId = setInterval(() =>
            Actions.refresh({cacheEnabled}), refreshInterval);

        // listen to any geolocation updates
        this.wpid = navigator.geolocation.watchPosition(
            this.handleGeolocationUpdate, () => {}, GEO_OPTIONS);
    }

    componentWillUnmount() {
        this.intervalId && clearInterval(this.intervalId);
        this.wpid && navigator.geolocation.clearWatch(this.wpid);
    }

    handleGeolocationUpdate = position => {
        Actions.updatePosition({position});
        Actions.refresh({cacheEnabled});
    };

    render() {
        const {
            temperature,
            cityName,
            iconId,
            showWeather,
            isLoading
        } = this.props;

        if (!showWeather) return null;

        const props = { temperature, cityName, iconId, isLoading };
        return <WeatherComponent { ...props } />;
    }
}

export default connect(store)(Weather);
