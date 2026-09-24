import { adminApis } from "../../utils/apis/endpoints/apiEndPoints";
import PrivateApi from "../../utils/apis/privateApi";
import ApiResponseMessage from "../../utils/apis/apiresponseMessage";


export async function addSchemes(payload) {
    try {
        const response = await PrivateApi.post(adminApis.addSchemes, payload);
        return ApiResponseMessage.success(response.data);
    } catch (error) {
        return ApiResponseMessage.err(error);
    }
}



