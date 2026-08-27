import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthBanner from './AuthBanner';
import AuthBackButton from './AuthBackButton';
import AuthHeader from './AuthHeader';

const AuthLayout = ({
    bannerImg,
    bannerAlt = 'Auth Banner',
    bannerPosition = 'object-center',
    title,
    subtitle,
    description,
    onSubmit,
    submitText = 'Register',
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

            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center relative px-6 sm:px-12 xl:px-24 py-4 sm:py-8 lg:py-12 overflow-y-auto">
                <AuthBackButton onClick={() => navigate(backPath)} />

                <div className="w-full max-w-[460px] xl:max-w-[480px] mx-auto pt-6 sm:pt-0">
                    <AuthHeader
                        title={title}
                        subtitle={subtitle}
                        description={description}
                    />

                    <form onSubmit={onSubmit} noValidate className="space-y-3.5 sm:space-y-5 lg:space-y-6">
                        {children}

                        <p className="text-xs text-gray-500 leading-normal pt-1">
                            By clicking {submitText}, you agree to our{' '}
                            <Link to="/terms" className="text-[#d82b2b] hover:underline font-medium">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link to="/privacy" className="text-[#d82b2b] hover:underline font-medium">
                                Privacy Policy
                            </Link>
                            .
                        </p>

                        <button
                            type="submit"
                            className="w-full h-[46px] sm:h-[50px] lg:h-[54px] bg-[#d82b2b] hover:bg-[#b82222] text-white font-semibold text-[15px] sm:text-[16px] rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center tracking-wide"
                        >
                            {submitText}
                        </button>
                    </form>

                    <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#d82b2b] hover:underline font-semibold">
                            Login here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
