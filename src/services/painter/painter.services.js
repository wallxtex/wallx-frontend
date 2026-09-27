import { painterApis } from "../../utils/apis/endpoints/apiEndPoints";
import PrivateApi from "../../utils/apis/privateApi";
import ApiResponseMessage from "../../utils/apis/apiresponseMessage";

export async function getPainterDashboardData() {
    try {
        const response = await PrivateApi.get(painterApis.dashboard)
        return ApiResponseMessage.success(response.data)
    }
    catch (error) {
        return ApiResponseMessage.err(error)
    }
}
