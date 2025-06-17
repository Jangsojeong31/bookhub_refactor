// jsj.constants.ts
// # URL 상수 정의

import { PurchaseOrderStatus } from "@/dtos/purchaseOrderApproval/request/purchaseOrder-approve.request.dto";

const API_DOMAIN = 'http://localhost:8080';

const ADMIN = 'admin';
const MANAGER = 'manager';
const COMMON = 'common';

// & 1. authors 
// 베이스 URL
const AUTHOR_MODULE_URL = `${API_DOMAIN}/api/v1/admin/authors`; 

// 저자 등록
export const POST_AUTHOR_URL = `${AUTHOR_MODULE_URL}`;

// 저자 이메일 중복 체크
export const CHECK_DUPLICATE_AUTHOR_EMAIL = (authorEmail: string) => `${AUTHOR_MODULE_URL}/${authorEmail}`;

// 저자 전체 조회
export const GET_ALL_AUTHOR_URL = `${AUTHOR_MODULE_URL}`;

// 저자 단건 조회
export const GET_AUTHOR_URL = (authorId: number) => `${AUTHOR_MODULE_URL}/${authorId}`;

// 저자 이름으로 조회
export const GET_ALL_AUTHOR_BY_NAME_URL = (authorName: string) => `${AUTHOR_MODULE_URL}/author-name/${authorName}`;

// 저자 수정
export const PUT_AUTHOR_URL = (authorId: number) => `${AUTHOR_MODULE_URL}/${authorId}`;

// 저자 삭제
export const DELETE_AUTHOR_URL = (authorId: number) => `${AUTHOR_MODULE_URL}/${authorId}`;


// & 2. purchase_orders
// 베이스 URL
const PURCHASE_ORDER_MODULE_URL_MANAGER = `${API_DOMAIN}/api/v1/${MANAGER}/purchase-orders`;
const PURCHASE_ORDER_MODULE_URL_ADMIN = `${API_DOMAIN}/api/v1/${ADMIN}/purchase-orders`;

// 발주 요청서 작성
export const POST_PURCHASE_ORDER_URL = `${PURCHASE_ORDER_MODULE_URL_MANAGER}`;

// // 발주 요청서 전체 조회
// export const GET_ALL_PURCHASE_ORDER_URL = `${PURCHASE_ORDER_MODULE_URL_MANAGER}`;

// 발주 요청서 단건 조회
export const GET_PURCHASE_ORDER_URL = (purchaseOrderId: number) => `${PURCHASE_ORDER_MODULE_URL_MANAGER}/${purchaseOrderId}`;

// 발주 요청서 수정
export const PUT_PURCHASE_ORDER_URL = (purchaseOrderId: number) => `${PURCHASE_ORDER_MODULE_URL_MANAGER}/${purchaseOrderId}`;

// 발주 요청서 삭제
export const DELETE_PURCHASE_ORDER_URL = (purchaseOrderId: number) => `${PURCHASE_ORDER_MODULE_URL_MANAGER}/${purchaseOrderId}`;

// 발주 요청서 조건으로 조회 (발주 담당자, 책 제목, 승인 여부)
export const GET_PURCHASE_ORDER_BY_CRITERIA = (
  employeeName: string,
  bookTitle: string,
  purchaseOrderStatus: PurchaseOrderStatus | null
) => {
  const queryParams = new URLSearchParams();
  
  if (employeeName) queryParams.append("employeeName", employeeName);
  if (bookTitle) queryParams.append("bookTitle", bookTitle);
  if (purchaseOrderStatus) queryParams.append("purchaseOrderStatus", purchaseOrderStatus);

  console.log(queryParams.toString());
  
  return `${PURCHASE_ORDER_MODULE_URL_MANAGER}?${queryParams.toString()}`;
};


// & 3. purchase_order_approvals
// 베이스 URL
export const PURCHASE_APPROVAL_MODULE_URL = `${API_DOMAIN}/api/v1/${ADMIN}/purchase-order-approvals`;

// 발주 요청서 업데이트 (요청중인 발주 요청서만 전체 조회)
export const GET_ALL_PURCHASE_ORDER_REQUESTED_URL = `${PURCHASE_ORDER_MODULE_URL_ADMIN}/requested`;

// 발주 승인 / 승인 취소 (발주 요청서 수정)
export const PUT_PURCHASE_ORDER_STATUS_URL = (purchaseOrderId: number) => `${PURCHASE_ORDER_MODULE_URL_ADMIN}/approval/${purchaseOrderId}`;

// // 발주 승인 로그 전체 조회
// export const GET_ALL_PURCHASE_ORDER_APPROVAL_URL = `${PURCHASE_APPROVAL_MODULE_URL}`;

// 조회 기준으로 조회 (승인 담당자, 승인 여부)
export const GET_PURCHASE_ORDER_APPROVAL_BY_CRITERIA_URL = (
  employeeName?: string, isApproved?: boolean | null
) => {
  const queryParams = new URLSearchParams();
  
  if (employeeName) queryParams.append("employeeName", employeeName);
  if (isApproved === null) {
    queryParams.append("isApproved", "")
  } else {
    queryParams.append("isApproved", String(isApproved))
  }
  
  return `${PURCHASE_APPROVAL_MODULE_URL}?${queryParams.toString()}`;
};

// 일자로 조회
export const GET_PURCHASE_ORDER_APPROVAL_BY_DATE = (startDate: string, endDate: string) => {
  const queryParams = new URLSearchParams();

  if (startDate) queryParams.append("startDate", startDate);
  if (endDate) queryParams.append("endDate", endDate);

  return `${PURCHASE_APPROVAL_MODULE_URL}/date?${queryParams.toString()}`;
}

// & 그 외
// 베이스 URL
const CUSTOMER_ORDER_MODULE_URL_ADMIN = `${API_DOMAIN}/api/v1/${ADMIN}/statistics`;
const CUSTOMER_ORDER_MODULE_URL_MANAGER = `${API_DOMAIN}/api/v1/${MANAGER}/statistics`;
const CUSTOMER_ORDER_MODULE_URL_COMMON = `${API_DOMAIN}/api/v1/${COMMON}/statistics`;

// 1) 베스트셀러 조회
export const GET_BESTSELLER_URL = (startDate: Date, endDate: Date) => `${CUSTOMER_ORDER_MODULE_URL_COMMON}/best-seller?startDate=${startDate}&endDate=${endDate}`;

// 2) 베스트셀러작가 조회
export const GET_BESTSELLER_AUTHOR_URL = (startDate: Date, endDate: Date) => `${CUSTOMER_ORDER_MODULE_URL_COMMON}/best-seller?startDate=${startDate}&endDate=${endDate}`;

// 3) 할인항목별 판매데이터 조회
export const GET_CUSTOMER_ORDER_BY_DISCOUNT_URL = (policyId: number) => `${CUSTOMER_ORDER_MODULE_URL_ADMIN}/by-discount/${policyId}`;

// 4) 지점별 판매데이터 조회
export const GET_CUSTOMER_ORDER_BY_BRANCHID_URL = (branchId: number) => `${CUSTOMER_ORDER_MODULE_URL_MANAGER}/${branchId}`;
