import React, { Component } from 'react';
import Image from '@components/Image';
import './style.css';

export const IMAGE_TYPE = {
    main: 'main',
    placeholder: 'placeholder'
};

class FullScreenImage extends Component {
    state = {
        isLoading: true,
    };

    handlePhotoLoad = (type = IMAGE_TYPE.main) => {
        const { onPhotoLoad } = this.props;

        this.setState({ isLoading: false });
        onPhotoLoad && onPhotoLoad({ type });
    };

    handleOnload = () => {
        this.handlePhotoLoad(IMAGE_TYPE.main);
    };

    handleOnError = () => {
        this.handlePhotoLoad(IMAGE_TYPE.placeholder);
    };

    render() {
        const {
            src,
            placeholder,
            timeout,
            credits,
            previousPhotoUrl,
        } = this.props;
        const {
            isLoading
        } = this.state;

        return (
            <div className="background">
                <div className="background__imageContainer">
                    {previousPhotoUrl &&
                        <img src={previousPhotoUrl} alt=""
                            className="background__image" />}
                    <Image
                        key={src}
                        extraClasses="background__image"
                        src={src}
                        placeholder={placeholder}
                        onLoad={this.handleOnload}
                        onError={this.handleOnError}
                        timeout={timeout} />
                    <div className={`background__overlay ${isLoading ? 'background__overlay_loading' : ''}`} />
                </div>
                {credits &&
                    <div className="background__credits">
                        {credits}
                    </div>
                }
            </div>
        );
    }
}

export default FullScreenImage;
