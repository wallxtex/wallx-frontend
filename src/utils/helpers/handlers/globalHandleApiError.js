import { toast } from "react-hot-toast";
import HTTP_STATUS_MESSAGES from "./status-code/ApiStatusMessage";
/**
 * Global API Error Handler
 * Centralizes error handling for all API requests with consistent error messages
 * Handles various HTTP status codes, network errors, and different response structures
 */
function extractErrorMessage(error) {
  try {
    const responseData = error?.response?.data;
    if (!responseData) {
      return null;
    }
    if (responseData.message && typeof responseData.message === "string") {
      return responseData.message.trim();
    }
    if (responseData.error && typeof responseData.error === "string") {
      return responseData.error.trim();
    }
    if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
      if (typeof responseData.errors[0] === "string") {
        const errorStrings = responseData.errors.filter(
          (e) => typeof e === "string",
        );
        if (errorStrings.length === 1 || errorStrings.join(", ").length < 80) {
          return errorStrings.join(", ");
        }
        return errorStrings[0];
      } else if (
        typeof responseData.errors[0] === "object" &&
        responseData.errors[0].message
      ) {
        return responseData.errors[0].message;
      }
    }

    // Priority 4: Details field (sometimes used for additional error info)
    if (responseData.details && typeof responseData.details === "string") {
      return responseData.details.trim();
    }
  } catch (er) {
    console.warn("Error extracting error message:", e);
  }
  return null;
}
function determineErrorMessage(error) {
  // Network error - no response from server
  if (!error.response) {
    if (error.code === "ECONNABORTED") {
      return "Request timed out. Please check your internet connection and try again.";
    }

    if (
      error.message === "Network Error" ||
      error.message?.includes("ENOTFOUND")
    ) {
      return "Unable to connect to the server. Please check your internet connection.";
    }

    if (error.code === "ECONNREFUSED") {
      return "Unable to reach the server. Please try again later.";
    }

    // Generic network error
    return "Network error. Please check your internet connection and try again.";
  }

  const status = error.response?.status;

  // Try to extract a meaningful message from the response
  const extractedMessage = extractErrorMessage(error);
  if (extractedMessage) {
    return extractedMessage;
  }

  // Fallback to HTTP status-specific message
  if (status && HTTP_STATUS_MESSAGES[status]) {
    return HTTP_STATUS_MESSAGES[status];
  }

  // Generic fallback
  return "An unexpected error occurred. Please try again.";
}
export function handleApiError(error, options = {}) {
  const { showToast = true, customMessage = null, logError = true } = options;

  // Determine the message to display
  let errorMessage = customMessage || determineErrorMessage(error);

  // Log error for debugging
  if (logError) {
    console.error("API Error:", {
      status: error.response?.status,
      message: errorMessage,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
  }

  // Show toast notification
  if (showToast && errorMessage) {
    toast.error(errorMessage, {
      duration: 4000,
      position: "top-right",
    });
  }

  // Return structured error info for programmatic handling
  return {
    message: errorMessage,
    status: error.response?.status,
    code: error.response?.data?.code,
    errors: error.response?.data?.errors,
    originalError: error,
  };
}

export function isValidationError(error) {
  return (
    error.response?.status === 400 &&
    Array.isArray(error.response?.data?.errors)
  );
}

export function isAuthError(error) {
  return error.response?.status === 401;
}

export function isPermissionError(error) {
  return error.response?.status === 403;
}

export function isNetworkError(error) {
  return !error.response;
}

export function isServerError(error) {
  const status = error.response?.status;
  return status >= 500 && status < 600;
}

export default handleApiError;
