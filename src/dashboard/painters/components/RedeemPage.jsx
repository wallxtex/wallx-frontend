import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import PrivateApi from "../../../utils/apis/privateApi";
import ScannerPlaceholder from "./ScannerPlaceholder";

const rewardsBgStyle = {
    backgroundColor: '#f3f4f6',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M25 10l3 9h10l-8 6 3 9-8-6-8 6 3-9-8-6h10z' /%3E%3Ccircle cx='75' cy='40' r='8' /%3E%3Ccircle cx='75' cy='40' r='5' fill-opacity='0.02' /%3E%3Cpath d='M15 60h10v5h-10zM17 65h6v10h-6zM12 75h16v3h-16z' /%3E%3Cpath d='M70 80l5-10 5 10-5 10z' /%3E%3C/g%3E%3C/svg%3E")`
};

const RedeemPage = () => {
    const { code: paramCode } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const code = paramCode || searchParams.get("code");

    const [status, setStatus] = useState("ready"); // 'ready', 'redeeming', 'success', 'error'
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");
    const [errorCode, setErrorCode] = useState(null);

    const isUrl = (str) => {
        try {
            const parsed = new URL(str);
            return !!parsed;
        } catch (error) {
            console.debug("Invalid URL string:", error);
            return false;
        }
    };
    const isCodeUrl = code ? isUrl(code) : false;

    useEffect(() => {
        if (!code) {
            return;
        }

        if (code.length < 10) {
            setStatus("error");
            setMessage("Invalid redemption code format.");
            return;
        }

        // Just set it to ready immediately
        setStatus("ready");
        setMessage("Click the button below to securely redeem your cashback.");
    }, [code]);

    const handleRedeem = async () => {
        setStatus("redeeming");

        try {
            const response = await PrivateApi.post(`/painters/redeem/${code}`);
            setStatus("success");
            
            // Set actual amount if backend returns it
            if (response.data?.data?.amount) {
                setAmount(response.data.data.amount);
            }
            
            setMessage("Cashback successfully redeemed to your account!");
        } catch (error) {
            console.error("Redemption failed:", error);
            const errCode = error.response?.status || error.response?.data?.statusCode || 500;
            const errMsg = error.response?.data?.message || "Connection failed. Try again.";
            
            setStatus("error");
            setErrorCode(errCode);
            setMessage(errMsg);
        }
    };

    if (!code) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-64px)] sm:min-h-screen text-gray-900 p-5 font-sans" style={rewardsBgStyle}>
                <ScannerPlaceholder />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] sm:min-h-screen text-gray-900 p-5 font-sans" style={rewardsBgStyle}>
            <div className="bg-white rounded-2xl p-8 max-w-[350px] w-full text-center shadow-lg border border-gray-200">

                {(status === "verifying" || status === "redeeming") && (
                    <div>
                        <div className={`w-12 h-12 border-4 border-gray-100 ${status === 'redeeming' ? 'border-t-blue-500' : 'border-t-green-500'} rounded-full animate-spin mx-auto mb-5`}></div>
                        <h2 className="font-semibold text-xl mb-2">{status === 'redeeming' ? 'Processing...' : 'Verifying Code'}</h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-5">
                            {status === 'redeeming' ? 'Connecting to payment gateway...' : 'Please wait while we securely verify your QR code...'}
                        </p>
                        <div className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg font-mono text-sm text-gray-600 inline-block mt-2 break-all w-full box-border">{code}</div>
                    </div>
                )}

                {status === "ready" && (
                    <div>
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-5 shadow-sm">💰</div>
                        <h2 className="font-semibold text-xl mb-2">Ready to Redeem!</h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-5">{message}</p>
                        
                        <p className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg font-mono text-sm text-gray-600 inline-block mt-2 break-all w-full box-border">Ref: {code}</p>
                        <button type="button"
                            className="bg-blue-600 hover:bg-blue-700 text-white border-none py-3 px-6 rounded-full text-base font-semibold cursor-pointer w-full mt-5 transition-transform active:scale-95 shadow-md shadow-blue-600/20"
                            onClick={handleRedeem}>
                            Redeem Now
                        </button>
                    </div>
                )}

                {status === "success" && (
                    <div>
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-5 shadow-sm">🎉</div>
                        <h2 className="font-semibold text-xl mb-2">Redemption Successful!</h2>
                        <p className="text-green-600 font-medium text-sm leading-relaxed mb-5">{message}</p>
                        <div className="flex items-start justify-center my-5 text-gray-900">
                            <span className="text-2xl mt-1 mr-1 text-gray-500">₹</span>
                            <span className="text-6xl font-extrabold leading-none">{amount}</span>
                        </div>
                        <button type="button"
                            className="bg-gray-800 hover:bg-gray-900 text-white border-none py-3 px-6 rounded-full text-base font-semibold cursor-pointer w-full mt-5 transition-transform active:scale-95 shadow-md"
                            onClick={() => navigate("/painter/scan")}>
                            Scan Another
                        </button>
                    </div>
                )}

                {status === "error" && (
                    <div>
                        {errorCode === 502 || errorCode === 504 || errorCode === 500 ? (
                            <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-5 shadow-sm">⚠️</div>
                        ) : errorCode === 409 ? (
                            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-5 shadow-sm">ℹ️</div>
                        ) : (
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-5 shadow-sm">✗</div>
                        )}
                        
                        <h2 className="font-semibold text-xl mb-2">
                            {errorCode === 502 ? "Payment Failed" :
                             errorCode === 504 || errorCode === 500 ? "Verification Needed" :
                             errorCode === 409 ? "Already Redeemed" :
                             errorCode === 404 ? "Invalid Code" :
                             errorCode === 400 ? "Expired Code" :
                             isCodeUrl ? "Not a Wallx Code" :
                             "Redemption Failed"}
                        </h2>
                        
                        <p className={`${errorCode === 502 || errorCode === 504 || errorCode === 500 ? 'text-yellow-600' : errorCode === 409 ? 'text-orange-600' : 'text-gray-500'} text-sm leading-relaxed mb-5`}>
                            {message}
                        </p>
                        
                        {code && (
                            <div className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg font-mono text-sm text-gray-600 inline-block mt-2 break-all w-full box-border">
                                Ref: {isCodeUrl ? (
                                    <a href={code} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-500 transition-colors">
                                        {code}
                                    </a>
                                ) : (
                                    <span>{code}</span>
                                )}
                            </div>
                        )}
                        
                        <button type="button"
                            className={`text-white border-none py-3 px-6 rounded-full text-base font-semibold cursor-pointer w-full mt-5 transition-transform active:scale-95 shadow-md ${
                                errorCode === 502 || errorCode === 504 || errorCode === 500 ? 'bg-yellow-600 hover:bg-yellow-700 shadow-yellow-600/20' :
                                errorCode === 409 ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/20' :
                                'bg-red-600 hover:bg-red-700 shadow-red-600/20'
                            }`}
                            onClick={() => navigate("/painter/scan")}>
                            Scan Another
                        </button>
                        
                        {errorCode === 502 && (
                             <button type="button"
                                className="bg-transparent border border-yellow-300 text-yellow-600 py-3 px-6 rounded-full text-base font-semibold cursor-pointer w-full mt-3 transition-colors hover:bg-yellow-50"
                                onClick={handleRedeem}>
                                Try Again Now
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RedeemPage;
