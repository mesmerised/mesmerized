import React, { Component } from 'react';
import FullscreenImage from '../components/FullscreenImage';
import placeholderImage from '../images/placeholder.jpeg';
import { prefetchRandomPhotos } from '../utils/api';
import ConnectedStoreHOC from '../utils/connect.store.hoc';

// @todo: update api credits

class Background extends Component {
    static defaultProps = {
        photoUrl: placeholderImage,
        timeout: 1500,
    };

    componentDidMount() {
        const { fetchFromServer } = this.props;
        // start prefetching if configured in settings
        fetchFromServer && prefetchRandomPhotos();
    }

    render() {
        const {
            photoUrl,
            timeout,
            previousPhotoUrl,
            placeholderPhotoUrl = placeholderImage
        } = this.props;
        const backgroundImage = previousPhotoUrl ? `url(${previousPhotoUrl})` : 'none';
        return (
            <FullscreenImage
                style={ { backgroundImage } }
                src={ photoUrl }
                placeholder={ placeholderPhotoUrl }
                timeout={ timeout } />
        );
    }
}

export default ConnectedStoreHOC(Background);
