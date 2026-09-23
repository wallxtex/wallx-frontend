import { useNavigate } from "react-router-dom";
import signupImg from "../../assets/webp/painter.webp";
import { createVerificationPage } from "./utils/createVerificationPage";
import { painterVerifyOtpHandler } from "../../services/global-auth/painter";
import { useAuth } from "../../auth/AuthContext";

const usePainterVerification = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleVerify = async (otp, state) => {
    try {
      const response = await painterVerifyOtpHandler({
        mobile: state.mobile,
        otp: otp,
      });

      if (response.success && response.data) {
        const { accessToken } = response.data.data || response.data;

        if (accessToken) {
          login(accessToken);
          navigate("/painter/dashboard");
          // Toast is automatically shown by API interceptor ✅
        } else {
          console.error("No accessToken found in response:", response);
        }
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      // Error toast is automatically shown by API interceptor ✅
    }
  };

  return handleVerify;
};

const PainterVerification = createVerificationPage({
  role: "Painter",
  title: "Enter verification code",
  bannerImg: signupImg,
  bannerAlt: "WallX Painter Verification Banner",
  bannerPosition: "object-[65%_center]",
  backPath: "/painter-signup",
  defaultMobile: "8384856193",
  useVerificationHook: usePainterVerification,
});

export default PainterVerification;
