import FormField from './FormField';
import { FIELD_INPUT_BASE, getFieldBorderClass } from './fieldStyles';

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
        <FormField label={label} error={error} className={className}>
            <div
                className={`${FIELD_INPUT_BASE} flex items-center focus-within:bg-white ${getFieldBorderClass(error)}`}
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
        </FormField>
    );
};

export default PhoneInputField;
