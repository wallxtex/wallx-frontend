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
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

// Login - Use public API (no auth required)
async function dealerLoginHandler(loginData) {
  try {
    const response = await API.post(dealerApis.login, loginData);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

// Logout - Use private API (auth required)
async function dealerLogoutHandler() {
  try {
    const response = await PrivateApi.post(dealerApis.logout);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
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