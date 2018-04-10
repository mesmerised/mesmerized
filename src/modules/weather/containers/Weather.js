import React, { Component } from 'react';
import WeatherComponent from '../components/Weather';
import * as Actions from '../utils/actions';
import ConnectedStoreHOC from '../utils/connect.store.hoc';

const GEO_OPTIONS = { enableHighAccuracy: true };
const cacheEnabled = true;

class Weather extends Component {
    handleGeolocationUpdate = position => {
        Actions.updatePosition({ position });
        Actions.refreshWeather({ cacheEnabled });
    };

    setupRefreshInterval = () => {
        this.intervalId && clearInterval(this.intervalId);

        const { refreshInterval } = this.props;

        if (Number.isFinite(refreshInterval)) {
            this.intervalId = setInterval(() =>
                Actions.refreshWeather({ cacheEnabled }), refreshInterval);
        }
    };

    // @todo: handle geolocation errors
    componentDidMount() {
        // lazy initialize the state object
        // also initialize the initial update
        setTimeout(() => {
            Actions.refresh(false);

            // update in the given intervals
            this.setupRefreshInterval();

            const { handleGeolocationUpdate } = this;
            // listen to any geolocation updates
            this.wpid = navigator.geolocation.watchPosition(
                handleGeolocationUpdate, () => { }, GEO_OPTIONS);
        }, 0);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.refreshInterval !== this.props.refreshInterval) return;

        // update in the given intervals
        this.setupRefreshInterval();
    }

    componentWillUnmount() {
        this.intervalId && clearInterval(this.intervalId);
        this.wpid && navigator.geolocation.clearWatch(this.wpid);
    }

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
        return <WeatherComponent {...props} />;
    }
}

export default ConnectedStoreHOC(Weather);
