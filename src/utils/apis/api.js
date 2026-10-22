import axios from "axios";
import { setupInterceptors } from "../../lib/notify";
import { getApiToken } from "../helpers/constants/getapiToken";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

API.interceptors.request.use(
  async (config) => {
    // Try to get valid token (with auto-refresh if expired)
    const { data, success } = await getApiToken();

    config.headers = config.headers || {};
    config.headers["x-timezone"] =
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (success && data?.token) {
      config.headers["Authorization"] = `Bearer ${data.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// Setup automatic toast notifications
setupInterceptors(API, {
  dedupeWindow: 3000,
  toastOnQueryError: true,
  toastOnMutationSuccess: true,
  toastOnMutationError: true,
  onUnauthorized: async (error) => {
    console.error('[API] 401 Unauthorized detected:', error.message);
    console.warn('[API] Token refresh handled by getApiToken, not retrying');
    
    // Don't retry - getApiToken already attempted refresh
    // Return false to prevent retry loop
    return false;
  },
});

export default API;
