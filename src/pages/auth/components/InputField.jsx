import React from 'react';

const InputField = ({
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    maxLength,
    required = true,
    className = ''
}) => {
    return (
        <div className={className}>
            {label && (
                <label className="block text-[11px] sm:text-[12px] lg:text-[12px] xl:text-[13px] font-semibold uppercase tracking-wider text-gray-600 mb-2 lg:mb-2.5 xl:mb-3">
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                maxLength={maxLength}
                required={required}
                className={`w-full h-[46px] sm:h-[50px] lg:h-[44px] xl:h-[48px] border rounded-lg bg-gray-50/50 px-3.5 sm:px-4 text-[14px] sm:text-[15px] lg:text-[14px] xl:text-[15px] text-gray-800 focus:bg-white focus:outline-none transition-all ${
                    error ? 'border-[#d82b2b]' : 'border-gray-300 focus:border-[#d82b2b] focus:ring-1 focus:ring-[#d82b2b]'
                }`}
            />
            {error && (
                <p className="mt-1 text-xs text-[#d82b2b] leading-tight">{error}</p>
            )}
        </div>
    );
};

export default InputField;
