import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupImg from '../../assets/webp/painter.webp';
import {
    AuthBanner,
    AuthHeader,
    AuthBackButton,
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
    mobile: { regex: /^[0-9]*$/, max: 10 },
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

        console.log('Form submitted:', formData);
        navigate('/painter-verification', { state: { mobile: formData.mobile } });
    };

    return (
        <div className="h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] lg:h-screen lg:max-h-screen overflow-hidden bg-white flex flex-col lg:flex-row">
            <AuthBanner
                image={signupImg}
                alt="WallX Painter Signup Banner"
                objectPosition="object-[65%_center]"
            />

            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center relative px-6 sm:px-12 xl:px-24 py-4 sm:py-8 lg:py-12 overflow-y-auto">
                <AuthBackButton onClick={() => navigate('/')} />

                <div className="w-full max-w-[460px] xl:max-w-[480px] mx-auto pt-6 sm:pt-0">
                    <AuthHeader
                        title="Create Painter Account"
                        subtitle="Start Exploring Opportunities - It's Free"
                        description="Join the community and start your professional journey today."
                    />

                    <form onSubmit={handleSubmit} noValidate className="space-y-3.5 sm:space-y-5 lg:space-y-6">
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

                        <p className="text-xs text-gray-500 leading-normal pt-1">
                            By clicking Register, you agree to our{' '}
                            <Link to="/terms" className="text-[#d82b2b] hover:underline font-medium">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link to="/privacy" className="text-[#d82b2b] hover:underline font-medium">
                                Privacy Policy
                            </Link>
                            .
                        </p>

                        <button
                            type="submit"
                            className="w-full h-[46px] sm:h-[50px] lg:h-[54px] bg-[#d82b2b] hover:bg-[#b82222] text-white font-semibold text-[15px] sm:text-[16px] rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center tracking-wide"
                        >
                            Register
                        </button>
                    </form>

                    <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#d82b2b] hover:underline font-semibold">
                            Login here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PainterSignup;