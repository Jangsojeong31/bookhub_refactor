import { SidebarMenu } from './types';

export const commonMenu: SidebarMenu[] = [
  {
    title: '지점별 판매 현황',
    submenu: [
      { label: '카테고리별 판매', path: '' },
      { label: '주간 판매 현황', path: '' },
      { label: '알림 관리 현황', path: '' },
    ],
  },
  {
    title: '재고검색',
    submenu: [
      { label: '재고 등록', path: '' },
      { label: '재고 현황', path: '' },
    ],
  },
  {
    title: '진열위치 관리',
    submenu: [
      { label: '진열위치 등록', path: '/branch/${branchId}/locations' },
      { label: '진열위치 조회', path: '' },
    ],
  },
  {
    title: '발주 하기',
    submenu: [
      { label: '발주서 작성', path: '/purchase-order/create' },
      { label: '조회/수정/삭제', path: '/purchase-order/else' },
    ],
  },
  {
    title: '수령 하기',
    submenu: [
      { label: '수령 내역 조회', path: 'reception/confirmed' },
      { label: '수령 확인', path: 'reception/pending' },
    ],
  },
  {
    title: '정책 조회',
    submenu: [
      { label: '도서별 정책 조회', path: '' },
      { label: '카테고리별 정책 조회', path: '' },
      { label: '금액단위별 정책 조회', path: '' },
    ],
  },
  {
    title: '베스트 셀러',
    submenu: [
      { label: '총합 베스트셀러', path: '/best-seller' },
      { label: '기간별 베스트셀러', path: '/best-seller/period' },
      { label: '카테고리별 베스트셀러', path: '/best-seller/category' },
    ],
  },
  {
    title: '도서검색',
    submenu: [
      { label: '통합 검색', path: '/books/search' },
    ],
  },
];
