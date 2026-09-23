/**
 * @fileoverview Notify service - singleton API for showing toasts.
 * Can be used OUTSIDE React (interceptors, utils) and inside components.
 */

import { toastAdapter } from './adapter';

/**
 * Sanitize message: strip HTML, limit length, handle non-strings
 * @param {any} message
 * @param {number} [maxLength=200]
 * @returns {string}
 */
const sanitizeMessage = (message, maxLength = 200) => {
  if (!message) return 'An error occurred';
  
  let str = String(message);
  
  // Strip HTML tags (basic protection)
  str = str.replace(/<[^>]*>/g, '');
  
  // Trim and limit length
  str = str.trim();
  if (str.length > maxLength) {
    str = str.substring(0, maxLength) + '...';
  }
  
  return str || 'An error occurred';
};

/**
 * Validate toast options (runtime guard)
 * @param {any} options
 * @returns {boolean}
 */
const isValidToastOptions = (options) => {
  if (options === false) return true;
  if (!options || typeof options !== 'object') return false;
  
  // Optional properties validation
  const validKeys = ['success', 'error', 'loading', 'duration', 'id', 'silent'];
  const keys = Object.keys(options);
  
  return keys.every(key => validKeys.includes(key));
};

/**
 * Notify service singleton - usable inside and outside React
 */
export const notify = {
  /**
   * Show info toast
   * @param {string} message - Message to display
   * @param {Object} [options] - Toast options
   * @param {number} [options.duration] - Duration in ms
   * @param {string} [options.id] - Toast ID for updates
   * @returns {string} Toast ID
   */
  info: (message, options = {}) => {
    const sanitized = sanitizeMessage(message);
    return toastAdapter.info(sanitized, options);
  },

  /**
   * Show success toast
   * @param {string} message - Message to display
   * @param {Object} [options] - Toast options
   * @param {number} [options.duration] - Duration in ms
   * @param {string} [options.id] - Toast ID for updates
   * @returns {string} Toast ID
   */
  success: (message, options = {}) => {
    const sanitized = sanitizeMessage(message);
    return toastAdapter.success(sanitized, options);
  },

  /**
   * Show warning toast
   * @param {string} message - Message to display
   * @param {Object} [options] - Toast options
   * @param {number} [options.duration] - Duration in ms
   * @param {string} [options.id] - Toast ID for updates
   * @returns {string} Toast ID
   */
  warning: (message, options = {}) => {
    const sanitized = sanitizeMessage(message);
    return toastAdapter.warning(sanitized, options);
  },

  /**
   * Show error toast
   * @param {string} message - Message to display
   * @param {Object} [options] - Toast options
   * @param {number} [options.duration] - Duration in ms
   * @param {string} [options.id] - Toast ID for updates
   * @returns {string} Toast ID
   */
  error: (message, options = {}) => {
    const sanitized = sanitizeMessage(message);
    return toastAdapter.error(sanitized, options);
  },

  /**
   * Show promise-based toast (loading -> success/error)
   * @param {Promise<any>} promise - Promise to track
   * @param {import('./types').PromiseMessages} messages - Messages for each state
   * @param {Object} [options] - Toast options
   * @returns {Promise<any>} Original promise
   * 
   * @example
   * notify.promise(
   *   uploadFile(file),
   *   {
   *     loading: 'Uploading...',
   *     success: 'Upload complete!',
   *     error: (err) => `Upload failed: ${err.message}`
   *   }
   * );
   */
  promise: (promise, messages, options = {}) => {
    // Sanitize messages
    const sanitizedMessages = {
      loading: sanitizeMessage(messages.loading),
      success: sanitizeMessage(messages.success),
      error: typeof messages.error === 'function'
        ? (err) => sanitizeMessage(messages.error(err))
        : sanitizeMessage(messages.error),
    };
    
    return toastAdapter.promise(promise, sanitizedMessages, options);
  },

  /**
   * Dismiss a specific toast or all toasts
   * @param {string} [toastId] - Toast ID to dismiss, omit to dismiss all
   */
  dismiss: (toastId) => {
    toastAdapter.dismiss(toastId);
  },

  /**
   * Dismiss all visible toasts
   */
  dismissAll: () => {
    toastAdapter.dismissAll();
  },
};

/**
 * Helper: Check if toast config is valid
 * @param {any} config
 * @returns {boolean}
 */
export const isValidToastConfig = isValidToastOptions;
