import { useState, useEffect, useRef } from "react";
import AuthLayout from "./AuthLayout";
import LoadingButton from "../../../components/shared/LoadingButton";
import useAsyncAction from "../../../hooks/useAsyncAction";

const AuthVerification = ({
  title = "Enter verification code",
  mobile = "",
  bannerImg,
  bannerAlt = "Verification Banner",
  bannerPosition = "object-center",
  backPath = "/",
  onVerify,
  role = "Painter",
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  
  // 3 minutes (180 seconds) countdown timer
  const [timeLeft, setTimeLeft] = useState(180);
  const canResend = timeLeft <= 0;

  // Setup async action for OTP verification
  const { run: verifyOtp, loading: isVerifying } = useAsyncAction(async (fullOtp) => {
    if (onVerify) {
      await onVerify(fullOtp);
    }
  });

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 4) newOtp[index] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 3)]?.focus();
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setTimeLeft(180);
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
    console.log(`Resending ${role} OTP to:`, mobile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length !== 4) {
      alert("Please enter a valid 4-digit OTP");
      return;
    }
    
    try {
      await verifyOtp(fullOtp);
    } catch (error) {
      console.error("OTP verification failed:", error);
      // Error is handled by global toast interceptor
    }
  };

  return (
    <AuthLayout
      bannerImg={bannerImg}
      bannerAlt={bannerAlt}
      bannerPosition={bannerPosition}
      maxWidth="max-w-[440px]"
      backPath={backPath}
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          We have sent an OTP on your mobile number{" "}
          <span className="font-semibold text-gray-800">
            {mobile ? `+91 ${mobile}` : "+91 ••••••••••"}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-center gap-3 sm:gap-4 my-2">
          {otp.map((digit, index) => (
            <input
              key={`otp-slot-${index}`}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-14 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 focus:bg-white focus:border-[#d82b2b] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-200 shadow-xs"
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-sm py-1">
          <span className="text-gray-500 font-medium">
            {canResend ? (
              <span className="text-red-500">OTP Expired</span>
            ) : (
              <>
                Expires in:{" "}
                <span className="text-gray-900 font-bold tracking-wider">
                  {formatTime(timeLeft)}
                </span>
              </>
            )}
          </span>

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={!canResend}
            className={`font-semibold transition-all duration-200 cursor-pointer ${
              canResend
                ? "text-[#d82b2b] hover:text-[#b82222] underline underline-offset-4"
                : "text-gray-400 cursor-not-allowed opacity-60"
            }`}
          >
            Resend OTP
          </button>
        </div>

        <LoadingButton
          type="submit"
          loading={isVerifying}
          loadingText="Verifying..."
          className="w-full h-12 bg-[#d82b2b] hover:bg-[#b82222] text-white font-semibold text-[15px] rounded-xl shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify & Continue
        </LoadingButton>
      </form>

      <div className="mt-8 text-center text-sm text-gray-500">
        Need help?{" "}
        <a
          href="tel:18001239255"
          className="font-semibold text-gray-800 hover:text-[#d82b2b] transition-colors"
        >
          Contact Support
        </a>
      </div>

      <div className="text-center text-xs text-gray-400 mt-6 py-2">
        Secured by WallX Mitra Authentication
      </div>
    </AuthLayout>
  );
};

export default AuthVerification;
