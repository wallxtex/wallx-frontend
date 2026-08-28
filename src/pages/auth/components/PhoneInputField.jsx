import FormField from './FormField';
import { FIELD_INPUT_BASE, getFieldBorderClass } from './fieldStyles';

const PhoneInputField = ({ label, error, className, countryCode = '+91', ...rest }) => (
    <FormField label={label} error={error} className={className}>
        <div className={`${FIELD_INPUT_BASE} flex items-center focus-within:bg-white ${getFieldBorderClass(error)}`}>
            <span className="text-gray-600 font-medium text-[13px] sm:text-[14px] lg:text-[14px] xl:text-[15px] mr-2 select-none">
                {countryCode}
            </span>
            <span className="text-gray-300 mr-3 select-none">|</span>
            <input
                {...rest}
                type="tel"
                className="flex-1 h-full text-[14px] sm:text-[15px] lg:text-[14px] xl:text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
            />
        </div>
    </FormField>
);

export default PhoneInputField;
