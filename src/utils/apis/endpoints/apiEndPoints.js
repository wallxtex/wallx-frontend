const painter = "/auth/painter";
const dealer = "/auth/dealer";
const admin = "/auth/admin";
const adminDashboardApis = "/admin/dealers";

const painterApis = {
  signup: `${painter}/signup-initiate`,
  verifyOtp: `${painter}/verify-otp`,
  login: `${painter}/login`,
  logout: `${painter}/logout`,
  refreshToken: `${painter}/refresh-token`,
  forgotPin: `${painter}/forgot-pin`,
  resetPin: `${painter}/reset-pin`,
};

const dealerApis = {
  signup: `${dealer}/signup-initiate`,
  verifyOtp: `${dealer}/verify-otp`,
  login: `${dealer}/login`,
  logout: `${dealer}/logout`,
  refreshToken: `${dealer}/refresh-token`,
  forgotPin: `${dealer}/forgot-pin`,
  resetPin: `${dealer}/reset-pin`,
};

const adminApis = {
  login: `${admin}/login`,
  logout: `${admin}/logout`,
  refreshToken: `${admin}/refresh-token`,
  addSchemes: "/admin/schemes",
  adminDashboardData: "admin/dashboard",
  allPainters: "admin/painters",
  DealerSignupDetails: adminDashboardApis,
  DealersPendingStatus: `${adminDashboardApis}/pending`,
  DealersRejected: `${adminDashboardApis}/rejected`,
  DealerApproval: `${adminDashboardApis}/:id/approval`,
  DealerParticularDetails: `${adminDashboardApis}/:id`,
  dealerStats:`${adminDashboardApis}/stats`,
  //dealer-management
  dealerSignupStats:`${adminDashboardApis}/signup-stats`,
  // Enquiry endpoints
  getEnquiries: "/admin/enquiries",
  getEnquiryStats: "/admin/enquiries/stats",

};

export { painterApis, dealerApis, adminApis };
