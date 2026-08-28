import FormField from './FormField';
import { FIELD_INPUT_BASE, getFieldBorderClass } from './fieldStyles';

const InputField = (props) => (
    <FormField label={props.label} error={props.error} className={props.className}>
        <input
            {...props}
            type={props.type || 'text'}
            className={`${FIELD_INPUT_BASE} text-gray-800 focus:bg-white focus:outline-none ${getFieldBorderClass(props.error)}`}
        />
    </FormField>
);

export default InputField;
