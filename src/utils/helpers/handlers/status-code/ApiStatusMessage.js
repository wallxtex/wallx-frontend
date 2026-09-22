
// Default error messages for HTTP status codes
const HTTP_STATUS_MESSAGES = {
  400: "Invalid request. Please check your input and try again.",
  401: "Your session has expired. Please log in again.",
  403: "You do not have permission to access this resource.",
  404: "The requested resource was not found.",
  409: "This action conflicts with existing data.",
  422: "Unprocessable entity. Please check your input.",
  429: "Too many requests. Please wait a moment and try again.",
  500: "Something went wrong on the server. Please try again later.",
  502: "Bad Gateway. The server is temporarily unavailable.",
  503: "Database connection failed. Please try again later.",
  504: "Gateway Timeout. The server is not responding. Please try again later.",
};

export default HTTP_STATUS_MESSAGES;