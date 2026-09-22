const validateDigits = (value, fieldName, exactLength) => {
    if (!value.trim()) return `${fieldName} is required`;
    if (!/^\d*$/.test(value)) return `${fieldName} can only contain digits`;
    if (value.length !== exactLength) return `${fieldName} must be exactly ${exactLength} digits`;
    return '';
};

export const validateName = (value, fieldName = 'Name', max = 40) => {
    if (!value.trim()) return `${fieldName} is required`;
    if (!/^[A-Za-z\s]*$/.test(value)) return `${fieldName} can only contain letters and spaces`;
    if (value.length > max) return `${fieldName} cannot exceed ${max} characters`;
    return '';
};

export const validateMobile = (value) => validateDigits(value, 'Mobile number', 10);

export const validatePincode = (value) => validateDigits(value, 'Pincode', 6);

export const validateEmail = (value) => {
    if (!value.trim()) return 'Email address is required';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) return 'Enter a valid email address';
    if (value.length > 80) return 'Email cannot exceed 80 characters';
    return '';
};

export const validateRequiredText = (value, fieldName = 'Field', min = 2, max = 100) => {
    if (!value.trim()) return `${fieldName} is required`;
    if (value.length < min) return `${fieldName} is too short`;
    if (value.length > max) return `${fieldName} cannot exceed ${max} characters`;
    return '';
};

export const isInputAllowed = (name, value, constraints = {}) => {
    const rule = constraints[name];
    if (!rule) return true;
    if (rule.max && value.length > rule.max) return false;
    if (rule.regex && !rule.regex.test(value)) return false;
    return true;
};

export const validateWithMap = (name, value, validatorMap, formState = {}) => {
    const validator = validatorMap[name];
    return validator ? validator(value, formState) : '';
};
