import React, { Component } from 'react';
import FullscreenImage from '../components/FullscreenImage';
import placeholderImage from '../images/placeholder.jpeg';
import { prefetchRandomPhotos } from '../utils/api';
import { connect } from '@utils/connect.utils';
import store from '../utils/store';

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
        const { photoUrl, timeout } = this.props;
        return (
            <FullscreenImage
                src={ photoUrl }
                placeholder={ placeholderImage }
                timeout={ timeout } />
        );
    }
}

export default connect(store)(Background);
