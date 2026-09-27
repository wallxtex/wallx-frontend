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

export async function addProducts(payload){
    try{
        const response = await PrivateApi.post(adminApis.addProducts,payload)
        return ApiResponseMessage.success(response.data)
    }
    catch(error){
        return ApiResponseMessage.err(error)
    }
}

export async function getAllProducts() {
    try {
        const response = await PrivateApi.get(adminApis.addProducts)
        return ApiResponseMessage.success(response.data)
    }
    catch (error) {
        return ApiResponseMessage.err(error)
    }
}

export async function editProduct(id,payload){
    try{
        const response=await PrivateApi.patch(
            `${adminApis.addProducts}/${id}`,
            payload
        )
        return ApiResponseMessage.success(response.data)
    }
    catch(error){
        return ApiResponseMessage.err(error)
    }
}

export async function deleteProduct(id){
    try{
        const response=await PrivateApi.delete(
            `${adminApis.addProducts}/${id}`
        )
        return ApiResponseMessage.success(response.data)
    }
    catch(error){
        return ApiResponseMessage.err(error)
    }
}

export async function addServices(payload){
    try{
        const response = await PrivateApi.post(adminApis.wallxServices,payload)
        return ApiResponseMessage.success(response.data)
    }
    catch(error){
        return ApiResponseMessage.err(error)
    }
}

export async function getAllServices() {
    try {
        const response = await PrivateApi.get(adminApis.wallxServices)
        return ApiResponseMessage.success(response.data)
    }
    catch (error) {
        return ApiResponseMessage.err(error)
    }
}

export async function editServices(id,payload){
    try{
        const response=await PrivateApi.patch(
            `${adminApis.wallxServices}/${id}`,
            payload
        )
        return ApiResponseMessage.success(response.data)
    }
    catch(error){
        return ApiResponseMessage.err(error)
    }
}

export async function deleteServices(id){
    try{
        const response=await PrivateApi.delete(
            `${adminApis.wallxServices}/${id}`
        )
        return ApiResponseMessage.success(response.data)
    }
    catch(error){
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

