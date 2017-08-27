import React, { Component } from 'react';
import './image.css';
import placeholderImg from './placeholder.png';
import { prefetch } from '@utils/image.utils';

class Image extends Component {
    static defaultProps = {
        alt: '',
        placeholder: placeholderImg,
        extraClasses: '',
        onLoad: x => x,
        onError: x => x
    };

    state = {
        isLoaded: false,
        isError: false
    };

    componentDidMount() {
        const {
            src,
            timeout,
            onLoad,
            onError
        } = this.props;

        prefetch(src, timeout)
            .then(img => {
                this.setState({
                    isLoaded: true,
                    isError: false
                });
                onLoad(img);
            })
            .catch(img => {
                this.setState({
                    isLoaded: false,
                    isError: true
                });
                onError(img);
            });
    }

    render() {
        const {
            src,
            alt,
            placeholder,
            extraClasses
        } = this.props;
        const {
            isLoaded,
            isError
        } = this.state;

        const imageSource = isLoaded ? src : placeholder;
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
