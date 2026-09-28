import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../../assets/webp/painter.webp";
import {
  AuthLayout,
  AuthHeader,
  AuthSwitchLink,
  AuthFormField,
} from "./components";
import {
  validateName,
  validateMobile,
  validateRequiredText,
} from "./utils/validation";
import { useAuthForm } from "./utils/useAuthForm";
import { painterSignupHandler } from "../../services/global-auth/painter";
import LoadingButton from "../../components/shared/LoadingButton";
import useAsyncAction from "../../hooks/useAsyncAction";

const PAINTER_CONSTRAINTS = {
  name: { regex: /^[A-Za-z\s]*$/, max: 40 },
  mobile: { regex: /^\d*$/, max: 10 },
  address: { max: 500 },
  upi: { regex: /^[a-zA-Z0-9.\-_@]*$/, max: 50 },
  pin: { regex: /^\d*$/, max: 4 },
  confirmPin: { regex: /^\d*$/, max: 4 },
};

const PAINTER_VALIDATORS = {
  name: (v) => validateName(v, "Name", 40),
  address: (v) => validateRequiredText(v, "Address", 2, 500),
  mobile: validateMobile,
  upi: (v) => {
    if (!v.trim()) return "UPI ID is required";
    if (!/^[a-zA-Z0-9.\-_]+@[a-zA-Z]{2,64}$/.test(v)) return "Invalid UPI ID format";
    return "";
  },
  pin: (v) => {
    if (!v) return "PIN is required";
    if (v.length !== 4) return "PIN must be 4 digits";
    return "";
  },
  confirmPin: (v) => {
    if (!v) return "Please confirm your PIN";
    if (v.length !== 4) return "PIN must be 4 digits";
    return "";
  },
};

const INITIAL_PAINTER_STATE = {
  name: "",
  address: "",
  mobile: "",
  upi: "",
  pin: "",
  confirmPin: "",
};

const PAINTER_FIELDS = [
  {
    name: "name",
    label: "Full Name",
    placeholder: "Enter your full name",
    maxLength: 40,
  },
  {
    name: "mobile",
    label: "Mobile Number",
    placeholder: "Enter 10-digit mobile number",
    isPhone: true,
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Enter your full address",
    maxLength: 500,
  },
  {
    name: "upi",
    label: "UPI ID",
    placeholder: "Enter your UPI ID (e.g. name@bank)",
    maxLength: 50,
  },
  {
    name: "pin",
    label: "Create 4-Digit PIN",
    placeholder: "Enter 4-digit PIN",
    maxLength: 4,
    type: "password",
  },
  {
    name: "confirmPin",
    label: "Confirm 4-Digit PIN",
    placeholder: "Re-enter 4-digit PIN",
    maxLength: 4,
    type: "password",
  },
];

const PainterSignup = () => {
  const navigate = useNavigate();
  
  const authForm = useAuthForm(
    INITIAL_PAINTER_STATE,
    PAINTER_VALIDATORS,
    PAINTER_CONSTRAINTS,
  );

  const { run: handleSignup, loading: isLoading } = useAsyncAction(async (signupData) => {
    const response = await painterSignupHandler(signupData);
    return response;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authForm.validateAll()) return;

    if (authForm.formData.pin !== authForm.formData.confirmPin) {
      authForm.setErrors((prev) => ({ ...prev, confirmPin: "PINs do not match" }));
      return;
    }

    try {
      const signupData = {
        name: authForm.formData.name,
        mobileNumber: authForm.formData.mobile,
        upiId: authForm.formData.upi,
        address: authForm.formData.address,
        password: authForm.formData.pin,
      };

      const response = await handleSignup(signupData);

      if (response.success) {
        navigate("/painter-verification", {
          state: { 
            mobile: authForm.formData.mobile,
            signupData: authForm.formData 
          },
        });
        // Toast is automatically shown by API interceptor ✅
      }
    } catch (error) {
      console.error("Painter signup error:", error);
      // Error toast is automatically shown by API interceptor ✅
    }
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

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-2 sm:space-y-3"
      >
        {PAINTER_FIELDS.filter(f => f.name !== 'pin' && f.name !== 'confirmPin').map((field) => (
          <AuthFormField key={field.name} field={field} form={authForm} />
        ))}
        
        <div className="flex gap-2 sm:gap-3">
          <div className="flex-1">
            <AuthFormField field={PAINTER_FIELDS.find(f => f.name === 'pin')} form={authForm} />
          </div>
          <div className="flex-1">
            <AuthFormField field={PAINTER_FIELDS.find(f => f.name === 'confirmPin')} form={authForm} />
          </div>
        </div>

        <p className="text-[0.7rem] sm:text-xs text-gray-500 leading-normal pt-1">
          By clicking Register, you agree to our{" "}
          <Link
            to="/terms"
            className="text-[#d82b2b] hover:underline font-medium"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="text-[#d82b2b] hover:underline font-medium"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* Register Button */}
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingText="Registering..."
          className="w-full h-11 sm:h-12 bg-[#d82b2b] hover:bg-[#b82222] text-white font-semibold text-sm sm:text-base rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Register
        </LoadingButton>
      </form>

      <AuthSwitchLink
        prompt="Already have an account?"
        linkText="Login here"
        to="/painter-login"
      />
    </AuthLayout>
  );
};

export default PainterSignup;
