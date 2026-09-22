import API from "../../utils/apis/api";
import ApiResponseMessage from "../../utils/apis/apiresponseMessage";
import { adminApis } from "../../utils/apis/endpoints/apiEndPoints";
import PrivateApi from "../../utils/apis/privateApi";

// Login - Use public API (no auth required)
async function adminLoginHandler(loginData) {
  try {
    const response = await API.post(adminApis.login, loginData);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

// Logout - Use private API (auth required)
async function adminLogoutHandler() {
  try {
    const response = await PrivateApi.post(adminApis.logout);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
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








