const API_DOMAIN = "http://localhost:8080";

const ADMIN = "admin";

const AUTH_MODULE_URL = `${API_DOMAIN}/api/v1/auth`;
export const SIGN_UP_URL = `${AUTH_MODULE_URL}/signup`;
export const SIGN_IN_URL = `${AUTH_MODULE_URL}/login`;
export const LOGIN_ID_FIND_EMAIL_URL = `${AUTH_MODULE_URL}/login-id-find/email`;
export const LOGIN_ID_FIND_URL = `${AUTH_MODULE_URL}/login-id-find`;
export const PASSWORD_CHANGE_EMAIL_URL = `${AUTH_MODULE_URL}/password-change/email`;
export const PASSWORD_CHANGE_URL = `${AUTH_MODULE_URL}/password-change`;
export const CHECK_LOGIN_ID_DUPLICATE = `${AUTH_MODULE_URL}/login-id-exists`;
export const LOGOUT_URL = `${AUTH_MODULE_URL}/logout`;
export const SIGN_UP_RESULT_URL = (approvalId: number) =>
  `${AUTH_MODULE_URL}/employees/${approvalId}/approve`;
export const EMPLOYEE_UPDATE_URL = `${AUTH_MODULE_URL}/employees/approve`;

const ADMIN_MODULE_URL = `${API_DOMAIN}/api/v1/${ADMIN}`;
const BRANCH_MODULE_URL = `${ADMIN_MODULE_URL}/branches`;
export const POST_BRANCH_URL = `${BRANCH_MODULE_URL}`;
export const GET_BRANCH_URL = `${AUTH_MODULE_URL}/branches`;
export const GET_BRANCH_DETAIL_URL = (branchId: number) =>
  `${BRANCH_MODULE_URL}/${branchId}`;
export const PUT_BRANCH_URL = (branchId: number) =>
  `${BRANCH_MODULE_URL}/${branchId}`;

const EMPLOYEE_MODULE_URL = `${ADMIN_MODULE_URL}/employees`;
export const GET_ALL_EMPLOYEE_URL = `${EMPLOYEE_MODULE_URL}`;
export const GET_EMPLOYEE_URL = (employeeId: number) =>
  `${EMPLOYEE_MODULE_URL}/${employeeId}`;
export const PUT_EMPLOYEE_CHANGE_URL = (employeeId: number) =>
  `${EMPLOYEE_MODULE_URL}/${employeeId}/organization`;
export const PUT_EMPLOYEE_STATUS_URL = (employeeId: number) =>
  `${EMPLOYEE_MODULE_URL}/${employeeId}/status`;
export const GET_PENDING_EMPLOYEE_URL = `${EMPLOYEE_MODULE_URL}/approval`;
export const PUT_EMPLOYEE_APPROVE_URL = (employeeId: number) =>
  `${EMPLOYEE_MODULE_URL}/${employeeId}/approve`;

const EMPLOYEE_CHANGE_LOGS_MODULE_URL = `${ADMIN_MODULE_URL}/employee-change-logs`;
const EMPLOYEE_SIGN_UP_APRROVALS_MODULE_URL = `${ADMIN_MODULE_URL}/employee-signup-approvals`;
const EMPLOYEE_EXIT_LOGS_MODULE_URL = `${ADMIN_MODULE_URL}/employee-exit-logs`;
export const GET_ALL_EMPLOYEE_CHANGE_LOGS_URL = `${EMPLOYEE_CHANGE_LOGS_MODULE_URL}`;
export const GET_ALL_EMPLOYEE_SIGN_UP_APRROVALS_URL = `${EMPLOYEE_SIGN_UP_APRROVALS_MODULE_URL}`;
export const GET_ALL_EMPLOYEE_EXIT_LOGS_URL = `${EMPLOYEE_EXIT_LOGS_MODULE_URL}`;
export const GET_ALL_POSITION_URL = `${AUTH_MODULE_URL}/positions`;
export const GET_ALL_AUTHORITY_URL = `${AUTH_MODULE_URL}/authorities`;