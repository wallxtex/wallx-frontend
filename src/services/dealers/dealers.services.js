import PrivateApi from "../../utils/privateApi";

export async function getDealerOrders(){
    try{
        const response=await PrivateApi.get("/dealers/orders")
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch dealer orders");
        }
    }catch(error){
        throw error;
    }
}

export async function getDealerDashboardData(){
    try{
        const response=await PrivateApi.get("/dealers/dashboard")
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch dealer dashboard data");
        }
    }catch(error){
        throw error;
    }
}