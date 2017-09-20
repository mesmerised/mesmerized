import React, { Component } from 'react';
import Image from '@components/Image';
import './style.css';

class FullScreenImage extends Component {
    render() {
        return (
            <div className="background">
                <Image
                    key={ this.props.src }
                    extraClasses="background__image"
                    {...this.props} />
                <div className="background__overlay" />
            </div>
        );
    }
}

export default FullScreenImage;
