import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthBanner from './AuthBanner';
import AuthBackButton from './AuthBackButton';

const AuthVerification = ({
    title = 'Enter verification code',
    mobile = '',
    bannerImg,
    bannerAlt = 'Verification Banner',
    bannerPosition = 'object-center',
    backPath = '/',
    onVerify,
    role = 'Painter',
}) => {
    const navigate = useNavigate();
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
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
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
        console.log(`Resending ${role} OTP to:`, mobile);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullOtp = otp.join('');
        if (fullOtp.length !== 4) {
            alert('Please enter a valid 4-digit OTP');
            return;
        }
        if (onVerify) {
            onVerify(fullOtp);
        } else {
            console.log(`Verified ${role} OTP:`, fullOtp);
        }
    };

    return (
        <div className="h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] lg:h-screen lg:max-h-screen overflow-hidden bg-white flex flex-col lg:flex-row">
            <AuthBanner
                image={bannerImg}
                alt={bannerAlt}
                objectPosition={bannerPosition}
            />

            <div className="w-full lg:w-1/2 h-full flex flex-col justify-between relative px-6 sm:px-12 xl:px-24 py-6 sm:py-10 lg:py-12 overflow-y-auto">
                <AuthBackButton onClick={() => navigate(backPath)} />

                <div className="w-full max-w-[440px] mx-auto my-auto flex flex-col justify-center">
                    <div className="text-left mb-6">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                            {title}
                        </h1>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                            We have sent an OTP on your mobile number{' '}
                            <span className="font-semibold text-gray-800">
                                {mobile ? `+91 ${mobile}` : '+91 ••••••••••'}
                            </span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-between items-center gap-3 sm:gap-4 my-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
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
                                    <>Expires in: <span className="text-gray-900 font-bold tracking-wider">{formatTime(timeLeft)}</span></>
                                )}
                            </span>

                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={!canResend}
                                className={`font-semibold transition-all duration-200 cursor-pointer ${
                                    canResend
                                        ? 'text-[#d82b2b] hover:text-[#b82222] underline underline-offset-4'
                                        : 'text-gray-400 cursor-not-allowed opacity-60'
                                }`}
                            >
                                Resend OTP
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-12 bg-[#d82b2b] hover:bg-[#b82222] text-white font-semibold text-[15px] rounded-xl shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center"
                        >
                            Verify & Continue
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Need help?{' '}
                        <a href="tel:18001239255" className="font-semibold text-gray-800 hover:text-[#d82b2b] transition-colors">
                            Contact Support
                        </a>
                    </div>
                </div>

                <div className="text-center text-xs text-gray-400 mt-auto py-2">
                    Secured by WallX Mitra Authentication
                </div>
            </div>
        </div>
    );
};

export default AuthVerification;
