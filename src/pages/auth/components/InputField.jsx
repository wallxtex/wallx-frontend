import FormField from './FormField';
import { FIELD_INPUT_BASE, getFieldBorderClass } from './fieldStyles';

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
        <FormField label={label} error={error} className={className}>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                maxLength={maxLength}
                required={required}
                className={`${FIELD_INPUT_BASE} text-gray-800 focus:bg-white focus:outline-none ${getFieldBorderClass(
                    error
                )}`}
            />
        </FormField>
    );
};

export default InputField;
