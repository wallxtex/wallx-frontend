/**
 * @fileoverview Toast library adapter - abstraction over react-hot-toast.
 * Swap this file to change toast libraries without touching the rest of the app.
 */

import toast from 'react-hot-toast';

/**
 * Default toast options
 */
const DEFAULT_OPTIONS = {
  duration: 4000,
  position: 'top-right',
  style: {
    maxWidth: '500px',
  },
};

/**
 * Duration by type (errors stay longer)
 */
const DURATION_BY_TYPE = {
  info: 4000,
  success: 4000,
  warning: 5000,
  error: 6000,
};

/**
 * Toast adapter for react-hot-toast
 * @type {import('./types').ToastAdapter}
 */
export const toastAdapter = {
  /**
   * Show info toast
   * @param {string} message
   * @param {Object} [options]
   * @returns {string} Toast ID
   */
  info: (message, options = {}) => {
    return toast(message, {
      ...DEFAULT_OPTIONS,
      duration: options.duration ?? DURATION_BY_TYPE.info,
      icon: 'ℹ️',
      id: options.id,
      ...options,
    });
  },

  /**
   * Show success toast
   * @param {string} message
   * @param {Object} [options]
   * @returns {string} Toast ID
   */
  success: (message, options = {}) => {
    return toast.success(message, {
      ...DEFAULT_OPTIONS,
      duration: options.duration ?? DURATION_BY_TYPE.success,
      id: options.id,
      ...options,
    });
  },

  /**
   * Show warning toast
   * @param {string} message
   * @param {Object} [options]
   * @returns {string} Toast ID
   */
  warning: (message, options = {}) => {
    return toast(message, {
      ...DEFAULT_OPTIONS,
      duration: options.duration ?? DURATION_BY_TYPE.warning,
      icon: '⚠️',
      id: options.id,
      style: {
        ...DEFAULT_OPTIONS.style,
        background: '#FEF3C7',
        color: '#92400E',
      },
      ...options,
    });
  },

  /**
   * Show error toast
   * @param {string} message
   * @param {Object} [options]
   * @returns {string} Toast ID
   */
  error: (message, options = {}) => {
    return toast.error(message, {
      ...DEFAULT_OPTIONS,
      duration: options.duration ?? DURATION_BY_TYPE.error,
      id: options.id,
      ...options,
    });
  },

  /**
   * Show promise-based toast (loading -> success/error)
   * @param {Promise<any>} promise
   * @param {import('./types').PromiseMessages} messages
   * @param {Object} [options]
   * @returns {Promise<any>}
   */
  promise: (promise, messages, options = {}) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading,
        success: messages.success,
        error: typeof messages.error === 'function' 
          ? messages.error 
          : messages.error,
      },
      {
        ...DEFAULT_OPTIONS,
        id: options.id,
        ...options,
      }
    );
  },

  /**
   * Dismiss a specific toast or all toasts
   * @param {string} [toastId] - Optional toast ID, dismisses all if omitted
   */
  dismiss: (toastId) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  },

  /**
   * Dismiss all toasts
   */
  dismissAll: () => {
    toast.dismiss();
  },
};
