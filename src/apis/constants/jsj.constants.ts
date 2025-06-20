// jsj.constants.ts
// # URL 상수 정의

import { PurchaseOrderStatus } from "@/dtos/purchaseOrderApproval/request/purchaseOrder-approve.request.dto";
import { GrUserAdmin } from "react-icons/gr";

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
const BEST_SELLER_API = `${API_DOMAIN}/api/v1/${MANAGER}/statistics/sales-quantity/bestseller`;
const SALES_QUANTITY_API = `${API_DOMAIN}/api/v1/${ADMIN}/statistics/sales-quantity`;
const CUSTOMER_ORDER_MODULE_URL_COMMON = `${API_DOMAIN}/api/v1/${COMMON}/statistics`;

// 총합 베스트셀러
export const GET_TOP_100_BEST_SELLERS = `${BEST_SELLER_API}`;
// 기간별 베스트셀러 - 일주일
export const GET_WEEKLY_BEST_SELLERS = `${BEST_SELLER_API}/weekly`;
// 기간별 베스트셀러 - 한달
export const GET_MONTHLY_BEST_SELLERS = `${BEST_SELLER_API}/monthly`;
// 기간별 베스트셀러 - 일년
export const GET_YEARLY_BEST_SELLERS = `${BEST_SELLER_API}/yearly`;
// 카테고리별 베스트셀러
export const GET_BEST_SELLERS_BY_CATEGORY = (categoryId: number) => `${BEST_SELLER_API}/category/${categoryId}`;

// 판매량 차트
// 지점별
export const GET_SALES_QUANTITY_BY_BRANCH = `${SALES_QUANTITY_API}/branch`;
// 할인항목별
export const GET_SALES_QUANTITY_BY_DISCOUNT_POLICY = `${SALES_QUANTITY_API}/discount-policy;`
