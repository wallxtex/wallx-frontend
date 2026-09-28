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

export async function getCouponStats() {
    try {
        const response = await PrivateApi.get(adminApis.getCouponStats);
        return ApiResponseMessage.success(response.data);
    } catch (error) {
        return ApiResponseMessage.err(error);
    }
}

export async function generateCoupons(payload) {
    try {
        const response = await PrivateApi.post(adminApis.generateCoupons, payload);
        return ApiResponseMessage.success(response.data);
    } catch (error) {
        return ApiResponseMessage.err(error);
    }
}

export async function getCouponBatches(params = {}) {
    try {
        const response = await PrivateApi.get(adminApis.getCouponBatches, { params });
        return ApiResponseMessage.success(response.data);
    } catch (error) {
        return ApiResponseMessage.err(error);
    }
}

export async function getCouponsByBatch(batchId, params = {}) {
    try {
        const url = adminApis.getCouponsByBatch.replace(':batchId', batchId);
        const response = await PrivateApi.get(url, { params });
        return ApiResponseMessage.success(response.data);
    } catch (error) {
        return ApiResponseMessage.err(error);
    }
}

export async function downloadCouponBatchPdf(batchId) {
    try {
        const url = adminApis.downloadCouponBatchPdf.replace(':batchId', batchId);
        const response = await PrivateApi.get(url, { responseType: 'blob' });
        return response; // returning raw response for blob handling
    } catch (error) {
        return ApiResponseMessage.err(error);
    }
}

export async function getDealers(params = {}) {
    try {
        const response = await PrivateApi.get(adminApis.getDealers, { params });
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

export async function getDealerStats() {
    try {
        const response = await PrivateApi.get(adminApis.getDealerStats);
        return ApiResponseMessage.success(response.data);
    } catch (error) {
        return ApiResponseMessage.err(error);
    }
}

export async function getDealerDetails(id, params = {}) {
    try {
        const url = adminApis.DealerParticularDetails.replace(':id', id);
        const response = await PrivateApi.get(url, { params });
        return ApiResponseMessage.success(response.data);
    } catch (error) {
        return ApiResponseMessage.err(error);
    }
}

export async function addDealerOrder(id, payload) {
    try {
        const url = adminApis.addDealerOrder.replace(':id', id);
        const response = await PrivateApi.post(url, payload, { toast: false });
        return ApiResponseMessage.success(response.data);
    } catch (error) {
        return ApiResponseMessage.err(error);
    }
}

export async function updateOrderPayment(orderId, payload) {
    try {
        const url = adminApis.updateOrderPayment.replace(':orderId', orderId);
        const response = await PrivateApi.patch(url, payload, { toast: false });
        return ApiResponseMessage.success(response.data);
    } catch (error) {
        return ApiResponseMessage.err(error);
    }
}
