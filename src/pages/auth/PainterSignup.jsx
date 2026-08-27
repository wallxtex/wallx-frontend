import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signupImg from '../../assets/webp/painter.webp';
import {
    AuthLayout,
    InputField,
    PhoneInputField
} from './components';
import {
    validateName,
    validateMobile,
    validateRequiredText,
    validateWithMap,
    isInputAllowed
} from './utils/validation';

const PAINTER_CONSTRAINTS = {
    name: { regex: /^[A-Za-z\s]*$/, max: 40 },
    mobile: { regex: /^\d*$/, max: 10 },
    address: { max: 500 },
};

const PAINTER_VALIDATORS = {
    name: (v) => validateName(v, 'Name', 40),
    address: (v) => validateRequiredText(v, 'Address', 2, 500),
    mobile: validateMobile,
};

const PainterSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        mobile: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        address: '',
        mobile: ''
    });

    const validateField = (name, value) => validateWithMap(name, value, PAINTER_VALIDATORS);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!isInputAllowed(name, value, PAINTER_CONSTRAINTS)) return;

        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            name: validateField('name', formData.name),
            address: validateField('address', formData.address),
            mobile: validateField('mobile', formData.mobile)
        };
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((err) => err !== '');
        if (hasErrors) return;

        console.log('Painter form submitted:', formData);
        navigate('/painter-verification', { state: { mobile: formData.mobile } });
    };

    return (
        <AuthLayout
            bannerImg={signupImg}
            bannerAlt="WallX Painter Signup Banner"
            bannerPosition="object-[65%_center]"
            title="Create Painter Account"
            subtitle="Start Exploring Opportunities - It's Free"
            description="Join the community and start your professional journey today."
            onSubmit={handleSubmit}
            submitText="Register"
            backPath="/"
        >
            <InputField
                label="Full Name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                maxLength={40}
                required
            />

            <PhoneInputField
                label="Mobile Number"
                name="mobile"
                placeholder="Enter 10-digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.mobile}
                required
            />

            <InputField
                label="Address"
                name="address"
                placeholder="Enter your full address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.address}
                maxLength={500}
                required
            />
        </AuthLayout>
    );
};

export default PainterSignup;