// constants.ts
// # URL 상수 정의

//& variable: URL 상수 //
const API_DOMAIN = 'http://localhost:8080';
// const API_DOMAIN = process.env.REACT_APP_API_DOMAIN || "http://localhost:8080";

const ADMIN = 'admin';
const MANAGER = 'manager';
const COMMON = 'common';


//! 1. 책 관련 요청 베이스 URL
const BOOK_ADMIN_MODULE_URL = `${API_DOMAIN}/api/v1/admin/books`;
const BOOK_COMMON_MODULE_URL = `${API_DOMAIN}/api/v1/common/books`;

//? 책 관련 기능

// 책 생성
export const POST_BOOK_URL = `${BOOK_ADMIN_MODULE_URL}`;

// 책 검색
export const GET_BOOK_URL = `${BOOK_COMMON_MODULE_URL}/search`; 
// /${(검색기준): bookTitle, authorId, publisherId, categoryId, locationId, publishedDate, printCount, bookPrice, language };

// 책 수정
export const UPDATE_BOOK_URL = (isbn : string) => `${BOOK_ADMIN_MODULE_URL}/${isbn}`;

// 책 숨김 처리
export const HIDE_BOOK_URL = (isbn : string) => `${BOOK_ADMIN_MODULE_URL}/hidden/${isbn}`;

//! 2. 재고 관련 요청 베이스 URL
// const STOCK_ADMIN_MODULE_URL = `${BOOK_ADMIN_MODULE_URL}/stocks`;
// const STOCK_MANAGER_MODULE_URL = `${BOOK_MANAGER_MODULE_URL}/stocks`;
// const STOCK_COMMON_MODULE_URL = `${BOOK_COMMON_MODULE_URL}/stocks`;

// //? 재고 관련 기능

// // 재고 생성
// export const POST_STOCK_URL = `${STOCK_ADMIN_MODULE_URL}`;

// // 재고 전체 조회
// export const GET_ALL_STOCK_URL = (branchId : number) => `${STOCK_COMMON_MODULE_URL}/${branchId}`;

// // 재고 단건 조회
// export const GET_STOCK_URL = (branchId : number, stockId : number) => `${STOCK_COMMON_MODULE_URL}/${branchId}/${stockId}`;

// // 책 재고 수량 변경
// export const PUT_STOCK_URL = (branchId : number, stockId : number) => `${STOCK_MANAGER_MODULE_URL}/${branchId}/${stockId}`;

//! 3. 카테고리 관련 요청 베이스 URL
const CATEGORY_MODULE_URL = `${API_DOMAIN}/api/v1/${ADMIN}/categories`;

//? 카테고리 관련 기능

// 카테고리 생성
export const POST_CATEGORY_URL = `${CATEGORY_MODULE_URL}`;

// 트리형 카테고리 전체 조회
export const GET_CATEGORY_TREE_URL = (type: "DOMESTIC" | "FOREIGN") =>
  `${CATEGORY_MODULE_URL}/tree?type=${type}`;

// 카테고리 수정
export const PUT_CATEGORY_URL = (categoryId : number) => `${CATEGORY_MODULE_URL}/${categoryId}`;

// 카테고리 삭제
export const DELETE_CATEGORY_URL = (categoryId : number) => `${CATEGORY_MODULE_URL}/${categoryId}`;

// 카테고리 ID로 연결된 할인정책 조회
export const GET_POLICY_BY_CATEGORYID_URL = (categoryId : number) => `${API_DOMAIN}/api/v1/${COMMON}/categories/${categoryId}/policy`

//! 4. 수령 승인 관련 요청 베이스 URL
const RECEPTION_ADMIN_MODULE_URL = `${API_DOMAIN}/api/v1/admin/reception`;
const RECEPTION_MANAGER_MODULE_URL = `${API_DOMAIN}/api/v1/manager/reception`;

//? 수령 승인 관련 기능

// 수령 확인 (지점 관리자가 확인 버튼 누를 시)
export const PUT_RECEPTION_URL = (purchaseOrderApprovalId : number) => `${RECEPTION_MANAGER_MODULE_URL}/approve/${purchaseOrderApprovalId}`;

// 수령 대기 목록 조회(지점 관리자 전용)
export const GET_PENDING_RECEPTION_URL = `${RECEPTION_MANAGER_MODULE_URL}/pending`;

// 수령 완료 목록 조회(지점 관리자)
export const GET_CONFIRMED_RECEPTION_URL = `${RECEPTION_MANAGER_MODULE_URL}/confirmed`

// 관리자가 수령 승인 내역 조회(모든 지점)
export const GET_ADMIN_RECEPTION_URL = `${RECEPTION_ADMIN_MODULE_URL}/logs`;

//! 5. 알람 관련 요청 베이스 URL
const ALERT_COMMON_MODULE_URL = `${API_DOMAIN}/api/v1/common/alerts`;

//? 알람 관련 기능

// // 알람 전체 조회
// export const GET_ALERT_URL = `${ALERT_COMMON_MODULE_URL}/all/{employeeId}`;

// 읽지 않은 알람 전체 조회
export const GET_UNREAD_ALERT_URL = `${ALERT_COMMON_MODULE_URL}/unread`;

// 알람 읽음 처리
export const PUT_ALERT_URL = `${ALERT_COMMON_MODULE_URL}/read`;