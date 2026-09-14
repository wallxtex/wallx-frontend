import { useNavigate } from 'react-router-dom';
import dealerBannerImg from '../../assets/webp/dealer.webp';
import {
    AuthLayout,
    AuthHeader,
    AuthSwitchLink,
    AuthFormField,
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
    pin: { regex: /^\d*$/, max: 4 },
    confirmPin: { regex: /^\d*$/, max: 4 },
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
    pin: (v) => {
        if (!v) return 'PIN is required';
        if (v.length !== 4) return 'PIN must be 4 digits';
        return '';
    },
    confirmPin: (v, formState) => {
        if (!v) return 'Please confirm PIN';
        if (v !== formState.pin) return 'PINs do not match';
        return '';
    },
};

const INITIAL_DEALER_STATE = {
    dealerName: '',
    shopName: '',
    mobile: '',
    email: '',
    state: '',
    city: '',
    pincode: '',
    area: '',
    pin: '',
    confirmPin: ''
};

const DEALER_ROW_FIELDS = [
    [
        { name: 'dealerName', label: 'Dealer Name', placeholder: 'Enter dealer / owner name', maxLength: 50 },
        { name: 'shopName', label: 'Shop / Business Name', placeholder: 'Enter shop or firm name', maxLength: 80 },
    ],
    [
        { name: 'mobile', label: 'Phone Number', placeholder: '10-digit mobile number', isPhone: true },
        { name: 'email', label: 'Email Address', placeholder: 'name@domain.com', type: 'email', maxLength: 80 },
    ],
    [
        { name: 'state', label: 'State', placeholder: 'Select state', isSelect: true, options: INDIAN_STATES },
        { name: 'city', label: 'City Name', placeholder: 'Enter your city', maxLength: 50 },
    ],
    [
        { name: 'pincode', label: 'Pincode', placeholder: '6-digit pincode', maxLength: 6 },
        { name: 'area', label: 'Area / Market / Landmark', placeholder: 'e.g. Sector 18, Commercial Market', maxLength: 100 },
    ],
    [
        { name: 'pin', label: 'Create 4-Digit PIN', placeholder: 'Enter 4-digit PIN', maxLength: 4, type: 'password' },
        { name: 'confirmPin', label: 'Confirm 4-Digit PIN', placeholder: 'Re-enter 4-digit PIN', maxLength: 4, type: 'password' },
    ],
];

const DealerSignup = () => {
    const navigate = useNavigate();
    const authForm = useAuthForm(INITIAL_DEALER_STATE, DEALER_VALIDATORS, DEALER_CONSTRAINTS);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!authForm.validateAll()) return;

        const { formData } = authForm;
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
                {DEALER_ROW_FIELDS.map((row, rowIdx) => (
                    <div key={`row-${rowIdx}`} className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-4.5 xl:gap-5">
                        {row.map((field) => (
                            <AuthFormField key={field.name} field={field} form={authForm} />
                        ))}
                    </div>
                ))}

                {/* Submit Button */}
                <div className="pt-3 sm:pt-4 lg:pt-3.5 xl:pt-5">
                    <button
                        type="submit"
                        className="w-full h-11 sm:h-12 bg-[#d82b2b] hover:bg-[#b92525] active:scale-[0.99] text-white font-semibold text-sm sm:text-base rounded-lg transition-all shadow-md shadow-[#d82b2b]/20 flex items-center justify-center cursor-pointer"
                    >
                        Register Dealer Account
                    </button>
                </div>
            </form>

            <AuthSwitchLink
                prompt="Already registered as a dealer?"
                linkText="Log In"
                to="/dealer-login"
                className="mt-4 sm:mt-6 lg:mt-4 xl:mt-5 text-center text-xs sm:text-sm lg:text-[13.5px] text-gray-600"
            />
        </AuthLayout>
    );
};

export default DealerSignup;
