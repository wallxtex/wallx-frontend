import { useNavigate } from "react-router-dom";
import dealerBannerImg from "../../assets/webp/dealer.webp";
import { createVerificationPage } from "./utils/createVerificationPage";
import { dealerVerifyOtpHandler } from "../../services/global-auth/dealer";
import toast from "react-hot-toast";

const useDealerVerification = () => {
  const navigate = useNavigate();

  const handleVerify = async (otp, state) => {
    try {
      const response = await dealerVerifyOtpHandler({
        mobile: state.mobile,
        otp: otp,
      });

      console.log("Dealer verification response:", response);

      if (response.success) {
        toast.success(
          response.data.message ||
            response.message ||
            "Account created successfully! Awaiting admin approval.",
        );
        // Dealer doesn't get token immediately - needs admin approval
        // Redirect to login page
        navigate("/dealer-login");
      } else {
        toast.error(response.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Dealer OTP verification error:", error);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  return handleVerify;
};

const DealerVerification = createVerificationPage({
  role: "Dealer",
  title: "Dealer Verification",
  bannerImg: dealerBannerImg,
  bannerAlt: "WallX Dealer Verification Banner",
  bannerPosition: "object-center",
  backPath: "/dealer-signup",
  defaultMobile: "9876543210",
  useVerificationHook: useDealerVerification,
});

export default DealerVerification;
