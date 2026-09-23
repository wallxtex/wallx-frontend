/**
 * @fileoverview JSDoc type definitions for the toast notification system.
 * These provide IntelliSense and basic type checking without TypeScript.
 */

/**
 * Toast type enumeration
 * @typedef {'info' | 'success' | 'warning' | 'error'} ToastType
 */

/**
 * Toast configuration for per-request control
 * @typedef {Object} ToastConfig
 * @property {string | false} [success] - Success message override, false to disable
 * @property {string | false} [error] - Error message override, false to disable
 * @property {string} [loading] - Loading message for promise toasts
 * @property {number} [duration] - Duration in milliseconds
 * @property {string} [id] - Unique toast ID for updates/dismissal
 * @property {boolean} [silent] - If true, skip toast entirely
 */

/**
 * Axios/fetch config with toast metadata
 * @typedef {Object} RequestConfig
 * @property {false | ToastConfig} [toast] - Toast configuration or false to disable all toasts
 * @property {Object} [meta] - For TanStack Query compatibility
 * @property {false | ToastConfig} [meta.toast] - Toast config in meta
 */

/**
 * Normalized API response after processing
 * @typedef {Object} NormalizedResponse
 * @property {ToastType} type - Response type (info/success/warning/error)
 * @property {string} message - User-facing message
 * @property {string} [code] - Error code from server
 * @property {number} [status] - HTTP status code
 * @property {Object.<string, string[]>} [fieldErrors] - Validation errors by field name
 * @property {string} [requestId] - Server request ID for debugging
 * @property {boolean} silent - Whether to suppress toast
 * @property {any} [data] - Original response data
 */

/**
 * Promise toast messages
 * @typedef {Object} PromiseMessages
 * @property {string} loading - Message while promise is pending
 * @property {string} success - Message on success
 * @property {string | ((data: any) => string)} error - Message on error (can be function)
 */

/**
 * Toast adapter interface (abstraction over library)
 * @typedef {Object} ToastAdapter
 * @property {(message: string, options?: Object) => string} info
 * @property {(message: string, options?: Object) => string} success
 * @property {(message: string, options?: Object) => string} warning
 * @property {(message: string, options?: Object) => string} error
 * @property {(promise: Promise<any>, messages: PromiseMessages, options?: Object) => Promise<any>} promise
 * @property {(toastId?: string) => void} dismiss
 * @property {() => void} dismissAll
 */

/**
 * Auth handler for 401 responses
 * @callback AuthHandler
 * @param {NormalizedResponse} error - Normalized 401 error
 * @returns {Promise<boolean>} - True if refresh succeeded, false if logout needed
 */

/**
 * Network state for offline detection
 * @typedef {Object} NetworkState
 * @property {boolean} isOnline - Current online status
 * @property {number} [lastOfflineToast] - Timestamp of last offline toast
 */

/**
 * Toast dedupe entry
 * @typedef {Object} ToastDedupeEntry
 * @property {string} key - Unique key (method + url + status + message)
 * @property {number} timestamp - When toast was shown
 * @property {string} toastId - Toast ID for potential dismissal
 */

/**
 * Interceptor configuration
 * @typedef {Object} InterceptorConfig
 * @property {number} [dedupeWindow] - Dedupe window in ms (default: 3000)
 * @property {number} [maxVisibleToasts] - Max concurrent toasts (default: 3)
 * @property {AuthHandler} [onUnauthorized] - Handler for 401 responses
 * @property {boolean} [toastOnQueryError] - Toast on GET errors (default: true)
 * @property {boolean} [toastOnMutationSuccess] - Toast on mutation success (default: true)
 * @property {boolean} [toastOnMutationError] - Toast on mutation error (default: true)
 */

export {};
