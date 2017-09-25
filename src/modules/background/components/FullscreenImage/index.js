import React from 'react';
import Image from '@components/Image';
import './style.css';

export const IMAGE_TYPE = {
    main: 'main',
    placeholder: 'placeholder'
};

const FullScreenImage = (props = {}) => {
    const {
        src,
        placeholder,
        style,
        timeout,
        onPhotoLoad,
        credits,
    } = props;

    const onLoad = () => onPhotoLoad({type: IMAGE_TYPE.main});
    const onError = () => onPhotoLoad({type: IMAGE_TYPE.placeholder});

    return (
        <div className="background">
            <div className="background__imageContainer" style={ style }>
                <Image
                    key={ src }
                    extraClasses="background__image"
                    src={ src }
                    placeholder={ placeholder }
                    onLoad={ onPhotoLoad && onLoad }
                    onError={ onPhotoLoad && onError }
                    timeout={ timeout } />
                <div className="background__overlay" />
            </div>
            { credits &&
                <div className="background__credits">
                    { credits }
                </div>
            }
        </div>
    );
}

export default FullScreenImage;
