import { useNavigate } from "react-router-dom";
import dealerBannerImg from "../../assets/webp/dealer.webp";
import { createVerificationPage } from "./utils/createVerificationPage";
import { dealerVerifyOtpHandler } from "../../services/global-auth/dealer";

const useDealerVerification = () => {
  const navigate = useNavigate();

  const handleVerify = async (otp, state) => {
    try {
      const response = await dealerVerifyOtpHandler({
        mobile: state.mobile,
        otp: otp,
      });

      if (response.success) {
        navigate("/dealer-login");
      }
    } catch (error) {
      console.error("Dealer OTP verification error:", error);
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
