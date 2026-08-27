import React from 'react';

const SelectField = ({
    label,
    name,
    value,
    onChange,
    onBlur,
    options = [],
    placeholder = 'Select option',
    error,
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
            <select
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                className={`w-full h-[46px] sm:h-[50px] lg:h-[44px] xl:h-[48px] border rounded-lg bg-gray-50/50 px-3.5 sm:px-4 text-[14px] sm:text-[15px] lg:text-[14px] xl:text-[15px] focus:bg-white focus:outline-none transition-all cursor-pointer ${
                    !value ? 'text-gray-400' : 'text-gray-800'
                } ${
                    error ? 'border-[#d82b2b]' : 'border-gray-300 focus:border-[#d82b2b] focus:ring-1 focus:ring-[#d82b2b]'
                }`}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((opt) => {
                    const val = typeof opt === 'string' ? opt : opt.value;
                    const labelText = typeof opt === 'string' ? opt : opt.label;
                    return (
                        <option key={val} value={val} className="text-gray-800">
                            {labelText}
                        </option>
                    );
                })}
            </select>
            {error && (
                <p className="mt-1 text-xs text-[#d82b2b] leading-tight">{error}</p>
            )}
        </div>
    );
};

export default SelectField;
