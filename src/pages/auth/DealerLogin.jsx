import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/webp/dealer.webp';
import {
    AuthLayout,
    AuthHeader,
    AuthSwitchLink,
    AuthFormField,
    ForgotPinModal
} from './components';
import { validateMobile } from './utils/validation';
import { useAuthForm } from './utils/useAuthForm';

const DEALER_LOGIN_CONSTRAINTS = {
    mobile: { regex: /^\d*$/, max: 10 },
    pin: { regex: /^\d*$/, max: 4 },
};

const DEALER_LOGIN_VALIDATORS = {
    mobile: validateMobile,
    pin: (v) => {
        if (!v) return "PIN is required";
        if (v.length !== 4) return "PIN must be 4 digits";
        return "";
    }
};

const INITIAL_DEALER_LOGIN_STATE = {
    mobile: '',
    pin: '',
};

const DEALER_LOGIN_FIELDS = [
    {
        name: 'mobile',
        label: 'Mobile Number',
        placeholder: 'Enter 10-digit mobile number',
        isPhone: true,
    },
    {
        name: 'pin',
        label: '4-Digit PIN',
        placeholder: 'Enter your 4-digit PIN',
        maxLength: 4,
        type: 'password',
    },
];

const DealerLogin = () => {
    const navigate = useNavigate();
    const [isForgotPinOpen, setIsForgotPinOpen] = useState(false);

    const authForm = useAuthForm(
        INITIAL_DEALER_LOGIN_STATE,
        DEALER_LOGIN_VALIDATORS,
        DEALER_LOGIN_CONSTRAINTS
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!authForm.validateAll()) return;

        console.log("Dealer Login submitted:", authForm.formData);
        // Normally authenticate here, then redirect
        navigate("/dealers"); // Assuming this is dealer dashboard or similar
    };

    return (
        <AuthLayout
            bannerImg={loginImg}
            bannerAlt="WallX Dealer Login Banner"
            bannerPosition="object-center"
            maxWidth="max-w-[460px] xl:max-w-[480px]"
            backPath="/"
        >
            <AuthHeader
                title="Welcome Back, Dealer!"
                subtitle="Login to your WallX Partner Account"
                description="Access dealer pricing, track orders, and grow your business."
            />

            <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4 sm:space-y-5"
            >
                <div className="space-y-3 sm:space-y-4">
                    {DEALER_LOGIN_FIELDS.map((field) => (
                        <AuthFormField key={field.name} field={field} form={authForm} />
                    ))}
                </div>

                <div className="flex justify-end pt-1">
                    <button
                        type="button"
                        onClick={() => setIsForgotPinOpen(true)}
                        className="text-xs sm:text-sm font-semibold text-[#d82b2b] hover:text-[#b82222] hover:underline"
                    >
                        Forgot PIN?
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full h-11 sm:h-12 mt-2 bg-[#d82b2b] hover:bg-[#b82222] text-white font-semibold text-sm sm:text-base rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center tracking-wide"
                >
                    Log In
                </button>
            </form>

            <AuthSwitchLink
                prompt="Don't have an account?"
                linkText="Register here"
                to="/dealer-signup"
            />

            <ForgotPinModal
                isOpen={isForgotPinOpen}
                onClose={() => setIsForgotPinOpen(false)}
                defaultMobile={authForm.formData.mobile}
            />
        </AuthLayout>
    );
};

export default DealerLogin;
