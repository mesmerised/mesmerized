import React, { Component } from 'react';
import './image.css';
import placeholderImg from './placeholder.png';
import { prefetch } from '@utils/image.utils';

class Image extends Component {
    static defaultProps = {
        alt: '',
        placeholder: placeholderImg,
        extraClasses: '',
    };

    state = {
        prefetchedSource: placeholderImg,
        isLoaded: false,
        isError: false
    };

    prefetchImage = () => {
        const { src, timeout } = this.props;

        prefetch(src, timeout)
            .then(this.handlePrefetchSuccess)
            .catch(this.handlePrefetchError);
    };

    handlePrefetchSuccess = (img) => {
        if (!this._mounted) return;

        const { src, onLoad } = this.props;

        this.setState({
            prefetchedSource: src,
            isLoaded: true,
            isError: false,
        });

        onLoad && onLoad(img);
    };

    handlePrefetchError = (img) => {
        if (!this._mounted) return;

        const { onError, placeholder } = this.props;

        this.setState({
            prefetchedSource: placeholder,
            isLoaded: true,
            isError: false,
        });

        onError && onError(img);
    };

    componentWillUnmount() {
        this._mounted = false;
    }

    componentDidMount() {
        this._mounted = true;
        this.prefetchImage();
    }

    render() {
        const {
            alt,
            placeholder,
            extraClasses
        } = this.props;

        const {
            prefetchedSource,
            isLoaded,
            isError
        } = this.state;

        const imageSource = isLoaded ? prefetchedSource : placeholder;
        const isLoadingClass = !isLoaded && !isError ? 'image__loading' : '';

        return (
            <img
                className={ `image ${isLoadingClass} ${extraClasses}` }
                src={ imageSource }
                alt={ alt } />
        );
    }

}

export default Image;
