// csy.constants.ts
// # URL 상수 정의

const API_DOMAIN = import.meta.env.REACT_APP_API_DOMAIN || "http://localhost:8080";


const ADMIN = 'admin';
const MANAGER = 'manager';
const COMMON = 'common';

// & 1. publishers
// 베이스 URL
const PUBLISHER_MODULE_URL = `${API_DOMAIN}/api/v1/${ADMIN}/publishers`;
//const PUBLISHER_MODULE_URL = `${API_DOMAIN}/api/v1/publishers`;

// 1) 출판사 등록
export const POST_PUBLISHER_URL = `${PUBLISHER_MODULE_URL}`;

// 2) 출판사 전체 조회
export const GET_ALL_PUBLISHER_URL = `${PUBLISHER_MODULE_URL}`;

// 3) 출판사 단건 조회
export const GET_PUBLISHER_URL = (publisherId: number) => `${PUBLISHER_MODULE_URL}/${publisherId}`;

// 4) 출판사 수정
export const PUT_PUBLISHER_URL = (publisherId: number) => `${PUBLISHER_MODULE_URL}/${publisherId}`;

// 5) 출판사 삭제
export const DELETE_PUBLISHER_URL = (publisherId: number) => `${PUBLISHER_MODULE_URL}/${publisherId}`;


// & 2.book_display_locations
// 베이스 URL
const LOCATION_URL_MANAGER = `${API_DOMAIN}/api/v1/${MANAGER}/{books}/{branchId}`;
const LOCATION_URL_COMMON = `${API_DOMAIN}/api/v1/${COMMON}/{books}/{branchId}`;

// 1) 지점별 진열위치 등록
const POST_LOCATION_URL = `${LOCATION_URL_MANAGER}`;

// 2) 지점별 진열위치 조회
const GET_LOCATION_URL = `${LOCATION_URL_COMMON}`;

// 3) 지점별 진열위치 수정
const PUT_LOCATION_URL = (LocationId: number) => `${LOCATION_URL_MANAGER}/${LocationId}`;

// 4) 지점별 진열위치 삭제
const DELETE_LOCATION_URL = (LocationId: number) => `${LOCATION_URL_MANAGER}/${LocationId}`;



// & 3. discount_policies
// 베이스 URL
const POLICY_URL_ADMIN = `${API_DOMAIN}/api/v1/${ADMIN}/policies`;

// 1) 이벤트 생성
const POST_POLICY_URL = `${POLICY_URL_ADMIN}`;

//2) 이벤트 전체 조회
const GET_ALL_POLICIES_URL = `${POLICY_URL_ADMIN}`;

//3) 이벤트 단건 조회
const GET_POLICY_URL = (PolicyId : number) => `${POLICY_URL_ADMIN}/${PolicyId}`;

//4) 이벤트 수정
const PUT_POLICY_URL = (PolicyId : number) => `${POLICY_URL_ADMIN}/${PolicyId}`;

//5) 이벤트 삭제
const DELETE_POLICY_URL = (PolicyId : number) => `${POLICY_URL_ADMIN}/${PolicyId}`;




// & 그 외
// 베이스 URL
const CUSTOMER_ORDER_MODULE_URL_ADMIN = `${API_DOMAIN}/api/v1/${ADMIN}/statistics`;
const CUSTOMER_ORDER_MODULE_URL_MANAGER = `${API_DOMAIN}/api/v1/${MANAGER}/statistics`;
const CUSTOMER_ORDER_MODULE_URL_COMMON = `${API_DOMAIN}/api/v1/${COMMON}/statistics`;

// 1) 주간 베스트셀러 조회
const GET_BESTSELLER_WEEKLY_URL = (startDate: Date, endDate: Date) => `${CUSTOMER_ORDER_MODULE_URL_ADMIN}/weekly?startDate=${startDate}&endDate=${endDate}`;

// 1) 월간 베스트셀러 조회
const GET_BESTSELLER_MONTHLY_URL = (startDate: Date, endDate: Date) => `${CUSTOMER_ORDER_MODULE_URL_ADMIN}/monthly?startDate=${startDate}&endDate=${endDate}`;

// 1) 연간 베스트셀러 조회
const GET_BESTSELLER_YEARLY_URL = (startDate: Date, endDate: Date) => `${CUSTOMER_ORDER_MODULE_URL_ADMIN}/yearly?startDate=${startDate}&endDate=${endDate}`;

// 3) 할인항목별 판매데이터 조회
const GET_CUSTOMER_ORDER_BY_DISCOUNT_URL = (policyId: number) => `${CUSTOMER_ORDER_MODULE_URL_COMMON}/by-category/${policyId}`;

