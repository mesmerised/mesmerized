import React from 'react';
import Image from '@components/Image';
import './style.css';

const FullScreenImage = (props = {}) => (
    <div className="background" style={ props.style }>
        <Image
            key={ props.src }
            extraClasses="background__image"
            { ...props } />
        <div className="background__overlay" />
    </div>
);

export default FullScreenImage;
