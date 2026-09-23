/**
 * @fileoverview Axios interceptor integration with automatic toast handling.
 * Includes dedupe logic, offline detection, and per-request toast control.
 */

import { notify } from "./notify";
import { normalizeApiResponse } from "./normalize";

/**
 * Dedupe cache for preventing duplicate toasts
 * @type {Map<string, import('./types').ToastDedupeEntry>}
 */
const dedupeCache = new Map();

/**
 * Default configuration
 * @type {import('./types').InterceptorConfig}
 */
const DEFAULT_CONFIG = {
  dedupeWindow: 3000,
  maxVisibleToasts: 3,
  toastOnQueryError: true,
  toastOnMutationSuccess: true,
  toastOnMutationError: true,
};

/**
 * Network state tracking
 * @type {import('./types').NetworkState}
 */
const networkState = {
  isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
  lastOfflineToast: 0,
};

/**
 * 401 handling queue to prevent multiple refresh attempts
 */
let isRefreshing = false;
const refreshSubscribers = [];

/**
 * Generate dedupe key for a request
 * @param {string} method - HTTP method
 * @param {string} url - Request URL
 * @param {number} [status] - Response status
 * @param {string} message - Toast message
 * @returns {string}
 */
const generateDedupeKey = (method, url, status, message) => {
  // Remove query params and IDs from URL for better deduplication
  const cleanUrl = url.split("?")[0].replace(/\/\d+/g, "/:id");
  return `${method}:${cleanUrl}:${status || "pending"}:${message}`;
};

/**
 * Check if toast should be shown (dedupe logic)
 * @param {string} key - Dedupe key
 * @param {number} dedupeWindow - Dedupe window in ms
 * @returns {boolean}
 */
const shouldShowToast = (key, dedupeWindow) => {
  const now = Date.now();
  const cached = dedupeCache.get(key);

  if (cached && now - cached.timestamp < dedupeWindow) {
    return false; // Duplicate, skip
  }

  // Clean up old entries
  for (const [cacheKey, entry] of dedupeCache.entries()) {
    if (now - entry.timestamp > dedupeWindow * 2) {
      dedupeCache.delete(cacheKey);
    }
  }

  return true;
};

/**
 * Record toast in dedupe cache
 * @param {string} key - Dedupe key
 * @param {string} toastId - Toast ID
 */
const recordToast = (key, toastId) => {
  dedupeCache.set(key, {
    key,
    timestamp: Date.now(),
    toastId,
  });
};

/**
 * Extract toast config from request
 * @param {Object} config - Axios config
 * @returns {false | import('./types').ToastConfig | null}
 */
const getToastConfig = (config) => {
  // Check direct config.toast
  if (config.toast !== undefined) {
    return config.toast;
  }

  // Check meta.toast (TanStack Query compat)
  if (config.meta?.toast !== undefined) {
    return config.meta.toast;
  }

  return null;
};

/**
 * Determine if request is a mutation (POST/PUT/PATCH/DELETE)
 * @param {string} method
 * @returns {boolean}
 */
const isMutation = (method) => {
  const mutationMethods = ["post", "put", "patch", "delete"];
  return mutationMethods.includes(method?.toLowerCase());
};

/**
 * Handle offline/network errors
 * @param {number} dedupeWindow
 */
const handleOfflineToast = (dedupeWindow) => {
  const now = Date.now();

  // Only show one offline toast per dedupe window
  if (now - networkState.lastOfflineToast > dedupeWindow) {
    notify.error("No internet connection. Please check your network");
    networkState.lastOfflineToast = now;
  }
};

/**
 * Call auth handler for 401 responses (single-flight refresh)
 * @param {import('./types').AuthHandler} authHandler
 * @param {import('./types').NormalizedResponse} normalized
 * @returns {Promise<boolean>}
 */
const handle401 = async (authHandler, normalized) => {
  if (!authHandler) return false;

  if (!isRefreshing) {
    isRefreshing = true;

    try {
      const success = await authHandler(normalized);

      // Notify all waiting requests
      refreshSubscribers.forEach((callback) => callback(success));
      refreshSubscribers.length = 0;

      return success;
    } catch (err) {
      console.error("Auth handler failed:", err);
      return false;
    } finally {
      isRefreshing = false;
    }
  }

  // Queue this request until refresh completes
  return new Promise((resolve) => {
    refreshSubscribers.push(resolve);
  });
};

/**
 * Setup axios interceptors for automatic toast handling
 * @param {import('axios').AxiosInstance} axiosInstance - Axios instance
 * @param {import('./types').InterceptorConfig} [config] - Configuration
 * @returns {() => void} Teardown function
 */
export const setupInterceptors = (axiosInstance, config = {}) => {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  // Request interceptor - track pending requests
  const requestInterceptor = axiosInstance.interceptors.request.use(
    (requestConfig) => {
      // Add request timestamp for timeout tracking
      requestConfig.meta = requestConfig.meta || {};
      requestConfig.meta._startTime = Date.now();

      return requestConfig;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor - success handling
  const responseInterceptor = axiosInstance.interceptors.response.use(
    (response) => {
      const { config: requestConfig, status, data } = response;
      const toastConfig = getToastConfig(requestConfig);

      // Toast explicitly disabled
      if (toastConfig === false) {
        return response;
      }

      // Only toast mutations by default
      const shouldToast = isMutation(requestConfig.method)
        ? mergedConfig.toastOnMutationSuccess
        : false;

      if (!shouldToast && !toastConfig) {
        return response;
      }

      // Normalize response
      const normalized = normalizeApiResponse(data, {
        status,
        method: requestConfig.method,
      });

      // Check for explicit success message override
      const message =
        toastConfig?.success !== undefined
          ? toastConfig.success
          : normalized.message;

      // Don't toast if message is false
      if (message === false) {
        return response;
      }

      // Dedupe check
      const dedupeKey = generateDedupeKey(
        requestConfig.method,
        requestConfig.url,
        status,
        message,
      );

      if (!shouldShowToast(dedupeKey, mergedConfig.dedupeWindow)) {
        return response;
      }

      // Show toast
      const toastId = notify.success(message, {
        duration: toastConfig?.duration,
        id: toastConfig?.id,
      });

      recordToast(dedupeKey, toastId);

      return response;
    },
    async (error) => {
      const { config: requestConfig, response } = error;
      const toastConfig = getToastConfig(requestConfig);

      // Toast explicitly disabled
      if (toastConfig === false) {
        return Promise.reject(error);
      }

      // Normalize error
      const normalized = normalizeApiResponse(error);

      // Handle network offline
      if (normalized.code === "NETWORK_ERROR" && !networkState.isOnline) {
        handleOfflineToast(mergedConfig.dedupeWindow);
        return Promise.reject(error);
      }

      // Handle cancelled requests (never toast)
      if (normalized.code === "REQUEST_CANCELLED" || normalized.silent) {
        return Promise.reject(error);
      }

      // Handle 401 (auth handler)
      if (normalized.status === 401 && mergedConfig.onUnauthorized) {
        // Check if this is already a retry attempt to prevent infinite loops
        if (requestConfig._retryAttempted) {
          console.error(
            "[INTERCEPTOR] 401 on retry attempt, aborting to prevent loop",
          );
          return Promise.reject(error);
        }

        const refreshSuccess = await handle401(
          mergedConfig.onUnauthorized,
          normalized,
        );

        if (refreshSuccess && requestConfig) {
          console.log(
            "[INTERCEPTOR] Token refresh successful, retrying original request",
          );
          // Mark this as a retry to prevent infinite loops
          requestConfig._retryAttempted = true;
          // Retry the original request
          return axiosInstance.request(requestConfig);
        }

        // Refresh failed, reject without toast (auth handler deals with it)
        console.warn("[INTERCEPTOR] Token refresh failed, rejecting request");
        return Promise.reject(error);
      }

      // Handle 404 on queries (silent by default)
      if (normalized.status === 404 && !isMutation(requestConfig?.method)) {
        if (!toastConfig || !mergedConfig.toastOnQueryError) {
          return Promise.reject(error);
        }
      }

      // Check if should toast
      const shouldToast = isMutation(requestConfig?.method)
        ? mergedConfig.toastOnMutationError
        : mergedConfig.toastOnQueryError;

      if (!shouldToast && !toastConfig) {
        return Promise.reject(error);
      }

      // Check for explicit error message override
      let message =
        toastConfig?.error !== undefined
          ? toastConfig.error
          : normalized.message;

      // Don't toast if message is false
      if (message === false) {
        return Promise.reject(error);
      }

      // For field errors, only show summary toast if no form is present
      // (Form should use applyServerErrors helper instead)
      if (normalized.fieldErrors && !toastConfig) {
        // Skip automatic toast, let form handle it
        return Promise.reject(error);
      }

      // Dedupe check
      const dedupeKey = generateDedupeKey(
        requestConfig?.method || "UNKNOWN",
        requestConfig?.url || "unknown",
        normalized.status,
        message,
      );

      if (!shouldShowToast(dedupeKey, mergedConfig.dedupeWindow)) {
        return Promise.reject(error);
      }

      // Show toast based on type
      const toastMethod = normalized.type === "warning" ? "warning" : "error";
      const toastId = notify[toastMethod](message, {
        duration: toastConfig?.duration,
        id: toastConfig?.id,
      });

      recordToast(dedupeKey, toastId);

      return Promise.reject(error);
    },
  );

  // Listen for online/offline events (browser only)
  if (typeof window !== "undefined") {
    const handleOnline = () => {
      networkState.isOnline = true;
      notify.success("Connection restored");
    };

    const handleOffline = () => {
      networkState.isOnline = false;
      handleOfflineToast(mergedConfig.dedupeWindow);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Teardown function
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      dedupeCache.clear();
    };
  }

  // Teardown for non-browser environments
  return () => {
    axiosInstance.interceptors.request.eject(requestInterceptor);
    axiosInstance.interceptors.response.eject(responseInterceptor);
    dedupeCache.clear();
  };
};
