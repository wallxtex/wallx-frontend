/**
 * @fileoverview Message resolution - error codes, status codes, and fallbacks.
 * Centralized user-facing messages for internationalization.
 */

/**
 * Error code to message map
 * Priority: error code > status code > generic fallback
 */
export const ERROR_CODE_MAP = {
  // Authentication & Authorization
  'AUTH_INVALID_CREDENTIALS': 'Invalid email or password',
  'AUTH_TOKEN_EXPIRED': 'Your session has expired. Please login again',
  'AUTH_TOKEN_INVALID': 'Invalid authentication token',
  'AUTH_UNAUTHORIZED': 'You are not authorized to perform this action',
  'AUTH_FORBIDDEN': 'You do not have permission to access this resource',
  'AUTH_ACCOUNT_LOCKED': 'Your account has been locked. Please contact support',
  'AUTH_EMAIL_NOT_VERIFIED': 'Please verify your email address',
  
  // Validation
  'VALIDATION_ERROR': 'Please check your input and try again',
  'VALIDATION_REQUIRED_FIELD': 'Required field is missing',
  'VALIDATION_INVALID_FORMAT': 'Invalid format provided',
  'VALIDATION_DUPLICATE': 'This record already exists',
  
  // Resources
  'RESOURCE_NOT_FOUND': 'The requested resource was not found',
  'RESOURCE_ALREADY_EXISTS': 'This resource already exists',
  'RESOURCE_DELETED': 'This resource has been deleted',
  
  // Rate Limiting
  'RATE_LIMIT_EXCEEDED': 'Too many requests. Please try again later',
  
  // Business Logic
  'INSUFFICIENT_BALANCE': 'Insufficient balance to complete this transaction',
  'INVALID_OPERATION': 'This operation is not allowed',
  'QUOTA_EXCEEDED': 'You have exceeded your quota',
  
  // Network & Server
  'NETWORK_ERROR': 'Network connection error. Please check your internet',
  'TIMEOUT_ERROR': 'Request timed out. Please try again',
  'SERVER_ERROR': 'An unexpected server error occurred',
  'SERVICE_UNAVAILABLE': 'Service is temporarily unavailable',
};

/**
 * Status code to message map (fallback when no error code)
 */
export const STATUS_CODE_MAP = {
  // 4xx Client Errors
  400: 'Invalid request. Please check your input',
  401: 'Please login to continue',
  403: 'You do not have permission to perform this action',
  404: 'Resource not found',
  405: 'Method not allowed',
  408: 'Request timeout. Please try again',
  409: 'Conflict detected. This resource may already exist',
  422: 'Validation failed. Please check your input',
  429: 'Too many requests. Please slow down',
  
  // 5xx Server Errors
  500: 'Internal server error. Please try again later',
  501: 'Feature not implemented',
  502: 'Bad gateway. Please try again',
  503: 'Service temporarily unavailable',
  504: 'Gateway timeout. Please try again',
};

/**
 * Generic fallback messages
 */
export const FALLBACK_MESSAGES = {
  error: 'An unexpected error occurred',
  success: 'Operation completed successfully',
  info: 'Information',
  warning: 'Warning',
  networkError: 'Unable to connect. Please check your internet connection',
  timeout: 'Request took too long. Please try again',
  cancelled: 'Request was cancelled',
  unknown: 'Something went wrong. Please try again',
};

/**
 * Get user-facing message from error code
 * @param {string} code - Error code from server
 * @returns {string | null} Message or null if not found
 */
export const getMessageByCode = (code) => {
  if (!code || typeof code !== 'string') return null;
  return ERROR_CODE_MAP[code] ?? null;
};

/**
 * Get user-facing message from status code
 * @param {number} status - HTTP status code
 * @returns {string | null} Message or null if not found
 */
export const getMessageByStatus = (status) => {
  if (!status || typeof status !== 'number') return null;
  return STATUS_CODE_MAP[status] ?? null;
};

/**
 * Get retry-after message for 429 responses
 * @param {string | number} retryAfter - Retry-After header value
 * @returns {string} Formatted message
 */
export const getRetryAfterMessage = (retryAfter) => {
  if (!retryAfter) return STATUS_CODE_MAP[429];
  
  const seconds = parseInt(retryAfter, 10);
  if (isNaN(seconds)) return STATUS_CODE_MAP[429];
  
  if (seconds < 60) {
    return `Too many requests. Please wait ${seconds} seconds`;
  }
  
  const minutes = Math.ceil(seconds / 60);
  return `Too many requests. Please wait ${minutes} minute${minutes > 1 ? 's' : ''}`;
};

/**
 * Format field errors into a summary message
 * @param {Object.<string, string[]>} fieldErrors - Field errors object
 * @param {number} [maxFields=3] - Max fields to show in summary
 * @returns {string} Summary message
 */
export const formatFieldErrorsSummary = (fieldErrors, maxFields = 3) => {
  if (!fieldErrors || typeof fieldErrors !== 'object') {
    return FALLBACK_MESSAGES.error;
  }
  
  const fields = Object.keys(fieldErrors);
  if (fields.length === 0) return FALLBACK_MESSAGES.error;
  
  const shown = fields.slice(0, maxFields);
  const remaining = fields.length - shown.length;
  
  let summary = `Validation failed: ${shown.join(', ')}`;
  if (remaining > 0) {
    summary += ` and ${remaining} more field${remaining > 1 ? 's' : ''}`;
  }
  
  return summary;
};
