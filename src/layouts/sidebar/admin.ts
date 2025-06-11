import * as csy from '@/apis/constants/csy.constants';
import * as jsj from '@/apis/constants/jsj.constants';
import { SidebarMenu } from './types';

export const adminMenu: SidebarMenu[] = [
  {
    title: '책 정보관리',
    submenu: [
      { label: '작가 관리', path: jsj.POST_AUTHOR_URL },
      { label: '출판사 관리', path: csy.POST_PUBLISHER_URL },
      { label: '카테고리 관리', path: '' },
      { label: '책 등록', path: '' },
      { label: '책 수정 및 삭제', path: '' },
    ],
  },
  {
    title: '정책 관리',
    submenu: [
      { label: '정책 전체조회', path: '' },
      { label: '정책 등록', path: '' },
    ],
  },
  {
    title: '지점 관리',
    submenu: [
      { label: '지점 조회', path: '' },
      { label: '지점 등록 및 삭제', path: '' },
    ],
  },
  {
    title: '사원 관리',
    submenu: [
      { label: '로그인 승인', path: '' },
      { label: '사원정보 수정', path: '' },
      { label: '사원 정보 조회', path: '' },
      { label: '퇴사자 로그 조회', path: '' },
      { label: '회원정보 로그 조회', path: '' },
      { label: '회원가입승인 로그 조회', path: '' },
    ],
  },
  {
    title: '발주 승인',
    submenu: [
      { label: '발주 승인', path: '' },
      { label: '발주 승인 로그 확인', path: '' },
    ],
  },
  {
    title: '판매 통계',
    submenu: [
      { label: '주간 판매 통계', path: '' },
      { label: '월간 판매 통계', path: '' },
      { label: '연간 판매 통계', path: '' },
      { label: '할인항목별 판매 통계', path: '' },
    ],
  },
];
