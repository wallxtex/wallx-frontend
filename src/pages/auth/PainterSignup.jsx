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

const PAINTER_CONSTRAINTS = {
  name: { regex: /^[A-Za-z\s]*$/, max: 40 },
  mobile: { regex: /^\d*$/, max: 10 },
  address: { max: 500 },
};

const PAINTER_VALIDATORS = {
  name: (v) => validateName(v, "Name", 40),
  address: (v) => validateRequiredText(v, "Address", 2, 500),
  mobile: validateMobile,
};

const INITIAL_PAINTER_STATE = {
  name: "",
  address: "",
  mobile: "",
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
];

const PainterSignup = () => {
  const navigate = useNavigate();
  const authForm = useAuthForm(
    INITIAL_PAINTER_STATE,
    PAINTER_VALIDATORS,
    PAINTER_CONSTRAINTS,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!authForm.validateAll()) return;

    console.log("Painter form submitted:", authForm.formData);
     navigate("/painter-dashboard");
    // navigate("/painter-verification", {
    //   state: { mobile: authForm.formData.mobile },
    // });
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
        className="space-y-3.5 sm:space-y-5 lg:space-y-6"
      >
        {PAINTER_FIELDS.map((field) => (
          <AuthFormField key={field.name} field={field} form={authForm} />
        ))}

        <p className="text-xs text-gray-500 leading-normal pt-1">
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

        {/* testing */}
        <button
          type="submit"
          className="w-full h-[46px] sm:h-[50px] lg:h-[54px] bg-[#d82b2b] hover:bg-[#b82222] text-white font-semibold text-[15px] sm:text-[16px] rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center tracking-wide"
        >
          Register
        </button>
      </form>

      <AuthSwitchLink
        prompt="Already have an account?"
        linkText="Login here"
        to="/login"
      />
    </AuthLayout>
  );
};

export default PainterSignup;
