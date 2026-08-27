import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthBanner from './AuthBanner';
import AuthBackButton from './AuthBackButton';

const AuthLayout = ({
    bannerImg,
    bannerAlt = 'Auth Banner',
    bannerPosition = 'object-center',
    maxWidth = 'max-w-[460px] xl:max-w-[480px]',
    backPath = '/',
    children
}) => {
    const navigate = useNavigate();

    return (
        <div className="h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] lg:h-screen lg:max-h-screen overflow-hidden bg-white flex flex-col lg:flex-row">
            <AuthBanner
                image={bannerImg}
                alt={bannerAlt}
                objectPosition={bannerPosition}
            />

            <div className="w-full lg:w-1/2 h-full flex flex-col justify-start lg:justify-center relative px-6 sm:px-12 lg:px-12 xl:px-20 py-4 sm:py-8 lg:py-8 xl:py-12 overflow-y-auto">
                <AuthBackButton
                    onClick={() => navigate(backPath)}
                    className="mb-4 sm:mb-6 lg:mb-0 lg:absolute lg:top-6 lg:left-8 xl:top-9 xl:left-16 z-10"
                />

                <div className={`w-full ${maxWidth} mx-auto my-auto pt-2 sm:pt-0`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
