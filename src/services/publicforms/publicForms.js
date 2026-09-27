import API from "../../utils/apis/api";
import ApiResponseMessage from "../../utils/apis/apiresponseMessage";

//enquiry & // visit query
async function NeedHelpHandler(formdata) {
  try {
    const response = await API.post("/public/enquiry", formdata);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

async function VisitSiteHandler(formdata) {
  try {
    const response = await API.post("/public/enquiry", formdata);
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

async function getHomeDataHandler() {
  try {
    const response = await API.get("/public/home");
    return ApiResponseMessage.success(response.data);
  } catch (error) {
    return ApiResponseMessage.err(error);
  }
}

export { NeedHelpHandler, VisitSiteHandler, getHomeDataHandler };
