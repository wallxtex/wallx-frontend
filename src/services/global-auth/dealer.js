import API from "../../utils/apis/api";
import ApiResponseMessage from "../../utils/apis/apiresponseMessage";
import { dealerApis } from "../../utils/apis/endpoints/apiEndPoints";
import PrivateApi from "../../utils/apis/privateApi";

// Signup Initiate - Use public API (no auth required)
async function dealerSignupHandler(signupData) {
  try {
    const response = await API.post(dealerApis.signup, signupData);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

// Verify OTP - Use public API (no auth required)
async function dealerVerifyOtpHandler(otpData) {
  try {
    const response = await API.post(dealerApis.verifyOtp, otpData);
    
    // Store refresh token if provided in response
    if (response.data?.data?.refreshToken) {
      console.log('[AUTH] Storing refresh token from dealer OTP verification response');
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
    }
    
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

// Login - Use public API (no auth required)
async function dealerLoginHandler(loginData) {
  try {
    const response = await API.post(dealerApis.login, loginData);
    
    // Store refresh token if provided in response
    if (response.data?.data?.refreshToken) {
      console.log('[AUTH] Storing refresh token from dealer login response');
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
    }
    
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

// Logout - Use private API (auth required)
async function dealerLogoutHandler() {
  try {
    const response = await PrivateApi.post(dealerApis.logout);
    
    // Clear refresh token on logout
    console.log('[AUTH] Clearing refresh token on dealer logout');
    localStorage.removeItem('refreshToken');
    
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    // Clear refresh token even if logout request fails
    localStorage.removeItem('refreshToken');
    return ApiResponseMessage.err(error);
  }
}

// Refresh Token - Use private API (auth required)
async function dealerRefreshTokenHandler() {
  try {
    const response = await PrivateApi.post(dealerApis.refreshToken);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

export {
  dealerSignupHandler,
  dealerVerifyOtpHandler,
  dealerLoginHandler,
  dealerLogoutHandler,
  dealerRefreshTokenHandler,
};