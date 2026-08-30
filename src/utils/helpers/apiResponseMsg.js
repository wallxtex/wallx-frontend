class ApiResponseMessage {
  constructor(success, data, error) {
    this.success = success;
    this.data = data;
    this.message =
      error?.response?.data?.message || error?.message || "Success";
    this.error = this.buildErrorObject(error);
  }

  buildErrorObject(error) {
    if (!error) {
      return null;
    }
    const responseData = error.response?.data;
    const errorMessage = responseData?.message || "No response message";
    const errorCode = responseData?.code || "NO_CODE";
    return {
      status: error.status,
      message: errorMessage,
      code: errorCode,
    };
  }
  static success(data) {
    return new ApiResponseMessage(true, data, null);
  }

  static err(error) {
    return new ApiResponseMessage(false, null, error);
  }
}
export default ApiResponseMessage;
