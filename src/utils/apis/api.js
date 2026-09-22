import axios from "axios";
import handleApiError from "../helpers/handlers/globalHandleApiError";
import { getApiToken } from "../helpers/constants/getapiToken";
// import { getApiToken } from "../helpers/constants/getApiToken";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

API.interceptors.request.use(
  async (config) => {
    // Try to get valid token (with auto-refresh if expired)
    const { data, success } = await getApiToken();
    
    config.headers = config.headers || {};
    config.headers["x-timezone"] = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (success && data?.token) {
      config.headers["Authorization"] = `Bearer ${data.token}`;
    }
   
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Error handling
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Use global error handler for all API errors
    handleApiError(error, {
      showToast: true,
      logError: true,
    });
    return Promise.reject(error);
  },
);

export default API;