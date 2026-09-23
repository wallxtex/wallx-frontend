import API from "../../utils/apis/api";
import ApiResponseMessage from "../../utils/apis/apiresponseMessage";
import { adminApis } from "../../utils/apis/endpoints/apiEndPoints";
import PrivateApi from "../../utils/apis/privateApi";

// Login - Use public API (no auth required)
async function adminLoginHandler(loginData) {
  try {
    const response = await API.post(adminApis.login, loginData);
    
    // Store refresh token if provided in response
    if (response.data?.data?.refreshToken) {
      console.log('[AUTH] Storing refresh token from admin login response');
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
    }
    
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

// Logout - Use private API (auth required)
async function adminLogoutHandler() {
  try {
    const response = await PrivateApi.post(adminApis.logout);
    
    // Clear refresh token on logout
    console.log('[AUTH] Clearing refresh token on admin logout');
    localStorage.removeItem('refreshToken');
    
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    // Clear refresh token even if logout request fails
    localStorage.removeItem('refreshToken');
    return ApiResponseMessage.err(error);
  }
}

// Refresh Token - Use private API (auth required)
async function adminRefreshTokenHandler() {
  try {
    const response = await PrivateApi.post(adminApis.refreshToken);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

export {
  adminLoginHandler,
  adminLogoutHandler,
  adminRefreshTokenHandler,
};








