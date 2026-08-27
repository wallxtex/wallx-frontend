import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupImg from '../../assets/webp/painter.webp';
import {
    AuthLayout,
    AuthHeader,
    InputField,
    PhoneInputField
} from './components';
import {
    validateName,
    validateMobile,
    validateRequiredText
} from './utils/validation';
import { useAuthForm } from './utils/useAuthForm';

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

const INITIAL_PAINTER_STATE = {
    name: '',
    address: '',
    mobile: ''
};

const PainterSignup = () => {
    const navigate = useNavigate();
    const {
        formData,
        errors,
        handleChange,
        handleBlur,
        validateAll
    } = useAuthForm(INITIAL_PAINTER_STATE, PAINTER_VALIDATORS, PAINTER_CONSTRAINTS);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateAll()) return;

        console.log('Painter form submitted:', formData);
        navigate('/painter-verification', { state: { mobile: formData.mobile } });
    };

    return (
        <AuthLayout
            bannerImg={signupImg}
            bannerAlt="WallX Painter Signup Banner"
            bannerPosition="object-[65%_center]"
            maxWidth="max-w-[460px] xl:max-w-[480px]"
            backPath="/"
        >
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
        </AuthLayout>
    );
};

export default PainterSignup;