import FormField from './FormField';
import { FIELD_INPUT_BASE, getFieldBorderClass } from './fieldStyles';

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
        <FormField label={label} error={error} className={className}>
            <select
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                className={`${FIELD_INPUT_BASE} focus:bg-white focus:outline-none cursor-pointer ${
                    !value ? 'text-gray-400' : 'text-gray-800'
                } ${getFieldBorderClass(error)}`}
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
        </FormField>
    );
};

export default SelectField;
