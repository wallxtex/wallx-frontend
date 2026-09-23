/**
 * @fileoverview Helper utilities for forms and special use cases.
 */

import { notify } from './notify';

/**
 * Apply server validation errors to react-hook-form or similar form libraries
 * @param {Error | Object} error - Axios error or normalized error
 * @param {Function} setError - Form's setError function (e.g., from react-hook-form)
 * @param {Object} [options] - Options
 * @param {boolean} [options.showToast=true] - Show summary toast
 * @param {string} [options.summaryMessage] - Custom summary message
 * 
 * @example
 * // With react-hook-form
 * try {
 *   await updateProfile(data);
 * } catch (error) {
 *   applyServerErrors(error, setError);
 * }
 */
export const applyServerErrors = (error, setError, options = {}) => {
  const { showToast = true, summaryMessage } = options;
  
  if (!setError || typeof setError !== 'function') {
    console.error('applyServerErrors: setError must be a function');
    return;
  }
  
  // Extract field errors from various error shapes
  let fieldErrors = null;
  let message = null;
  
  // Axios error
  if (error?.response?.data) {
    const data = error.response.data;
    fieldErrors = data.errors || data.fieldErrors || data.validationErrors;
    message = data.message;
  }
  // Already normalized
  else if (error?.fieldErrors) {
    fieldErrors = error.fieldErrors;
    message = error.message;
  }
  // Plain object
  else if (error?.errors) {
    fieldErrors = error.errors;
    message = error.message;
  }
  
  // Apply field errors to form
  if (fieldErrors && typeof fieldErrors === 'object') {
    let appliedCount = 0;
    
    for (const [field, messages] of Object.entries(fieldErrors)) {
      // Handle array of messages
      const errorMessage = Array.isArray(messages) 
        ? messages[0] 
        : String(messages);
      
      if (errorMessage) {
        setError(field, {
          type: 'server',
          message: errorMessage,
        });
        appliedCount++;
      }
    }
    
    // Show summary toast if errors were applied
    if (appliedCount > 0 && showToast) {
      const toastMessage = summaryMessage || 
        `${appliedCount} validation error${appliedCount > 1 ? 's' : ''} found`;
      notify.error(toastMessage);
    }
    
    return appliedCount;
  }
  
  // No field errors, show general error
  if (message && showToast) {
    notify.error(message);
  }
  
  return 0;
};

/**
 * Extract field errors from error object (for manual handling)
 * @param {Error | Object} error - Error object
 * @returns {Object.<string, string[]> | null} Field errors or null
 * 
 * @example
 * const fieldErrors = extractFieldErrors(error);
 * if (fieldErrors?.email) {
 *   console.log('Email errors:', fieldErrors.email);
 * }
 */
export const extractFieldErrors = (error) => {
  // Axios error
  if (error?.response?.data) {
    const data = error.response.data;
    return data.errors || data.fieldErrors || data.validationErrors || null;
  }
  
  // Already normalized
  if (error?.fieldErrors) {
    return error.fieldErrors;
  }
  
  // Plain object
  if (error?.errors && typeof error.errors === 'object') {
    return error.errors;
  }
  
  return null;
};

/**
 * Check if error is a validation error (422/400 with field errors)
 * @param {Error | Object} error - Error object
 * @returns {boolean}
 */
export const isValidationError = (error) => {
  const status = error?.response?.status || error?.status;
  const hasFieldErrors = extractFieldErrors(error) !== null;
  
  return (status === 422 || status === 400) && hasFieldErrors;
};

/**
 * Check if error is an authentication error (401)
 * @param {Error | Object} error - Error object
 * @returns {boolean}
 */
export const isAuthError = (error) => {
  const status = error?.response?.status || error?.status;
  return status === 401;
};

/**
 * Check if error is a permission error (403)
 * @param {Error | Object} error - Error object
 * @returns {boolean}
 */
export const isPermissionError = (error) => {
  const status = error?.response?.status || error?.status;
  return status === 403;
};

/**
 * Check if error is a network error (no response)
 * @param {Error | Object} error - Error object
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  return !error?.response && error?.request;
};

/**
 * Check if error is a server error (5xx)
 * @param {Error | Object} error - Error object
 * @returns {boolean}
 */
export const isServerError = (error) => {
  const status = error?.response?.status || error?.status;
  return status >= 500 && status < 600;
};

/**
 * Get error message from any error shape
 * @param {Error | Object | string} error - Error object or message
 * @param {string} [fallback='An error occurred'] - Fallback message
 * @returns {string}
 */
export const getErrorMessage = (error, fallback = 'An error occurred') => {
  if (typeof error === 'string') return error;
  
  // Try common message fields
  const message = error?.response?.data?.message ||
                  error?.message ||
                  error?.error ||
                  error?.msg;
  
  return message || fallback;
};

/**
 * Create toast configuration object (type-safe helper)
 * @param {Object} config - Toast configuration
 * @param {string | false} [config.success] - Success message
 * @param {string | false} [config.error] - Error message  
 * @param {string} [config.loading] - Loading message
 * @param {number} [config.duration] - Duration in ms
 * @param {string} [config.id] - Toast ID
 * @param {boolean} [config.silent] - Skip toast entirely
 * @returns {import('./types').ToastConfig | false}
 * 
 * @example
 * api.post('/users', data, {
 *   toast: createToastConfig({
 *     success: 'User created!',
 *     error: 'Failed to create user'
 *   })
 * })
 */
export const createToastConfig = (config) => {
  if (config === false) return false;
  if (config.silent) return false;
  
  return {
    success: config.success,
    error: config.error,
    loading: config.loading,
    duration: config.duration,
    id: config.id,
  };
};
