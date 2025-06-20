// 📄 admin.ts
import { SidebarMenu } from './types';

export const adminMenu: SidebarMenu[] = [
  {
    title: '책 정보관리',
    submenu: [
      { label: '작가 관리', path: '/author/create' },       // ✅ 수정
      { label: '출판사 관리', path: '/publishers' },   // ✅ 수정
      { label: '카테고리 관리', path: '/categories' }, // 추가 예정이면 빈 문자열 말고 대략 예상 경로라도!
      { label: '책 등록', path: '/books/create' },
      { label: '책 수정 및 삭제', path: '/books/edit' },
      { label: '책 로그', path: '/booklogs' },
    ],
  },
  {
    title: '정책 관리',
    submenu: [
      { label: '정책 전체조회', path: '/policies' },
      { label: '정책 등록', path: '/policies/create' },
    ],
  },
  {
    title: '지점 관리',
    submenu: [
      { label: '지점 조회', path: '/branches' },
      { label: '지점 등록 및 삭제', path: '/branches/manage' },
    ],
  },
  {
    title: '사원 관리',
    submenu: [
      { label: '로그인 승인', path: '/employees/approval' },
      { label: '사원정보 수정', path: '/employees/edit' },
      { label: '사원 정보 조회', path: '/employees' },
      { label: '퇴사자 로그 조회', path: '/employees/retired/logs' },
      { label: '회원정보 로그 조회', path: '/employees/logs' },
      { label: '회원가입승인 로그 조회', path: '/employees/approval/logs' },
    ],
  },
  {
    title: '발주 승인',
    submenu: [
      { label: '발주 승인', path: '/purchase-order/approve' },
      { label: '발주 승인 기록', path: '/purchase-order-approval' },
    ],
  },
  {
    title: '수령 확인 관리',
    submenu: [
      { label: '수령 확인 내역', path: '/reception/logs' },
    ],
  },
  {
    title: '판매 통계',
    submenu: [
      { label: '주간 판매 통계', path: '/sales-quantity/branch' },
      { label: '월간 판매 통계', path: '/stats/monthly' },
      { label: '연간 판매 통계', path: '/stats/yearly' },
      { label: '할인항목별 판매 통계', path: '/stats/by-discount' },
    ],
  },
];
