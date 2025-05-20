// jsj.constants.ts
// # URL 상수 정의

const API_DOMAIN = 'http://localhost:8080';

const ADMIN = 'admin';
const MANAGER = 'manager';
const COMMON = 'common';

// & 1. authors 
// 베이스 URL
const AUTHOR_MODULE_URL = `${API_DOMAIN}/api/v1/${ADMIN}/authors`;

// 1) 저자 등록
const POST_AUTHOR_URL = `${AUTHOR_MODULE_URL}`;

// 2) 저자 전체 조회
const GET_ALL_AUTHOR_URL = `${AUTHOR_MODULE_URL}`;

// 3) 저자 단건 조회
const GET_AUTHOR_URL = (authorId: number) => `${AUTHOR_MODULE_URL}/${authorId}`;

// 4) 저자 수정
const PUT_AUTHOR_URL = (authorId: number) => `${AUTHOR_MODULE_URL}/${authorId}`;

// 5) 저자 삭제
const DELETE_AUTHOR_URL = (authorId: number) => `${AUTHOR_MODULE_URL}/${authorId}`;



// & 2. publishers
// 베이스 URL
const PUBLISHER_MODULE_URL = `${API_DOMAIN}/api/v1/${ADMIN}/publishers`;

// 1) 출판사 등록
const POST_PUBLISHER_URL = `${PUBLISHER_MODULE_URL}`;

// 2) 출판사 전체 조회
const GET_ALL_PUBLISHER_URL = `${PUBLISHER_MODULE_URL}`;

// 3) 출판사 단건 조회
const GET_PUBLISHER_URL = (publisherId: number) => `${PUBLISHER_MODULE_URL}/${publisherId}`;

// 4) 출판사 수정
const PUT_PUBLISHER_URL = (publisherId: number) => `${PUBLISHER_MODULE_URL}/${publisherId}`;

// 5) 출판사 삭제
const DELETE_PUBLISHER_URL = (publisherId: number) => `${PUBLISHER_MODULE_URL}/${publisherId}`;


// & 3. purchase_orders
// 베이스 URL
const PURCHASE_ORDER_MODULE_URL_MANAGER = `${API_DOMAIN}/api/v1/${MANAGER}/purchase-orders`;
const PURCHASE_ORDER_MODULE_URL_ADMIN = `${API_DOMAIN}/api/v1/${ADMIN}/purchase-orders`;

// 1) 발주 요청서 작성
const POST_PURCHASE_ORDER_URL = `${PURCHASE_ORDER_MODULE_URL_MANAGER}`;

// 2) 발주 요청서 전체 조회
const GET_ALL_PURCHASE_ORDER_URL = `${PURCHASE_ORDER_MODULE_URL_MANAGER}`;

// 3) 발주 요청서 단건 조회
const GET_PURCHASE_ORDER_URL = (purchaseOrderId: number) => `${PURCHASE_ORDER_MODULE_URL_MANAGER}/${purchaseOrderId}`;

// 4) 발주 요청서 수정
const PUT_PURCHASE_ORDER_URL = (purchaseOrderId: number) => `${PURCHASE_ORDER_MODULE_URL_MANAGER}/${purchaseOrderId}`;

// 5) 발주 요청서 삭제
const DELETE_PURCHASE_ORDER_URL = (purchaseOrderId: number) => `${PURCHASE_ORDER_MODULE_URL_MANAGER}/${purchaseOrderId}`;

// 6) 발주 승인 / 승인 취소 (발주 요청서 수정)
const PUT_PURCHASE_ORDER_STATUS_URL = (purchaseOrderId: number) => `${PURCHASE_ORDER_MODULE_URL_ADMIN}/status/${purchaseOrderId}`;


// & 4. purchase_order_approvals
// 베이스 URL
const PURCHASE_APPROVAL_MODULE_URL = `${API_DOMAIN}/api/v1/${ADMIN}/purchase-approvals`;

// 1) 발주 승인 로그 전체 조회
const GET_ALL_PURCHASE_ORDER_APPROVAL_URL = `${PURCHASE_APPROVAL_MODULE_URL}`;

// 2) 발주 승인 로그 단건 조회
// 2-1) id로 조회
const GET_PURCHASE_ORDER_APPROVAL_BY_ID_URL = (purchaseOrderApprovalId: number) => `${PURCHASE_APPROVAL_MODULE_URL}/${purchaseOrderApprovalId}`;
// 2-2) 특정 조회 기준으로 조회(@RequestParam)
const GET_PURCHASE_ORDER_APPROVAL_URL = (approvedDateAt: Date, employeeId: number, isApproved: boolean, purchaseOrderId: number) => `${PURCHASE_APPROVAL_MODULE_URL}?approvedDateAt=${approvedDateAt}&employeeId=${employeeId}&isApproved=${isApproved}&purchaseOrderId=${purchaseOrderId}`;
// 조회 기준: approvedDateAt, employeeId, isApproved, purchaseOrderId


// & 그 외
// 베이스 URL
const CUSTOMER_ORDER_MODULE_URL_MANAGER = `${API_DOMAIN}/api/v1/${MANAGER}/customer-orders`;
const CUSTOMER_ORDER_MODULE_URL_COMMON = `${API_DOMAIN}/api/v1/${COMMON}/customer-orders`;

// 1) 베스트셀러작가 조회
const GET_BESTSELLER_URL = (startDate: Date, endDate: Date) => `${CUSTOMER_ORDER_MODULE_URL_COMMON}/best-seller?startDate=${startDate}&endDate=${endDate}`;

// 2) 할인항목별 판매데이터 조회
const GET_CUSTOMER_ORDER_BY_DISCOUNT_URL = (policyId: number) => `${CUSTOMER_ORDER_MODULE_URL_COMMON}/by-discount/${policyId}`;

// 3) 지점별 판매데이터 조회
const GET_CUSTOMER_ORDER_BY_BRANCHID_URL = (branchId: number) => `${CUSTOMER_ORDER_MODULE_URL_MANAGER}/${branchId}`;
