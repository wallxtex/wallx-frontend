/**
 * @fileoverview Enhanced API instance with automatic toast notifications.
 * Import this instead of the base API when you want automatic toast handling.
 */

import axios from "axios";
import { setupInterceptors } from "../../lib/notify";
import { getApiToken } from "../helpers/constants/getapiToken";

// Create new axios instance with toast integration
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Request interceptor - add auth token
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

// Setup toast interceptors with configuration
const teardown = setupInterceptors(API, {
  dedupeWindow: 3000,
  maxVisibleToasts: 3,
  toastOnQueryError: true, // Show toasts for GET errors
  toastOnMutationSuccess: true, // Show toasts for POST/PUT/PATCH/DELETE success
  toastOnMutationError: true, // Show toasts for mutation errors
  
  // Optional: 401 handler for auth refresh
  onUnauthorized: async (error) => {
    // This will be called when a 401 response is received
    // Return true if refresh succeeded, false if user should be logged out
    console.log('401 detected, handle refresh here:', error);
    
    // Example: try to refresh token
    // const refreshed = await refreshAuthToken();
    // if (!refreshed) {
    //   window.location.href = '/login';
    // }
    // return refreshed;
    
    return false; // For now, just return false
  },
});

// Export both the API instance and teardown function
export default API;
export { teardown };
