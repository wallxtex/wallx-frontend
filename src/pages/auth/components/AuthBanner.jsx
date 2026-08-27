import React from 'react';
import defaultBannerImg from '../../../assets/webp/dealer.webp';

const AuthBanner = ({
    image = defaultBannerImg,
    alt = 'WallX Auth Banner',
    objectPosition = 'object-center'
}) => {
    return (
        <div className="hidden lg:block lg:w-1/2 h-full relative overflow-hidden shrink-0 bg-gray-900">
            <img
                src={image}
                alt={alt}
                className={`w-full h-full object-cover ${objectPosition}`}
            />
        </div>
    );
};

export default AuthBanner;
