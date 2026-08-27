import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import dealerBannerImg from '../../assets/webp/dealer.webp';
import { AuthBanner, AuthBackButton } from './components';

const DealerVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const mobile = location.state?.mobile || '9876543210';
    const email = location.state?.email || '';
    const dealerName = location.state?.dealerName || '';

    // 4-digit OTP state
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);

    // 3 minutes (180 seconds) countdown timer
    const [timeLeft, setTimeLeft] = useState(180);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Format seconds to MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleOtpChange = (index, value) => {
        // Only allow single digit
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Navigate to previous input on backspace if current is empty
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 4);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split('').forEach((char, index) => {
            if (index < 4) newOtp[index] = char;
        });
        setOtp(newOtp);
        inputRefs.current[Math.min(pastedData.length, 3)]?.focus();
    };

    const handleResendOtp = () => {
        if (!canResend) return;
        setTimeLeft(180);
        setCanResend(false);
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus();
        console.log('Resending Dealer OTP to:', mobile);
    };

    const handleVerify = (e) => {
        e.preventDefault();
        const fullOtp = otp.join('');
        if (fullOtp.length !== 4) {
            alert('Please enter a valid 4-digit OTP');
            return;
        }
        console.log('Verifying Dealer OTP:', fullOtp, { mobile, email, dealerName });
    };

    return (
        <div className="h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] lg:h-screen lg:max-h-screen overflow-hidden bg-white flex flex-col lg:flex-row">
            {/* Desktop Left Banner: dealer.webp centered and covering full left panel */}
            <AuthBanner
                image={dealerBannerImg}
                alt="WallX Dealer Verification Banner"
                objectPosition="object-center"
            />

            {/* Right / Main Content Area */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center relative px-6 sm:px-12 xl:px-24 py-6 sm:py-10 lg:py-12 overflow-y-auto">
                {/* Top Back Arrow Button */}
                <AuthBackButton
                    to="/dealer-signup"
                    className="mb-4 sm:mb-6 lg:mb-0 lg:absolute lg:top-6 lg:left-8 xl:top-10 xl:left-20 z-10"
                />

                <div className="w-full max-w-[460px] xl:max-w-[480px] mx-auto pt-4 sm:pt-0 text-center">
                    {/* Heading & Subtitles with Generous Gap */}
                    <div className="mb-6 sm:mb-8 lg:mb-10">
                        <h1 className="text-2xl sm:text-3xl xl:text-[34px] font-bold text-gray-900 tracking-tight mb-2 sm:mb-2.5">
                            Verify Dealer Account
                        </h1>
                        <p className="text-[#d82b2b] font-semibold text-[13px] sm:text-[15px] lg:text-[16px] mb-1.5">
                            Enter the 4-digit verification code
                        </p>
                        <p className="text-gray-500 text-xs sm:text-sm lg:text-[15px] leading-tight sm:leading-relaxed">
                            We've sent an OTP to <span className="text-gray-900 font-semibold">+91 {mobile}</span>
                        </p>
                    </div>

                    {/* OTP Form with Generous Spacing */}
                    <form onSubmit={handleVerify} className="space-y-6 sm:space-y-8 lg:space-y-9">
                        <div className="flex justify-center gap-3.5 sm:gap-4.5 lg:gap-5 w-full" onPaste={handlePaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="tel"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className={`w-[52px] sm:w-[64px] lg:w-[68px] h-[56px] sm:h-[68px] lg:h-[72px] border-2 rounded-xl bg-gray-50/50 text-center text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 focus:bg-white focus:outline-none transition-all ${
                                        digit ? 'border-gray-800 bg-white' : 'border-gray-300'
                                    } focus:border-[#d82b2b] focus:ring-2 focus:ring-[#d82b2b]/10`}
                                    required
                                />
                            ))}
                        </div>

                        {/* Verify Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full h-[48px] sm:h-[52px] lg:h-[54px] bg-[#d82b2b] hover:bg-[#b92525] active:scale-[0.99] text-white font-semibold text-[15px] sm:text-base rounded-lg transition-all shadow-md shadow-[#d82b2b]/20 flex items-center justify-center cursor-pointer"
                            >
                                Verify & Activate Account
                            </button>
                        </div>
                    </form>

                    {/* Resend OTP Row */}
                    <div className="mt-6 sm:mt-8 lg:mt-10 flex items-center justify-between text-xs sm:text-sm lg:text-[15px]">
                        <span className="text-gray-500">Didn't receive the code?</span>
                        {canResend ? (
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                className="text-[#d82b2b] font-semibold hover:underline cursor-pointer"
                            >
                                Resend OTP
                            </button>
                        ) : (
                            <span className="text-gray-800 font-medium">
                                Resend in <span className="text-[#d82b2b]">{formatTime(timeLeft)}</span>
                            </span>
                        )}
                    </div>

                    {/* Back to Signup link */}
                    <div className="mt-4 sm:mt-6 lg:mt-8 text-center text-xs sm:text-sm text-gray-500">
                        Wrong mobile number?{' '}
                        <Link to="/dealer-signup" className="text-[#d82b2b] font-semibold hover:underline">
                            Change Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealerVerification;
