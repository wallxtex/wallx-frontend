import ApiResponseMessage from "../../../utils/apis/apiresponseMessage";
import { adminApis } from "../../../utils/apis/endpoints/apiEndPoints";
import PrivateApi from "../../../utils/apis/privateApi";

async function adminDealerSignupStats() {
  try {
    const response = await PrivateApi.get(adminApis.dealerSignupStats);
    return ApiResponseMessage.success(response.data);
  } catch (er) {
    return ApiResponseMessage.err(er);
  }
}

async function adminDealerStats() {
  try {
    const response = await PrivateApi.get(adminApis.dealerStats);
    return ApiResponseMessage.success(response.data);
  } catch (er) {
    return ApiResponseMessage.err(er);
  }
}

async function adminDealerParticularIdDetail(dealerId) {
  try {
    const endpoint = adminApis.DealerParticularDetails.replace(":id", dealerId);
    alert("dealer")
    const response = await PrivateApi.get(endpoint);

    return ApiResponseMessage.success(response.data);
  } catch (er) {
    return ApiResponseMessage.err(er);
  }
}

export {
  adminDealerSignupStats,
  adminDealerStats,
  adminDealerParticularIdDetail,
};
