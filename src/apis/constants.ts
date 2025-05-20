const API_DOMAIN = "http://localhost:8080";

//! 1) 인증 관련 요청 URL
const AUTH_MODULE_URL = `${API_DOMAIN}/api/v1/auth`;

//? 인증 관련 기능
// 1) 회원 가입
const SIGN_UP_URL = `${AUTH_MODULE_URL}/signup`;
// 2) 로그인
const SIGN_IN_URL = `${AUTH_MODULE_URL}/login`;
// 3) 아이디 찾기
const LOGIN_ID_FIND_URL = `${AUTH_MODULE_URL}/login-id-find`;
// 4) 비밀번호 변경
const PASSWORD_CHANGE_URL = `${AUTH_MODULE_URL}/password-change`;

//! 2) ADMIN 관련 요청 URL
const ADMIN_MODULE_URL = `${API_DOMAIN}/api/v1/admin`;

//? 지점 관련 기능
// 1) 지점 등록
const POST_BRANCH_URL = `${ADMIN_MODULE_URL}/branches`;
// 2) 지점 조회
const GET_BRANCH_URL = `${ADMIN_MODULE_URL}/branches`;
// 3) 지점 수정
const PUT_BRANCH_URL = (branchId: number) =>
  `${ADMIN_MODULE_URL}/branches/${branchId}`;
// 4) 지점 삭제
const DELETE_BRANCH_URL = (branchId: number) =>
  `${ADMIN_MODULE_URL}/branches/${branchId}`;

//? 직원 관련 기능
// 1) 직원 전체 조회
const GET_ALL_EMPLOYEE_URL = `${ADMIN_MODULE_URL}/employees`;
// 2) 직원 단건 조회
const GET_EMPLOYEE_URL = (employeeId: number) =>
  `${ADMIN_MODULE_URL}/employees/${employeeId}`;
// 3) 직원 지점 수정
const PUT_EMPLOYEE_BRANCH_URL = (employeeId: number) =>
  `${ADMIN_MODULE_URL}/employees/${employeeId}/branch`;
// 4) 직원 직급 수정
const PUT_EMPLOYEE_POSITION_URL = (employeeId: number) =>
  `${ADMIN_MODULE_URL}/employees/${employeeId}/position`;
// 5) 직원 권한 수정
const PUT_EMPLOYEE_AUTHORITY_URL = (employeeId: number) =>
  `${ADMIN_MODULE_URL}/employees/${employeeId}/authority`;
// 6) 직원 퇴직 여부 수정
const PUT_EMPLOYEE_STATUS_URL = (employeeId: number) =>
  `${ADMIN_MODULE_URL}/employees/${employeeId}/status`;
// 7) 직원 회원가입 승인
const PUT_EMPLOYEE_APPROVE_URL = (employeeId: number) =>
  `${ADMIN_MODULE_URL}/employees/${employeeId}/approve`;

//? 로그 관련 기능
// 1) 지점, 직급, 권한 변경 로그
const GET_EMPLOYEE_CHANGE_LOGS_URL = `${ADMIN_MODULE_URL}/employee-change-logs`;
// 2) 회원가입 승인 로그
const GET_EMPLOYEE_SIGN_UP_APRROVALS_URL = `${ADMIN_MODULE_URL}/employee-signup-approvals`;
// 3) 직원 퇴사자 로그
const GET_EMPLOYEE_EXIT_LOGS_URL = `${ADMIN_MODULE_URL}/employee-exit-logs`;
