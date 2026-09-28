import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, User, Lock } from "lucide-react";
import { adminLoginHandler } from "../../../services/global-auth/admin";
import { useAuth } from "../../../auth/AuthContext";
import adminVideo from "../../../assets/admin-video.mp4";
import LoadingButton from "../../../components/shared/LoadingButton";
import useAsyncAction from "../../../hooks/useAsyncAction";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; //slow down 
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { run: handleLogin, loading: isLoading } = useAsyncAction(async (credentials) => {
    const response = await adminLoginHandler(credentials);
    return response;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const response = await handleLogin({
        email: formData.email,
        password: formData.password,
      });

      // If we get here, login was successful
      const { accessToken } = response.data.data || response.data;

      if (accessToken) {
        login(accessToken);
        navigate("/admin/dashboard");
      } else {
        console.error("No accessToken found in response:", response);
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      // Error toast is shown by the service
      console.error("Admin login error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-4 relative overflow-hidden">
      {/* Background Video (Desktop Only) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={adminVideo} type="video/mp4" />
      </video>

      {/* Overlay for better readability (Desktop Only) */}
      <div className="hidden md:block absolute inset-0 bg-black/20 z-0 backdrop-blur-[2px]"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Login Card with Glassmorphism */}
        <div className="bg-white/80 md:bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d82b2b] rounded-full mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-500 text-sm mt-2">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Dev Info - Remove in production */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-600 font-mono">
              📧 admin@wallx.com | 🔑 Admin@123
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d82b2b] focus:border-[#d82b2b] outline-none transition-all placeholder:text-gray-500"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d82b2b] focus:border-[#d82b2b] outline-none transition-all placeholder:text-gray-500"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <LoadingButton
              type="submit"
              loading={isLoading}
              loadingText="Signing in..."
              className="w-full py-3 bg-[#d82b2b] hover:bg-[#b82222] text-white font-semibold rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn className="w-5 h-5" />
              <span>Sign In</span>
            </LoadingButton>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 font-medium text-sm mt-6 relative z-10">
          © 2024 WallX Admin Panel
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
