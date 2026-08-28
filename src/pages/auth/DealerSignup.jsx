import { useNavigate } from 'react-router-dom';
import dealerBannerImg from '../../assets/webp/dealer.webp';
import {
    AuthLayout,
    AuthHeader,
    AuthSwitchLink,
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
    validateRequiredText
} from './utils/validation';
import { useAuthForm } from './utils/useAuthForm';

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

const INITIAL_DEALER_STATE = {
    dealerName: '',
    shopName: '',
    mobile: '',
    email: '',
    state: '',
    city: '',
    pincode: '',
    area: ''
};

const DealerSignup = () => {
    const navigate = useNavigate();
    const {
        formData,
        errors,
        handleChange,
        handleBlur,
        validateAll
    } = useAuthForm(INITIAL_DEALER_STATE, DEALER_VALIDATORS, DEALER_CONSTRAINTS);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateAll()) return;

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
        <AuthLayout
            bannerImg={dealerBannerImg}
            bannerAlt="WallX Dealer Signup Banner"
            bannerPosition="object-center"
            maxWidth="max-w-[600px] xl:max-w-[640px]"
            backPath="/"
        >
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

            <AuthSwitchLink
                prompt="Already registered as a dealer?"
                linkText="Log In"
                to="/login"
                className="mt-4 sm:mt-6 lg:mt-4 xl:mt-5 text-center text-xs sm:text-sm lg:text-[13.5px] text-gray-600"
            />
        </AuthLayout>
    );
};

export default DealerSignup;
