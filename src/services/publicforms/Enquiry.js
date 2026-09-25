import ApiResponseMessage from "../../utils/apis/apiresponseMessage";
import PrivateApi from "../../utils/apis/privateApi";
import { adminApis } from "../../utils/apis/endpoints/apiEndPoints";
import { notify } from "../../lib/notify";


async function getEnquiries(page = 1, limit = 20) {
  try {
    const response = await PrivateApi.get(adminApis.getEnquiries, {
      params: { page, limit },
    });
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch enquiries";
    notify.error(errorMessage);
    throw error;
  }
}

async function getEnquiryStats() {
  try {
    const response = await PrivateApi.get(adminApis.getEnquiryStats);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch enquiry stats";
    notify.error(errorMessage);
    throw error;
  }
}
export { getEnquiries, getEnquiryStats };