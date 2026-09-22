export const isValidToken = (token) => {
  if (typeof token !== "string") return false;
  const jwtPattern = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;
  return jwtPattern.test(token) && token.length < 10000;
};