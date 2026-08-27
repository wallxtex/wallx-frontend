import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import signupImg from '../../assets/webp/painter.webp';

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

    const validateField = (name, value) => {
        switch (name) {
            case 'name': {
                if (!value.trim()) return 'Name is required';
                if (!/^[A-Za-z\s]*$/.test(value)) return 'Name can only contain letters and spaces';
                if (value.length > 40) return 'Name cannot exceed 40 characters';
                return '';
            }
            case 'address': {
                if (!value.trim()) return 'Address is required';
                if (value.length > 500) return 'Address cannot exceed 500 characters';
                return '';
            }
            case 'mobile': {
                if (!value.trim()) return 'Mobile number is required';
                if (!/^[0-9]*$/.test(value)) return 'Mobile number can only contain digits';
                if (value.length !== 10) return 'Mobile number must be exactly 10 digits';
                return '';
            }
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Block invalid characters at input time
        if (name === 'name' && !/^[A-Za-z\s]*$/.test(value)) return;
        if (name === 'mobile' && !/^[0-9]*$/.test(value)) return;
        if (name === 'name' && value.length > 40) return;
        if (name === 'mobile' && value.length > 10) return;
        if (name === 'address' && value.length > 500) return;

        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: validateField(name, value) });
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
            <div className="hidden lg:block lg:w-1/2 h-full relative overflow-hidden shrink-0">
                <img
                    src={signupImg}
                    alt="WallX Painter Signup Banner"
                    className="w-full h-full object-cover object-[65%_center]"
                />
            </div>

            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center relative px-6 sm:px-12 xl:px-24 py-4 sm:py-8 lg:py-12 overflow-y-auto">
                {/* Top Back Arrow Button */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-10 xl:top-10 xl:left-24 z-10">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="text-gray-600 hover:text-gray-900 transition-colors p-2 -ml-2 rounded-full hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-fit"
                        aria-label="Back to home"
                    >
                        <IoArrowBack className="text-2xl" />
                    </button>
                </div>

                {/* Main Content Form Card */}
                <div className="w-full max-w-[460px] xl:max-w-[480px] mx-auto pt-6 sm:pt-0">
                    <div className="mb-4 sm:mb-6 lg:mb-9">
                        <h1 className="text-2xl sm:text-3xl xl:text-[34px] font-bold text-gray-900 tracking-tight mb-1.5 sm:mb-2">
                            Create Painter Account
                        </h1>
                        <p className="text-[#d82b2b] font-semibold text-[13px] sm:text-[15px] lg:text-[16px] mb-1">
                            Start Exploring Opportunities - It's Free
                        </p>
                        <p className="text-gray-500 text-xs sm:text-sm lg:text-[15px] leading-tight sm:leading-relaxed">
                            Join the community and start your professional journey today.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-3.5 sm:space-y-5 lg:space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider text-gray-600 mb-1.5 lg:mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                maxLength={40}
                                className={`w-full h-[44px] sm:h-[50px] lg:h-[52px] border rounded-lg bg-gray-50/50 px-3.5 sm:px-4 text-[14px] sm:text-[15px] text-gray-800 focus:bg-white focus:outline-none transition-all ${
                                    errors.name ? 'border-[#d82b2b]' : 'border-gray-300 focus:border-[#d82b2b] focus:ring-1 focus:ring-[#d82b2b]'
                                }`}
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-[#d82b2b]">{errors.name}</p>
                            )}
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label className="block text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider text-gray-600 mb-1.5 lg:mb-2">
                                Mobile Number
                            </label>
                            <div
                                className={`w-full h-[44px] sm:h-[50px] lg:h-[52px] border rounded-lg bg-gray-50/50 flex items-center px-3.5 sm:px-4 focus-within:bg-white transition-all ${
                                    errors.mobile ? 'border-[#d82b2b]' : 'border-gray-300 focus-within:border-[#d82b2b] focus-within:ring-1 focus-within:ring-[#d82b2b]'
                                }`}
                            >
                                <span className="text-gray-600 font-medium text-[14px] sm:text-[15px] mr-2 select-none">
                                    +91
                                </span>
                                <span className="text-gray-300 mr-3 select-none">|</span>
                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="Enter 10-digit mobile number"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    maxLength={10}
                                    className="flex-1 h-full text-[14px] sm:text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
                                    required
                                />
                            </div>
                            {errors.mobile && (
                                <p className="mt-1 text-xs text-[#d82b2b]">{errors.mobile}</p>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider text-gray-600 mb-1.5 lg:mb-2">
                                Address
                            </label>
                            <textarea
                                name="address"
                                placeholder="Enter your complete address with landmark"
                                value={formData.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                maxLength={500}
                                rows={2}
                                className={`w-full border rounded-lg bg-gray-50/50 p-3 sm:p-4 text-[14px] sm:text-[15px] text-gray-800 focus:bg-white focus:outline-none transition-all resize-none lg:rows-3 ${
                                    errors.address ? 'border-[#d82b2b]' : 'border-gray-300 focus:border-[#d82b2b] focus:ring-1 focus:ring-[#d82b2b]'
                                }`}
                                required
                            />
                            <div className="flex justify-between items-center mt-1">
                                {errors.address ? (
                                    <p className="text-xs text-[#d82b2b]">{errors.address}</p>
                                ) : (
                                    <span />
                                )}
                                <p className="text-[10px] sm:text-[11px] text-gray-400">{formData.address.length}/500</p>
                            </div>
                        </div>

                        {/* Submit Button with Gap */}
                        <div className="pt-1 sm:pt-2 lg:pt-3">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full h-[46px] sm:h-[50px] lg:h-[52px] bg-[#d82b2b] hover:bg-[#b92525] active:scale-[0.99] text-white font-semibold text-[15px] sm:text-base rounded-lg transition-all shadow-md shadow-[#d82b2b]/20 flex items-center justify-center cursor-pointer"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    {/* Bottom Login Link with Gap */}
                    <div className="mt-4 sm:mt-6 lg:mt-9 text-center text-xs sm:text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#d82b2b] font-semibold hover:underline">
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PainterSignup;