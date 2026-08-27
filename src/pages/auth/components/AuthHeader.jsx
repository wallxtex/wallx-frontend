import React from 'react';

const AuthHeader = ({ title, subtitle, description, className = 'mb-6 sm:mb-8 lg:mb-7 xl:mb-9' }) => {
    return (
        <div className={className}>
            <h1 className="text-2xl sm:text-3xl lg:text-[26px] xl:text-[32px] font-bold text-gray-900 tracking-tight mb-1.5 sm:mb-2 lg:mb-2">
                {title}
            </h1>
            {subtitle && (
                <p className="text-[#d82b2b] font-semibold text-[13px] sm:text-[15px] lg:text-[14.5px] xl:text-[16px] mb-1 sm:mb-1.5 lg:mb-1.5">
                    {subtitle}
                </p>
            )}
            {description && (
                <p className="text-gray-500 text-xs sm:text-sm lg:text-[13.5px] xl:text-[15px] leading-tight sm:leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
};

export default AuthHeader;
