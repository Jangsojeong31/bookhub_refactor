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
const BRANCH_MODULE_URL = `${ADMIN_MODULE_URL}/ branches`;

// 1) 지점 등록
const POST_BRANCH_URL = `${BRANCH_MODULE_URL}`;

// 2) 지점 조회
const GET_BRANCH_URL = `${BRANCH_MODULE_URL}`;

// 3) 지점 수정
const PUT_BRANCH_URL = (branchId: number) => `${BRANCH_MODULE_URL}/${branchId}`;

// 4) 지점 삭제
const DELETE_BRANCH_URL = (branchId: number) =>
  `${BRANCH_MODULE_URL}/${branchId}`;


//? 직원 관련 기능
const EMPLOYEE_MODULE_URL = `${ADMIN_MODULE_URL}/employees`;

// 1) 직원 전체 조회
const GET_ALL_EMPLOYEE_URL = `${EMPLOYEE_MODULE_URL}`;

// 2) 직원 단건 조회
const GET_EMPLOYEE_URL = (employeeId: number) =>
  `${EMPLOYEE_MODULE_URL}/${employeeId}`;

// 3) 직원 지점 수정
const PUT_EMPLOYEE_BRANCH_URL = (employeeId: number) =>
  `${EMPLOYEE_MODULE_URL}/${employeeId}/branch`;

// 4) 직원 직급 수정
const PUT_EMPLOYEE_POSITION_URL = (employeeId: number) =>
  `${EMPLOYEE_MODULE_URL}/${employeeId}/position`;

// 5) 직원 권한 수정
const PUT_EMPLOYEE_AUTHORITY_URL = (employeeId: number) =>
  `${EMPLOYEE_MODULE_URL}/${employeeId}/authority`;

// 6) 직원 퇴직 여부 수정
const PUT_EMPLOYEE_STATUS_URL = (employeeId: number) =>
  `${EMPLOYEE_MODULE_URL}/${employeeId}/status`;
// 7) 직원 회원가입 승인

const PUT_EMPLOYEE_APPROVE_URL = (employeeId: number) =>
  `${EMPLOYEE_MODULE_URL}/${employeeId}/approve`;


//? 로그 관련 기능
// 직원 수정 URL
const EMPLOYEE_CHANGE_LOGS_MODULE_URL = `${ADMIN_MODULE_URL}/employee-change-logs`;

// 퇴사자 URL
const EMPLOYEE_SIGN_UP_APRROVALS_MODULE_URL = `${ADMIN_MODULE_URL}/employee-signup-approvals`;

// 회원가입 승인 URL
const EMPLOYEE_EXIT_LOGS_MODULE_URL = `${ADMIN_MODULE_URL}/employee-exit-logs`;

// 1) 지점, 직급, 권한 변경 로그
const GET_ALL_EMPLOYEE_CHANGE_LOGS_URL = `${EMPLOYEE_CHANGE_LOGS_MODULE_URL}`;

// 2) 지점, 직급, 권한 변경 로그 조회 기준별
// 2-1) 로그 id로 조회
const GET_EMPLOYEE_CHANGE_LOGS_BY_ID_URL = (logId: string) =>
  `${EMPLOYEE_CHANGE_LOGS_MODULE_URL}/${logId}`;

// 2-2) 특정 조회 기준으로 조회(@RequestParam)
const GET_EMPLOYEE_CHANGE_LOGS_URL = (
  employeeId: number,
  changeType: string,
  changedAt: Date
) =>
  `${EMPLOYEE_CHANGE_LOGS_MODULE_URL}?employeeId=${employeeId}&changeType=${changeType}&changedAt=${changedAt}`;

// 3) 회원가입 승인 로그
const GET_ALL_EMPLOYEE_SIGN_UP_APRROVALS_URL = `${EMPLOYEE_SIGN_UP_APRROVALS_MODULE_URL}`;

// 4) 회원가입 승인 로그 조회 기준별
// 4-1) 로그 id로 조회
const GET_EMPLOYEE_SIGN_UP_APRROVALS_BY_ID_URL = (approvalId: string) =>
  `${EMPLOYEE_SIGN_UP_APRROVALS_MODULE_URL}/${approvalId}`;

// 4-2) 특정 조회 기준으로 조회(@RequestParam)
const GET_EMPLOYEE_SIGN_UP_APRROVALS_URL = (
  employeeId: number,
  authorizerId: number,
  status: string,
  approvedDeniedAt: Date
) =>
  `${EMPLOYEE_SIGN_UP_APRROVALS_MODULE_URL}?employeeId=${employeeId}&authorizerId=${authorizerId}&status=${status}&approvedDeniedAt=${approvedDeniedAt}`;

// 5) 직원 퇴사자 로그
const GET_ALL_EMPLOYEE_EXIT_LOGS_URL = `${EMPLOYEE_EXIT_LOGS_MODULE_URL}`;

// 6) 직원 퇴사자 로그 조회 기준별
// 6-1) 로그 id로 조회
const GET_EMPLOYEE_EXIT_LOGS_BY_ID_URL = (exitId: number) =>
  `${EMPLOYEE_EXIT_LOGS_MODULE_URL}/${exitId}`;

// 6-2) 특정 조회 기준으로 조회(@RequestParam)
const GET_EMPLOYEE_EXIT_LOGS_URL = (employeeId: string, exitAt: Date) =>
  `${EMPLOYEE_EXIT_LOGS_MODULE_URL}?employeeId=${employeeId}&exitAt=${exitAt}`;
