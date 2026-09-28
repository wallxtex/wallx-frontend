import PrivateApi from "../../utils/apis/privateApi";
import API from "../../utils/apis/api";


async function fetchDealerData(endpoint, errorMessage) {
    try {
        const response = await PrivateApi.get(endpoint);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error(errorMessage);
    } catch (error) {
        throw error;
    }
}

async function fetchPublicData(endpoint, errorMessage) {
    try {
        const response = await API.get(endpoint);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error(errorMessage);
    } catch (error) {
        throw error;
    }
}

export async function getDealerOrders() {
    return fetchDealerData("/dealers/orders", "Failed to fetch dealer orders");
}

export async function getDealerDashboardData() {
    return fetchDealerData("/dealers/dashboard", "Failed to fetch dealer dashboard data");
}

export async function getPublicData() {
    return fetchPublicData("/public/home", "Failed to fetch public data");
}