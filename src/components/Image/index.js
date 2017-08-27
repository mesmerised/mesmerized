import React, { Component } from 'react';
import './image.css';
import placeholderImg from './placeholder.png';
import { imagePrefetch } from './utils';

class Image extends Component {
    static defaultProps = {
        isLazy: true,
        onLoad: x => x
    };

    constructor(props) {
        super(props)
        this.state = {isLoaded: false};
    }

    componentDidMount() {
        const {
            isLazy,
            src,
            onLoad
        } = this.props;

        isLazy && imagePrefetch(src)
            .then(img => {
                this.setState({isLoaded: true});
                onLoad(img);
            });
    }

    render() {
        const {
            isLazy,
            src,
            alt,
            extraClasses = ''
        } = this.props;
        const { isLoaded } = this.state;
        const imageSource = isLoaded || !isLazy ? src : placeholderImg;

        let dataSrc = src;
        if(imageSource !== placeholderImg ) dataSrc = null;

        return <img className={ `image ${extraClasses}` }
                    src={ imageSource }
                    alt={ alt }
                    data-src={ dataSrc } />
    }

}

export default Image;
