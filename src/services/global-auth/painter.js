import ApiResponseMessage from "../../utils/apis/apiresponseMessage";
import { painterApis } from "../../utils/apis/endpoints/apiEndPoints";
import API from "../../utils/apis/api";
import PrivateApi from "../../utils/apis/privateApi";

// Signup Initiate - Use public API (no auth required)
async function painterSignupHandler(signupData) {
  try {
    const response = await API.post(painterApis.signup, signupData);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

// Verify OTP - Use public API (no auth required)
async function painterVerifyOtpHandler(otpData) {
  try {
    const response = await API.post(painterApis.verifyOtp, otpData);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

// Login - Use public API (no auth required)
async function painterLoginHandler(loginData) {
  try {
    const response = await API.post(painterApis.login, loginData);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

// Logout - Use private API (auth required)
async function painterLogoutHandler() {
  try {
    const response = await PrivateApi.post(painterApis.logout);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

//forgot pin
// async function painterForgotPinHandler(){
//   try{
//     const response = await API.post()

//   }catch(er){
//     return ApiResponseMessage.err(er);
//   }
// }

// Refresh Token - Use private API (auth required)
async function painterRefreshTokenHandler() {
  try {
    const response = await PrivateApi.post(painterApis.refreshToken);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

export {
  painterSignupHandler,
  painterVerifyOtpHandler,
  painterLoginHandler,
  painterLogoutHandler,
  // painterForgotPinHandler,
  painterRefreshTokenHandler,
};