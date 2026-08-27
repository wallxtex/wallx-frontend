import React from 'react';

const PhoneInputField = ({
    label = 'Phone Number',
    name = 'mobile',
    placeholder = 'Enter 10-digit mobile number',
    value,
    onChange,
    onBlur,
    error,
    maxLength = 10,
    required = true,
    countryCode = '+91',
    className = ''
}) => {
    return (
        <div className={className}>
            {label && (
                <label className="block text-[11px] sm:text-[12px] lg:text-[12px] xl:text-[13px] font-semibold uppercase tracking-wider text-gray-600 mb-2 lg:mb-2.5 xl:mb-3">
                    {label}
                </label>
            )}
            <div
                className={`w-full h-[46px] sm:h-[50px] lg:h-[44px] xl:h-[48px] border rounded-lg bg-gray-50/50 flex items-center px-3.5 sm:px-4 focus-within:bg-white transition-all ${
                    error ? 'border-[#d82b2b]' : 'border-gray-300 focus-within:border-[#d82b2b] focus-within:ring-1 focus-within:ring-[#d82b2b]'
                }`}
            >
                <span className="text-gray-600 font-medium text-[13px] sm:text-[14px] lg:text-[14px] xl:text-[15px] mr-2 select-none">
                    {countryCode}
                </span>
                <span className="text-gray-300 mr-3 select-none">|</span>
                <input
                    type="tel"
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    maxLength={maxLength}
                    required={required}
                    className="flex-1 h-full text-[14px] sm:text-[15px] lg:text-[14px] xl:text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
                />
            </div>
            {error && (
                <p className="mt-1 text-xs text-[#d82b2b] leading-tight">{error}</p>
            )}
        </div>
    );
};

export default PhoneInputField;
