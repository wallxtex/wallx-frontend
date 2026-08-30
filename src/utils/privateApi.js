import axios from "axios";
// import getTokenForPrivateApi from "./helper/getTokenForPrivateApi";

const PrivateApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // Automatically send cookies including refresh token
});

// PrivateApi.interceptors.request.use(
//   async (config) => {
//     const { data, success } = await getTokenForPrivateApi();
//     if (success) {
//       config.headers.Authorization = `Bearer ${data.token}`;
//       return config;
//     }
    
//     // Check if this is a recoverable error (invalid refresh token)
//     const isRecoverable = data?.response?.data?.isRecoverable;
    
//     if (!isRecoverable) {
//       // Non-recoverable error - redirect to login
//       setTimeout(() => {
//         window.location.replace("/");
//       }, 1500);
//     }
//     // For recoverable errors, don't redirect - let the UI handle it

//     throw new Error("No authentication token found");
//   },
//   (error) => {
//     throw error;
//   },
// );

// PrivateApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalConfig = error.config;
//     if (
//       error.response?.status === 401 &&
//       !originalConfig._retry &&
//       error.response?.data?.code !== "REFRESH_FAILED"
//     ) {
//       originalConfig._retry = true;

//       // Get a fresh token (refresh happens silently in getTokenForPrivateApi)
//       const { data: tokenData, success } = await getTokenForPrivateApi();

//       if (success) {
//         // Update the authorization header with new token
//         originalConfig.headers.Authorization = `Bearer ${tokenData.token}`;
//         // Retry the original request
//         return PrivateApi(originalConfig);
//       }

//       // Check if refresh failed due to invalid token (recoverable by refresh page)
//       const isRecoverable = tokenData?.response?.data?.isRecoverable;
      
//       if (isRecoverable) {
//         // Invalid refresh token - let UI show message and wait for page refresh
//         // Don't redirect yet, throw error to stop the request
//         throw new Error("Invalid refresh token - please refresh the page");
//       }

//       // Refresh failed - redirect to login
//       setTimeout(() => {
//         window.location.replace("/");
//       }, 2000);

//       throw error;
//     }

//     // Handle connection errors
//     if (error.code === "ECONNABORTED") {
//       console.warn("⏱️ Request timed out");
//     } else if (!error.response) {
//       console.warn("🌐 Unable to connect to server");
//     }

//     console.warn("❌ Error Response From the server:", error.response?.status, error.response?.data?.message);
//     throw error;
//   },
// );

export default PrivateApi;