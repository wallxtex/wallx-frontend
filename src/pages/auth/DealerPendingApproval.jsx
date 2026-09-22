import { useLocation, useNavigate } from "react-router-dom";
import { Clock, Mail, Phone } from "lucide-react";
import logo from "../../assets/webp/wallx_final.webp";

const DealerPendingApproval = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get dealer info from navigation state (if available)
  const dealerInfo = location.state || {};

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="WallX Logo"
            className="h-12 w-auto mx-auto mb-4"
          />
        </div>

        {/* Main Card */}
        <div className="border border-gray-200 rounded-xl p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-amber-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Account Under Review
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you for registering with WallX! Your dealer account has been
            successfully created and is currently pending admin approval.
          </p>

          {/* Info Box */}
          <div className="border border-gray-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              What happens next?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>Our team will review your application within 24-48 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>You'll receive a notification once approved</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>After approval, you can log in and start using the platform</span>
              </li>
            </ul>
          </div>

          {/* Dealer Info (if available) */}
          {dealerInfo.dealerName && (
            <div className="border border-gray-200 rounded-lg p-4 mb-6 text-left">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Registration Details
              </h4>
              <div className="space-y-1.5 text-sm">
                <p className="text-gray-700">
                  <span className="font-medium">Name:</span> {dealerInfo.dealerName}
                </p>
                {dealerInfo.shopName && (
                  <p className="text-gray-700">
                    <span className="font-medium">Shop:</span> {dealerInfo.shopName}
                  </p>
                )}
                {dealerInfo.mobile && (
                  <p className="text-gray-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gray-500" />
                    {dealerInfo.mobile}
                  </p>
                )}
                {dealerInfo.email && (
                  <p className="text-gray-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    {dealerInfo.email}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/dealer-login")}
              className="w-full h-11 bg-[#d82b2b] hover:bg-[#b82222] text-white font-semibold text-sm rounded-lg transition-colors duration-200"
            >
              Go to Login Page
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full h-11 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-lg transition-colors duration-200"
            >
              Return to Home
            </button>
          </div>

          {/* Support Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Need help?{" "}
              <a
                href="tel:18001239255"
                className="text-[#d82b2b] hover:underline font-medium"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Note */}
        <p className="text-center text-xs text-gray-500 mt-6">
          You'll be notified via email and SMS once your account is approved
        </p>
      </div>
    </div>
  );
};

export default DealerPendingApproval;