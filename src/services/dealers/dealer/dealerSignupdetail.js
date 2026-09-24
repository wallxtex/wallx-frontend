import ApiResponseMessage from "../../../utils/apis/apiresponseMessage";
import PrivateApi from "../../../utils/apis/privateApi";
import { adminApis } from "../../../utils/apis/endpoints/apiEndPoints";
import { notify } from "../../../lib/notify";

async function DealerSignupDetails() {
  try {
    const response = await PrivateApi.get(adminApis.DealerSignupDetails);
    const result = ApiResponseMessage.success(response.data);
    return result;
  } catch (error) {
    const errorMessage =
    error.response?.data?.message || "Failed to fetch dealer details";
    notify.error(errorMessage);
    throw error;
  }
}
async function DealersPendingStatus() {
  try {
    const response = await PrivateApi.get(adminApis.DealersPendingStatus);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    const errorMessage =
    error.response?.data?.message || "Failed to fetch pending dealers";
    notify.error(errorMessage);
    throw error;
  }
}
async function DealersRejected() {
  try {
    const response = await PrivateApi.get(adminApis.DealersRejected);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch rejected dealers";
    notify.error(errorMessage);
    throw error;
  }
}

async function DealerApproval(dealerId, approvalData) {
  try {
    // Replace :id in the URL template with actual dealerId
    const url = adminApis.DealerApproval.replace(":id", dealerId);
    const response = await PrivateApi.patch(url, approvalData);

    // Show success toast
    const successMessage =
      response.data?.message ||
      (approvalData.status === "approved"
        ? "Dealer approved successfully"
        : "Dealer rejected successfully");
    notify.success(successMessage);

    return ApiResponseMessage.success(response.data);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update dealer status";
    notify.error(errorMessage);
    throw error;
  }
}
async function DealerParticularDetails(dealerId) {
  try {
    // Replace :id in the URL template with actual dealerId
    const url = adminApis.DealerParticularDetails.replace(":id", dealerId);
    const response = await PrivateApi.get(url);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch dealer details";
    notify.error(errorMessage);
    throw error;
  }
}

export {
  DealerSignupDetails,
  DealersPendingStatus,
  DealersRejected,
  DealerApproval,
  DealerParticularDetails,
};
