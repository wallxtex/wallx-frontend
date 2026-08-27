import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const AuthBackButton = ({
    to = '/',
    className = 'mb-4 sm:mb-6 lg:mb-0 lg:absolute lg:top-6 lg:left-8 xl:top-10 xl:left-16 z-10'
}) => {
    const navigate = useNavigate();

    return (
        <div className={className}>
            <button
                type="button"
                onClick={() => navigate(to)}
                className="text-gray-600 hover:text-gray-900 transition-colors p-2 -ml-2 rounded-full hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-fit"
                aria-label="Go back"
            >
                <IoArrowBack className="text-2xl" />
            </button>
        </div>
    );
};

export default AuthBackButton;
