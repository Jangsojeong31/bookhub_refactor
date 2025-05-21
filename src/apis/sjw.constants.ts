// constants.ts
// # URL 상수 정의

//& variable: URL 상수 //
const API_DOMAIN = 'http://localhost:8080';
// const API_DOMAIN = process.env.REACT_APP_API_DOMAIN || "http://localhost:8080";

//! 1. 책 관련 요청 베이스 URL
const BOOK_ADMIN_MODULE_URL = `${API_DOMAIN}/api/v1/admin/books`;
const BOOK_MANAGER_MODULE_URL = `${API_DOMAIN}/api/v1/manager/books`;
const BOOK_COMMON_MODULE_URL = `${API_DOMAIN}/api/v1/common/books`;

//? 책 관련 기능

// 책 생성
const POST_BOOK_URL = `${BOOK_ADMIN_MODULE_URL}`;

// 책 검색
const GET_BOOK_URL = `${BOOK_COMMON_MODULE_URL}`; 
// /${(검색기준): bookTitle, authorId, publisherId, categoryId, locationId, publishedDate, printCount, bookPrice, language };

// 책 수정
const PUT_BOOK_URL = (bookId : string) => `${BOOK_ADMIN_MODULE_URL}/${bookId}`;

// 책 삭제
const DELETE_BOOK_URL = (bookId : string) => `${BOOK_ADMIN_MODULE_URL}/${bookId}`;

//! 2. 재고 관련 요청 베이스 URL
const STOCK_ADMIN_MODULE_URL = `${BOOK_ADMIN_MODULE_URL}/stocks`;
const STOCK_MANAGER_MODULE_URL = `${BOOK_MANAGER_MODULE_URL}/stocks`;
const STOCK_COMMON_MODULE_URL = `${BOOK_COMMON_MODULE_URL}/stocks`;

//? 재고 관련 기능

// 재고 생성
const POST_STOCK_URL = `${STOCK_ADMIN_MODULE_URL}`;

// 재고 전체 조회
const GET_ALL_STOCK_URL = (branchId : number) => `${STOCK_COMMON_MODULE_URL}/${branchId}`;

// 재고 단건 조회
const GET_STOCK_URL = (branchId : number, stockId : number) => `${STOCK_COMMON_MODULE_URL}/${branchId}/${stockId}`;

// 책 재고 수량 변경
const PUT_STOCK_URL = (branchId : number, stockId : number) => `${STOCK_MANAGER_MODULE_URL}/${branchId}/${stockId}`;

//! 3. 카테고리 관련 요청 베이스 URL
const CATEGORY_ADMIN_MODULE_URL = `${BOOK_ADMIN_MODULE_URL}/categories`;

//? 카테고리 관련 기능

// 카테고리 생성
const POST_CATEGORY_URL = `${CATEGORY_ADMIN_MODULE_URL}`;

// 카테고리 전체 조회
const GET_CATEGORY_URL = `${CATEGORY_ADMIN_MODULE_URL}`;

// 카테고리 수정
const PUT_CATEGORY_URL = (categoryId : number) => `${CATEGORY_ADMIN_MODULE_URL}/${categoryId}`;

// 카테고리 삭제
const DELETE_CATEGORY_URL = (categoryId : number) => `${CATEGORY_ADMIN_MODULE_URL}/${categoryId}`;

//! 4. 수령 승인 관련 요청 베이스 URL
const RECEPTION_ADMIN_MODULE_URL = `${API_DOMAIN}/api/v1/admin/reception`;
const RECEPTION_MANAGER_MODULE_URL = `${API_DOMAIN}/api/v1/manager/reception`;

//? 수령 승인 관련 기능

// 수령 승인 / 수령 취소
const POST_RECEPTION_URL = (purchaseOrderApprovalId : number) => `${RECEPTION_MANAGER_MODULE_URL}/${purchaseOrderApprovalId}`;

// 수령 승인 로그 조회
const GET_RECEPTION_URL = `${RECEPTION_ADMIN_MODULE_URL}`;
// /${조회 기준} : bookReceptionApprovalId, employeeId, branchId, purchaseOrderApproalId, isReceptionApproved, receptionDateAt

//! 5. 알람 관련 요청 베이스 URL
const ALERT_COMMON_MODULE_URL = `${API_DOMAIN}/api/v1/common/alert`;

//? 알람 관련 기능

// 알람 조회
const GET_ALERT_URL = `${ALERT_COMMON_MODULE_URL}`;

// 알람 삭제
const DELETE_ALERT_URL = (alertId : number) => `${ALERT_COMMON_MODULE_URL}/${alertId}`;