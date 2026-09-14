import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/webp/painter.webp';
import {
    AuthLayout,
    AuthHeader,
    AuthSwitchLink,
    AuthFormField,
    ForgotPinModal
} from './components';
import { validateMobile } from './utils/validation';
import { useAuthForm } from './utils/useAuthForm';

const PAINTER_LOGIN_CONSTRAINTS = {
    mobile: { regex: /^\d*$/, max: 10 },
    pin: { regex: /^\d*$/, max: 4 },
};

const PAINTER_LOGIN_VALIDATORS = {
    mobile: validateMobile,
    pin: (v) => {
        if (!v) return "PIN is required";
        if (v.length !== 4) return "PIN must be 4 digits";
        return "";
    }
};

const INITIAL_PAINTER_LOGIN_STATE = {
    mobile: '',
    pin: '',
};

const PAINTER_LOGIN_FIELDS = [
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

const PainterLogin = () => {
    const navigate = useNavigate();
    const [isForgotPinOpen, setIsForgotPinOpen] = useState(false);

    const authForm = useAuthForm(
        INITIAL_PAINTER_LOGIN_STATE,
        PAINTER_LOGIN_VALIDATORS,
        PAINTER_LOGIN_CONSTRAINTS
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!authForm.validateAll()) return;

        console.log("Painter Login submitted:", authForm.formData);
        // Normally authenticate here, then redirect
        navigate("/painter/dashboard");
    };

    return (
        <AuthLayout
            bannerImg={loginImg}
            bannerAlt="WallX Painter Login Banner"
            bannerPosition="object-[65%_center]"
            maxWidth="max-w-[460px] xl:max-w-[480px]"
            backPath="/"
        >
            <AuthHeader
                title="Welcome Back, Painter!"
                subtitle="Login to your WallX Account"
                description="Access your dashboard, manage your profile, and redeem rewards."
            />

            <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4 sm:space-y-5"
            >
                <div className="space-y-3 sm:space-y-4">
                    {PAINTER_LOGIN_FIELDS.map((field) => (
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
                to="/painter-signup"
            />

            <ForgotPinModal
                isOpen={isForgotPinOpen}
                onClose={() => setIsForgotPinOpen(false)}
                defaultMobile={authForm.formData.mobile}
            />
        </AuthLayout>
    );
};

export default PainterLogin;
