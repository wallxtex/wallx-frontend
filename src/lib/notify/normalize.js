/**
 * @fileoverview Response normalizer - converts ANY API response/error into a standard format.
 * Handles success bodies, HTTP errors, network errors, timeouts, aborts, and unknown shapes.
 */

import {
  getMessageByCode,
  getMessageByStatus,
  getRetryAfterMessage,
  formatFieldErrorsSummary,
  FALLBACK_MESSAGES,
} from './messages';

/**
 * Type guards for runtime validation
 */
const isPlainObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

const isString = (value) => {
  return typeof value === 'string';
};

/**
 * Extract field errors from various response shapes
 * @param {any} data - Response data
 * @returns {Object.<string, string[]> | null}
 */
const extractFieldErrors = (data) => {
  if (!isPlainObject(data)) return null;
  
  // Check common patterns
  const candidates = [
    data.errors,
    data.fieldErrors,
    data.validationErrors,
    data.fields,
  ];
  
  for (const candidate of candidates) {
    if (isPlainObject(candidate)) {
      // Normalize to { field: [messages] } format
      const normalized = {};
      
      for (const [field, value] of Object.entries(candidate)) {
        if (Array.isArray(value)) {
          normalized[field] = value.filter(isString);
        } else if (isString(value)) {
          normalized[field] = [value];
        } else if (isPlainObject(value) && value.message) {
          normalized[field] = [String(value.message)];
        }
      }
      
      if (Object.keys(normalized).length > 0) {
        return normalized;
      }
    }
  }
  
  return null;
};

/**
 * Extract message from various response shapes (tolerant parser)
 * @param {any} data - Response data
 * @returns {string | null}
 */
const extractMessage = (data) => {
  if (isString(data)) return data;
  if (!isPlainObject(data)) return null;
  
  // Check common message fields
  const messageFields = [
    'message',
    'msg',
    'error',
    'errorMessage',
    'detail',
    'details',
    'description',
  ];
  
  for (const field of messageFields) {
    if (isString(data[field]) && data[field].length > 0) {
      return data[field];
    }
  }
  
  return null;
};

/**
 * Extract error code from response
 * @param {any} data - Response data
 * @returns {string | null}
 */
const extractCode = (data) => {
  if (!isPlainObject(data)) return null;
  
  const codeFields = ['code', 'errorCode', 'error_code', 'type'];
  
  for (const field of codeFields) {
    if (isString(data[field])) {
      return data[field];
    }
  }
  
  return null;
};

/**
 * Extract request ID for debugging
 * @param {any} data - Response data
 * @returns {string | null}
 */
const extractRequestId = (data) => {
  if (!isPlainObject(data)) return null;
  
  const idFields = ['requestId', 'request_id', 'traceId', 'trace_id', 'id'];
  
  for (const field of idFields) {
    if (isString(data[field])) {
      return data[field];
    }
  }
  
  return null;
};

/**
 * Determine if response indicates success
 * @param {any} data - Response data
 * @param {number} status - HTTP status code
 * @returns {boolean}
 */
const isSuccessResponse = (data, status) => {
  // HTTP 2xx status codes
  if (status >= 200 && status < 300) return true;
  
  // Check explicit success flag
  if (isPlainObject(data)) {
    if (data.success === true || data.ok === true || data.status === 'success') {
      return true;
    }
  }
  
  return false;
};

/**
 * Normalize axios error
 * @param {any} error - Axios error object
 * @returns {import('./types').NormalizedResponse}
 */
const normalizeAxiosError = (error) => {
  // Network error (no response received)
  if (!error.response && error.request) {
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return {
        type: 'error',
        message: FALLBACK_MESSAGES.timeout,
        code: 'TIMEOUT_ERROR',
        silent: false,
      };
    }
    
    return {
      type: 'error',
      message: FALLBACK_MESSAGES.networkError,
      code: 'NETWORK_ERROR',
      silent: false,
    };
  }
  
  // Request was cancelled/aborted
  if (error.code === 'ERR_CANCELED' || error.message?.includes('cancel')) {
    return {
      type: 'info',
      message: FALLBACK_MESSAGES.cancelled,
      code: 'REQUEST_CANCELLED',
      silent: true, // Don't show toast for cancelled requests
    };
  }
  
  // HTTP error response received
  if (error.response) {
    const { status, data, headers } = error.response;
    
    return normalizeHttpError(status, data, headers);
  }
  
  // Unknown error
  return {
    type: 'error',
    message: FALLBACK_MESSAGES.unknown,
    code: 'UNKNOWN_ERROR',
    silent: false,
  };
};

/**
 * Normalize HTTP error response
 * @param {number} status - HTTP status code
 * @param {any} data - Response data
 * @param {Object} [headers] - Response headers
 * @returns {import('./types').NormalizedResponse}
 */
const normalizeHttpError = (status, data, headers = {}) => {
  const code = extractCode(data);
  const fieldErrors = extractFieldErrors(data);
  const requestId = extractRequestId(data);
  let message = extractMessage(data);
  
  // Special handling by status code
  switch (status) {
    case 401:
      return {
        type: 'error',
        message: message || getMessageByStatus(401),
        code: code || 'AUTH_UNAUTHORIZED',
        status: 401,
        requestId,
        silent: true, // Auth handler will deal with this
      };
    
    case 403:
      return {
        type: 'error',
        message: message || getMessageByStatus(403),
        code: code || 'AUTH_FORBIDDEN',
        status: 403,
        requestId,
        silent: false,
      };
    
    case 404:
      return {
        type: 'error',
        message: message || getMessageByStatus(404),
        code: code || 'RESOURCE_NOT_FOUND',
        status: 404,
        requestId,
        silent: true, // Queries can opt-in to show 404 toasts
      };
    
    case 422:
    case 400:
      // Validation errors
      if (fieldErrors) {
        return {
          type: 'error',
          message: message || formatFieldErrorsSummary(fieldErrors),
          code: code || 'VALIDATION_ERROR',
          status,
          fieldErrors,
          requestId,
          silent: false,
        };
      }
      break;
    
    case 429:
      // Rate limiting
      const retryAfter = headers['retry-after'];
      return {
        type: 'warning',
        message: message || getRetryAfterMessage(retryAfter),
        code: code || 'RATE_LIMIT_EXCEEDED',
        status: 429,
        requestId,
        silent: false,
      };
    
    default:
      break;
  }
  
  // 5xx server errors
  if (status >= 500) {
    const serverMessage = message || getMessageByStatus(status) || FALLBACK_MESSAGES.error;
    return {
      type: 'error',
      message: requestId 
        ? `${serverMessage} (Request ID: ${requestId})`
        : serverMessage,
      code: code || 'SERVER_ERROR',
      status,
      requestId,
      silent: false,
    };
  }
  
  // Fallback for other error status codes
  return {
    type: 'error',
    message: message || getMessageByStatus(status) || FALLBACK_MESSAGES.error,
    code: code || `HTTP_${status}`,
    status,
    fieldErrors,
    requestId,
    silent: false,
  };
};

/**
 * Normalize success response
 * @param {any} data - Response data
 * @param {number} status - HTTP status code
 * @returns {import('./types').NormalizedResponse}
 */
const normalizeSuccessResponse = (data, status) => {
  const message = extractMessage(data) || FALLBACK_MESSAGES.success;
  
  return {
    type: 'success',
    message,
    status,
    data,
    silent: false,
  };
};

/**
 * Main normalizer - converts ANY response or error into standard format
 * @param {any} input - Response, error, or raw data
 * @param {Object} [context] - Additional context
 * @param {number} [context.status] - HTTP status code
 * @param {string} [context.method] - HTTP method (GET, POST, etc.)
 * @returns {import('./types').NormalizedResponse}
 */
export const normalizeApiResponse = (input, context = {}) => {
  // Handle axios error objects
  if (input?.isAxiosError || (input?.config && input?.request)) {
    return normalizeAxiosError(input);
  }
  
  // Handle fetch-like Response objects
  if (input instanceof Response) {
    // This would need async handling in real implementation
    return {
      type: 'error',
      message: FALLBACK_MESSAGES.error,
      status: input.status,
      silent: false,
    };
  }
  
  // Plain error object
  if (input instanceof Error) {
    return {
      type: 'error',
      message: input.message || FALLBACK_MESSAGES.error,
      code: input.name,
      silent: false,
    };
  }
  
  // Success response with explicit status
  if (context.status && isSuccessResponse(input, context.status)) {
    return normalizeSuccessResponse(input, context.status);
  }
  
  // HTTP error with status context
  if (context.status && context.status >= 400) {
    return normalizeHttpError(context.status, input);
  }
  
  // Plain object without context - try to infer
  if (isPlainObject(input)) {
    // Check if it looks like an error
    if (input.success === false || input.error || input.errors) {
      return normalizeHttpError(input.statusCode || input.status || 500, input);
    }
    
    // Assume success
    if (input.success === true || input.data) {
      return normalizeSuccessResponse(input, 200);
    }
  }
  
  // String message
  if (isString(input)) {
    return {
      type: 'info',
      message: input,
      silent: false,
    };
  }
  
  // Unknown shape
  return {
    type: 'error',
    message: FALLBACK_MESSAGES.unknown,
    code: 'UNKNOWN_ERROR',
    silent: false,
  };
};
