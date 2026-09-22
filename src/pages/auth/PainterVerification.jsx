import { useNavigate } from "react-router-dom";
import signupImg from "../../assets/webp/painter.webp";
import { createVerificationPage } from "./utils/createVerificationPage";
import { painterVerifyOtpHandler } from "../../services/global-auth/painter";
import { useAuth } from "../../auth/AuthContext";
import toast from "react-hot-toast";

const usePainterVerification = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleVerify = async (otp, state) => {
    try {
      const response = await painterVerifyOtpHandler({
        mobile: state.mobile,
        otp: otp,
      });

      console.log("Verification response:", response); // Debug log

      if (response.success && response.data) {
        // Backend wraps data in: { statusCode, data: { accessToken, painter }, message, success }
        const { accessToken } = response.data.data || response.data;

        if (accessToken) {
          // Store token in AuthContext and localStorage
          login(accessToken);
          toast.success(response.data.message || response.message || "Account created successfully!");
          navigate("/painter/dashboard");
        } else {
          console.error("No accessToken found in response:", response);
          toast.error("Verification failed - no token received");
        }
      } else {
        toast.error(response.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Failed to verify OTP. Please try again.");
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
