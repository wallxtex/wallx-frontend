//painter
const painter = "/auth/painter";
const dealer = "/auth/dealer";
const admin = "/auth/admin";

const painterApis = {
  signup: `${painter}/signup-initiate`,
  verifyOtp: `${painter}/verify-otp`,
  login: `${painter}/login`,
  logout: `${painter}/logout`,
  refreshToken: `${painter}/refresh-token`,
  // forgotPin : `${painter}/painter`
};

const dealerApis = {
  signup: `${dealer}/signup-initiate`,
  verifyOtp: `${dealer}/verify-otp`,
  login: `${dealer}/login`,
  logout: `${dealer}/logout`,
  refreshToken: `${dealer}/refresh-token`,
};

const adminApis = {
  login: `${admin}/login`,
  logout: `${admin}/logout`,
  refreshToken: `${admin}/refresh-token`,
  addSchemes: 'admin/schemes'
};

export { painterApis, dealerApis, adminApis };
