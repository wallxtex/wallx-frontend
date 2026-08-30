import FormField from './FormField';
import { FIELD_INPUT_BASE, getFieldBorderClass } from './fieldStyles';

const SelectField = ({ label, error, className, options = [], placeholder = 'Select option', ...rest }) => (
    <FormField label={label} error={error} className={className}>
        <select
            {...rest}
            className={`${FIELD_INPUT_BASE} focus:bg-white focus:outline-none cursor-pointer ${
                !rest.value ? 'text-gray-400' : 'text-gray-800'
            } ${getFieldBorderClass(error)}`}
        >
            <option value="" disabled>{placeholder}</option>
            {options.map((opt) => {
                const val = typeof opt === 'string' ? opt : opt.value;
                const labelText = typeof opt === 'string' ? opt : opt.label;
                return <option key={val} value={val} className="text-gray-800">{labelText}</option>;
            })}
        </select>
    </FormField>
);

export default SelectField;
