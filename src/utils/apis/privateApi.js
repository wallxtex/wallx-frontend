import axios from "axios";
import { setupInterceptors } from "../../lib/notify";
import { getApiToken } from "../helpers/constants/getapiToken";

// private-api
const PrivateApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

PrivateApi.interceptors.request.use(
  async (config) => {
    const { data, success } = await getApiToken();
    config.headers = config.headers || {};
    config.headers["x-timezone"] =
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (success && data?.token) {
      config.headers.Authorization = `Bearer ${data.token}`;
      return config;
    } else {
      // Token refresh failed - but don't redirect immediately
      // Let the response interceptor handle it (might be transient failure)
      console.error('[PrivateApi] Failed to get token');
      throw new axios.Cancel('No valid token available');
    }
  },
  (error) => {
    throw error;
  },
);

// Setup automatic toast notifications
setupInterceptors(PrivateApi, {
  dedupeWindow: 3000,
  toastOnQueryError: true,
  toastOnMutationSuccess: true,
  toastOnMutationError: true,
  onUnauthorized: async (error) => {
    console.error('[PrivateApi] 401 Unauthorized - session expired');
    
    // Clear tokens
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
    // Show user-friendly message
    console.log('[PrivateApi] Redirecting to login page');
    
    // Small delay to allow console logs to show
    setTimeout(() => {
      window.location.replace("/");
    }, 100);
    
    // Return false to indicate refresh failed (don't retry)
    return false;
  },
});

export default PrivateApi;
