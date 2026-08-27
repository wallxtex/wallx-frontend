import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dealerBannerImg from '../../assets/webp/dealer.webp';
import {
    AuthBanner,
    AuthHeader,
    AuthBackButton,
    InputField,
    PhoneInputField,
    SelectField,
    INDIAN_STATES
} from './components';

import {
    validateName,
    validateMobile,
    validateEmail,
    validatePincode,
    validateRequiredText,
    validateWithMap,
    isInputAllowed
} from './utils/validation';

const DEALER_CONSTRAINTS = {
    dealerName: { regex: /^[A-Za-z\s]*$/, max: 50 },
    shopName: { max: 80 },
    city: { regex: /^[A-Za-z\s]*$/, max: 50 },
    mobile: { regex: /^\d*$/, max: 10 },
    pincode: { regex: /^\d*$/, max: 6 },
    email: { max: 80 },
    area: { max: 100 },
};

const DEALER_VALIDATORS = {
    dealerName: (v) => validateName(v, 'Dealer Name', 50),
    shopName: (v) => validateRequiredText(v, 'Shop Name', 2, 80),
    mobile: validateMobile,
    email: validateEmail,
    state: (v) => (!v.trim() ? 'Please select state' : ''),
    city: (v) => validateName(v, 'City', 50),
    pincode: validatePincode,
    area: (v) => validateRequiredText(v, 'Area', 2, 100),
};

const DealerSignup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        dealerName: '',
        shopName: '',
        mobile: '',
        email: '',
        state: '',
        city: '',
        pincode: '',
        area: ''
    });

    const [errors, setErrors] = useState({
        dealerName: '',
        shopName: '',
        mobile: '',
        email: '',
        state: '',
        city: '',
        pincode: '',
        area: ''
    });

    const validateField = (name, value) => validateWithMap(name, value, DEALER_VALIDATORS);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!isInputAllowed(name, value, DEALER_CONSTRAINTS)) return;

        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            dealerName: validateField('dealerName', formData.dealerName),
            shopName: validateField('shopName', formData.shopName),
            mobile: validateField('mobile', formData.mobile),
            email: validateField('email', formData.email),
            state: validateField('state', formData.state),
            city: validateField('city', formData.city),
            pincode: validateField('pincode', formData.pincode),
            area: validateField('area', formData.area)
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((err) => err !== '');
        if (hasErrors) return;

        console.log('Dealer form submitted:', formData);
        navigate('/dealer-verification', {
            state: {
                mobile: formData.mobile,
                email: formData.email,
                dealerName: formData.dealerName,
                shopName: formData.shopName,
                city: formData.city,
                state: formData.state
            }
        });
    };

    return (
        <div className="h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] lg:h-screen lg:max-h-screen overflow-hidden bg-white flex flex-col lg:flex-row">
            {/* Desktop Banner */}
            <AuthBanner
                image={dealerBannerImg}
                alt="WallX Dealer Signup Banner"
                objectPosition="object-center"
            />

            {/* Form Container */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-start lg:justify-center relative px-6 sm:px-12 lg:px-12 xl:px-20 py-6 sm:py-8 lg:py-8 xl:py-12 overflow-y-auto lg:overflow-y-hidden">
                <AuthBackButton
                    onClick={() => navigate('/')}
                    className="mb-4 sm:mb-6 lg:mb-0 lg:absolute lg:top-6 lg:left-8 xl:top-9 xl:left-16 z-10"
                />

                <div className="w-full max-w-[600px] xl:max-w-[640px] mx-auto pb-4 sm:pb-6 lg:pb-0 pt-2 lg:pt-0">
                    <AuthHeader
                        title="Create Dealer Account"
                        subtitle="Partner with WallX - Grow Your Business"
                        description="Register your retail store or dealership to access exclusive dealer pricing and support."
                        className="mb-6 sm:mb-8 lg:mb-6 xl:mb-8"
                    />

                    <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5 lg:space-y-4.5 xl:space-y-5">
                        {/* Section 1: Business & Personal Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-4.5 xl:gap-5">
                            <InputField
                                label="Dealer Name"
                                name="dealerName"
                                placeholder="Enter dealer / owner name"
                                value={formData.dealerName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.dealerName}
                                maxLength={50}
                            />

                            <InputField
                                label="Shop / Business Name"
                                name="shopName"
                                placeholder="Enter shop or firm name"
                                value={formData.shopName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.shopName}
                                maxLength={80}
                            />
                        </div>

                        {/* Section 2: Contact Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-4.5 xl:gap-5">
                            <PhoneInputField
                                label="Phone Number"
                                name="mobile"
                                placeholder="10-digit mobile number"
                                value={formData.mobile}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.mobile}
                            />

                            <InputField
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="name@domain.com"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.email}
                                maxLength={80}
                            />
                        </div>

                        {/* Section 3: State & City */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-4.5 xl:gap-5">
                            <SelectField
                                label="State"
                                name="state"
                                placeholder="Select state"
                                value={formData.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                options={INDIAN_STATES}
                                error={errors.state}
                            />

                            <InputField
                                label="City Name"
                                name="city"
                                placeholder="Enter your city"
                                value={formData.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.city}
                                maxLength={50}
                            />
                        </div>

                        {/* Section 4: Pincode & Area */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-4.5 xl:gap-5">
                            <InputField
                                label="Pincode"
                                name="pincode"
                                placeholder="6-digit pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.pincode}
                                maxLength={6}
                            />

                            <InputField
                                label="Area / Market / Landmark"
                                name="area"
                                placeholder="e.g. Sector 18, Commercial Market"
                                value={formData.area}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.area}
                                maxLength={100}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-3 sm:pt-4 lg:pt-3.5 xl:pt-5">
                            <button
                                type="submit"
                                className="w-full h-[48px] sm:h-[52px] lg:h-[44px] xl:h-[48px] bg-[#d82b2b] hover:bg-[#b92525] active:scale-[0.99] text-white font-semibold text-[15px] sm:text-base lg:text-[15px] xl:text-[16px] rounded-lg transition-all shadow-md shadow-[#d82b2b]/20 flex items-center justify-center cursor-pointer"
                            >
                                Register Dealer Account
                            </button>
                        </div>
                    </form>

                    {/* Bottom Login Link */}
                    <div className="mt-4 sm:mt-6 lg:mt-4 xl:mt-5 text-center text-xs sm:text-sm lg:text-[13.5px] text-gray-600">
                        Already registered as a dealer?{' '}
                        <Link to="/login" className="text-[#d82b2b] font-semibold hover:underline">
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealerSignup;
