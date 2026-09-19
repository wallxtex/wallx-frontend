import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const RedeemPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const code = searchParams.get("code");

    const [status, setStatus] = useState("verifying"); // 'verifying', 'ready', 'redeeming', 'success', 'error'
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");

    const isUrl = (str) => {
        try {
            new URL(str);
            return true;
        } catch (error) {
            console.debug("Invalid URL string:", error);
            return false;
        }
    };
    const isCodeUrl = code ? isUrl(code) : false;

    useEffect(() => {
        if (!code) {
            setStatus("error");
            setMessage("No redemption code provided.");
            return;
        }

        const verifyCode = async () => {
            try {
                console.log(`Verifying code format: ${code}`);

                // Initial quick verification
                setTimeout(() => {
                    if (code.startsWith("WALLX-")) {
                        setStatus("ready");
                        setAmount(90);
                        setMessage("Click the button below to securely redeem your cashback.");
                    } else {
                        setStatus("error");
                        setMessage(isCodeUrl ? "This QR code contains a web link." : "Invalid or expired QR code.");
                    }
                }, 1000);

            } catch (error) {
                console.error("Verification failed:", error);
                setStatus("error");
                setMessage("Connection failed. Try again.");
            }
        };

        verifyCode();
    }, [code, isCodeUrl]);

    const handleRedeem = () => {
        setStatus("redeeming");

        // Simulate backend verification / razorpay initialization
        setTimeout(() => {
            setStatus("success");
            setMessage("Cashback successfully redeemed to your account!");
        }, 2000);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#121212] to-[#1e1e1e] text-white p-5 font-sans">
            <div className="bg-[#2a2a2a]/80 backdrop-blur-md rounded-2xl p-8 max-w-[350px] w-full text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/5">

                {(status === "verifying" || status === "redeeming") && (
                    <div>
                        <div className={`w-12 h-12 border-4 border-white/10 ${status === 'redeeming' ? 'border-t-blue-500' : 'border-t-green-500'} rounded-full animate-spin mx-auto mb-5`}></div>
                        <h2 className="font-semibold text-xl mb-2">{status === 'redeeming' ? 'Processing...' : 'Verifying Code'}</h2>
                        <p className="text-[#a0a0a0] text-sm leading-relaxed mb-5">
                            {status === 'redeeming' ? 'Connecting to payment gateway...' : 'Please wait while we securely verify your QR code...'}
                        </p>
                        <div className="bg-black/30 px-3 py-2 rounded-lg font-mono text-sm text-gray-400 inline-block mt-2 break-all w-full box-border">{code}</div>
                    </div>
                )}

                {status === "ready" && (
                    <div>
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-5 shadow-[0_4px_15px_rgba(76,175,80,0.4)]">✓</div>
                        <h2 className="font-semibold text-xl mb-2">Code Verified!</h2>
                        <p className="text-[#a0a0a0] text-sm leading-relaxed mb-5">{message}</p>
                        <div className="flex items-start justify-center my-5">
                            <span className="text-2xl mt-1 mr-1 text-green-500">₹</span>
                            <span className="text-6xl font-extrabold text-white leading-none">{amount}</span>
                        </div>
                        <p className="bg-black/30 px-3 py-2 rounded-lg font-mono text-sm text-gray-400 inline-block mt-2 break-all w-full box-border">Ref: {code}</p>
                        <button
                            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none py-3 px-6 rounded-full text-base font-semibold cursor-pointer w-full mt-5 transition-transform active:scale-95 shadow-[0_4px_15px_rgba(33,150,243,0.3)]"
                            onClick={handleRedeem}>
                            Redeem Now
                        </button>
                    </div>
                )}

                {status === "success" && (
                    <div>
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-5 shadow-[0_4px_15px_rgba(76,175,80,0.4)]">🎉</div>
                        <h2 className="font-semibold text-xl mb-2">Redemption Successful!</h2>
                        <p className="text-green-500 text-sm leading-relaxed mb-5">{message}</p>
                        <div className="flex items-start justify-center my-5">
                            <span className="text-2xl mt-1 mr-1 text-green-500">₹</span>
                            <span className="text-6xl font-extrabold text-white leading-none">{amount}</span>
                        </div>
                        <button
                            className="bg-gradient-to-br from-[#333] to-[#444] text-white border-none py-3 px-6 rounded-full text-base font-semibold cursor-pointer w-full mt-5 transition-transform active:scale-95 shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
                            onClick={() => navigate("/painter/scan")}>
                            Scan Another
                        </button>
                    </div>
                )}

                {status === "error" && (
                    <div>
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-5 shadow-[0_4px_15px_rgba(244,67,54,0.4)]">✗</div>
                        <h2 className="font-semibold text-xl mb-2">{isCodeUrl ? "Not a Wallx Code" : "Redemption Failed"}</h2>
                        <p className="text-[#a0a0a0] text-sm leading-relaxed mb-5">{message}</p>
                        {code && (
                            <div className="bg-black/30 px-3 py-2 rounded-lg font-mono text-sm text-gray-400 inline-block mt-2 break-all w-full box-border">
                                Scanned:<br />
                                {isCodeUrl ? (
                                    <a href={code} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 transition-colors">
                                        {code}
                                    </a>
                                ) : (
                                    <span>{code}</span>
                                )}
                            </div>
                        )}
                        <button
                            className="bg-gradient-to-br from-red-500 to-red-600 text-white border-none py-3 px-6 rounded-full text-base font-semibold cursor-pointer w-full mt-5 transition-transform active:scale-95 shadow-[0_4px_15px_rgba(244,67,54,0.3)]"
                            onClick={() => navigate("/painter/scan")}>
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RedeemPage;
