import { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import {
  forgotPin as dealerForgotPin,
  resetPin as dealerResetPin,
} from "../../../services/global-auth/dealer";
import {
  forgotPin as painterForgotPin,
  resetPin as painterResetPin,
} from "../../../services/global-auth/painter";
import LoadingButton from "../../../components/shared/LoadingButton";
import useAsyncAction from "../../../hooks/useAsyncAction";

const ForgotPinModal = ({
  isOpen,
  onClose,
  defaultMobile = "",
  userType = "dealer",
}) => {
  const [step, setStep] = useState(1); // 1: Mobile, 2: OTP + New PIN
  const [mobile, setMobile] = useState(defaultMobile);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const otpRefs = useRef([]);

  // Setup async actions for Send OTP
  const { run: sendOtp, loading: isSendingOtp } = useAsyncAction(async (mobile) => {
    const forgotPinFn = userType === "painter" ? painterForgotPin : dealerForgotPin;
    const response = await forgotPinFn({ mobile });
    return response;
  });

  // Setup async actions for Reset PIN
  const { run: resetPinAction, loading: isResettingPin } = useAsyncAction(async (data) => {
    const resetPinFn = userType === "painter" ? painterResetPin : dealerResetPin;
    const response = await resetPinFn(data);
    return response;
  });

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setMobile(defaultMobile);
      setOtp(["", "", "", ""]);
      setNewPin("");
      setConfirmPin("");
      setError("");
    }
  }, [isOpen, defaultMobile]);

  if (!isOpen) return null;

  const handleSendOtp = async () => {
    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");

    try {
      const response = await sendOtp(mobile);

      // If we get here, it was successful
      setStep(2);
      setError("");
    } catch (error) {
      // Error is handled by global toast interceptor
      console.error("Forgot PIN error:", error);
    }
  };

  const handleResetPin = async () => {
    const fullOtp = otp.join("");

    // Validate OTP is entered
    if (fullOtp.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    // Validate new PIN
    if (!newPin || newPin.length !== 4) {
      setError("PIN must be exactly 4 digits");
      return;
    }

    // Validate PIN match
    if (newPin !== confirmPin) {
      setError("PINs do not match");
      return;
    }

    setError("");

    try {
      const response = await resetPinAction({
        mobile,
        otp: fullOtp,
        newPin,
      });

      // If we get here, it was successful
      onClose();
    } catch (error) {
      // Error is handled by global toast interceptor
      console.error("Reset PIN error:", error);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) otpRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
        >
          <IoClose size={20} />
        </button>

        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
            Forgot PIN
          </h2>
          <p className="text-sm text-gray-500">
            {step === 1 && "Enter your registered mobile number."}
            {step === 2 &&
              `Enter the OTP sent to +91 ${mobile} and create a new PIN.`}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                Mobile Number
              </label>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-500 sm:text-sm">
                  +91
                </span>
                <input
                  type="text"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (/^\d*$/.test(v)) setMobile(v);
                  }}
                  className="flex-1 min-w-0 block w-full h-11 px-3 border border-gray-300 rounded-r-lg focus:ring-1 focus:ring-[#d82b2b] focus:border-[#d82b2b] sm:text-sm outline-none transition-all"
                  placeholder="10-digit mobile number"
                />
              </div>
            </div>
            <LoadingButton
              onClick={handleSendOtp}
              loading={isSendingOtp}
              loadingText="Sending..."
              className="w-full h-11 bg-[#d82b2b] hover:bg-[#b82222] text-white font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Send OTP
            </LoadingButton>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            {/* OTP Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Enter OTP
              </label>
              <div className="flex justify-between items-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#d82b2b] focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all"
                  />
                ))}
              </div>
            </div>

            {/* New PIN Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                New 4-Digit PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={newPin}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^\d*$/.test(v)) setNewPin(v);
                }}
                className="w-full h-11 border border-gray-300 rounded-lg bg-gray-50 px-4 text-sm focus:bg-white focus:border-[#d82b2b] focus:ring-1 focus:ring-[#d82b2b] outline-none transition-all"
                placeholder="Enter 4 digits"
              />
            </div>

            {/* Confirm PIN Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                Confirm 4-Digit PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={confirmPin}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^\d*$/.test(v)) setConfirmPin(v);
                }}
                className="w-full h-11 border border-gray-300 rounded-lg bg-gray-50 px-4 text-sm focus:bg-white focus:border-[#d82b2b] focus:ring-1 focus:ring-[#d82b2b] outline-none transition-all"
                placeholder="Re-enter 4 digits"
              />
            </div>

            {/* Submit Button */}
            <LoadingButton
              onClick={handleResetPin}
              loading={isResettingPin}
              loadingText="Saving..."
              className="w-full h-11 mt-2 bg-[#d82b2b] hover:bg-[#b82222] text-white font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Reset PIN
            </LoadingButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPinModal;
