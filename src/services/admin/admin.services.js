import { adminApis } from "../../utils/apis/endpoints/apiEndPoints";
import PrivateApi from "../../utils/apis/privateApi";
import ApiResponseMessage from "../../utils/apis/apiresponseMessage";

export async function getAdminDashboardData() {
    try {
        const response = await PrivateApi.get(adminApis.adminDashboardData)
        return ApiResponseMessage.success(response.data)
    }
    catch (error) {
        return ApiResponseMessage.err(error)
    }
}

export async function getAllPainters() {
    try {
        const response = await PrivateApi.get(adminApis.allPainters)
        return ApiResponseMessage.success(response.data)
    }
    catch (error) {
        return ApiResponseMessage.err(error)
    }
}

export async function addSchemes(payload) {
    try {
        const response = await PrivateApi.post(adminApis.addSchemes, payload);
        return ApiResponseMessage.success(response.data);
    } catch (error) {
        return ApiResponseMessage.err(error);
    }
}


export async function updateSchemes(id, payload) {
    try {
        const response = await PrivateApi.put(
            `${adminApis.addSchemes}/${id}`,
            payload
        )
        return ApiResponseMessage.success(response.data)
    }
    catch (error) {
        return ApiResponseMessage.err(error)
    }
}


export async function deleteSchemes(id) {
    try {
        const response = await PrivateApi.delete(
            `${adminApis.addSchemes}/${id}`
        )
        return ApiResponseMessage.success(response.data)
    }
    catch (error) {
        return ApiResponseMessage.err(error)
    }
}

