/**
 * @fileoverview Main entry point for the notify system.
 * Export all public APIs for easy imports.
 */

// Core notify service
export { notify, isValidToastConfig } from './notify';

// Provider component
export { ToastProvider } from './ToastProvider';

// Helpers
export {
  applyServerErrors,
  extractFieldErrors,
  isValidationError,
  isAuthError,
  isPermissionError,
  isNetworkError,
  isServerError,
  getErrorMessage,
  createToastConfig,
} from './helpers';

// Interceptor setup
export { setupInterceptors } from './interceptors';

// Normalizer (for advanced use cases)
export { normalizeApiResponse } from './normalize';

// Message maps (for customization)
export {
  ERROR_CODE_MAP,
  STATUS_CODE_MAP,
  FALLBACK_MESSAGES,
  getMessageByCode,
  getMessageByStatus,
} from './messages';
