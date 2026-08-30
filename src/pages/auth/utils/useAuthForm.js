import { useState } from 'react';
import { isInputAllowed, validateWithMap } from './validation';

export const useAuthForm = (initialState, validators, constraints) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    const validate = (name, value) => validateWithMap(name, value, validators);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!isInputAllowed(name, value, constraints)) return;

        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    };

    const validateAll = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            newErrors[key] = validate(key, formData[key]);
        });
        setErrors(newErrors);
        return !Object.values(newErrors).some((err) => err !== '');
    };

    return {
        formData,
        errors,
        handleChange,
        handleBlur,
        validateAll,
        setFormData,
        setErrors,
    };
};
