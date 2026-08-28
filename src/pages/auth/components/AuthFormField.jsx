import InputField from './InputField';
import PhoneInputField from './PhoneInputField';
import SelectField from './SelectField';

const AuthFormField = ({ field, form }) => {
  const { name, label, placeholder, isSelect, isPhone, options, type, maxLength, required } = field;
  const commonProps = {
    label,
    name,
    placeholder,
    value: form.formData[name],
    onChange: form.handleChange,
    onBlur: form.handleBlur,
    error: form.errors[name],
    required: required ?? true,
  };

  if (isSelect) {
    return <SelectField {...commonProps} options={options} />;
  }
  if (isPhone) {
    return <PhoneInputField {...commonProps} />;
  }
  return <InputField {...commonProps} type={type || 'text'} maxLength={maxLength} />;
};

export default AuthFormField;
