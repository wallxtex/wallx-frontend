export const ROLES = Object.freeze({
  ADMIN: 'admin',
  PAINTER: 'painter',
  DEALER: 'dealer',
});

/**
 * Default home routes for each role
 * Used to redirect users to their appropriate dashboard
 */
export const ROLE_HOME_ROUTES = Object.freeze({
  [ROLES.ADMIN]: '/admin/dashboard',
  [ROLES.PAINTER]: '/painter-portal/dashboard',
  [ROLES.DEALER]: '/dealer/dashboard',
});
