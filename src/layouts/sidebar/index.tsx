import React, { useState } from 'react';
import styles from './Sidebar.module.css';

const menuData = [
  {
    title: '지점별 판매 현황',
    submenu: ['카테고리별 판매 현황', '주간 판매 현황', '알림 관리 현황'],
  },
  {
    title: '재고검색',
    submenu: ['재고 등록', '재고 현황'],
  },
  {
    title: '진열위치 관리',
    submenu: ['진열위치 등록', '진열위치 조회'],
  },
  {
    title: '발주 하기',
    submenu: ['발주서 작성/전체조회', '단건조회/수정/삭제'],
  },
  {
    title: '수령 하기',
    submenu: ['수령 일자 확인[조회]', '수령 확인[수령확인하는 페이지]'],
  },
  {
    title: '정책 조회',
    submenu: ['도서별 정책 조회', '카테고리별 정책 조회', '금액단위별 정책 조회'],
  },
  {
    title: '베스트 셀러',
    submenu: ['주간 베스트셀러 조회', '월간 베스트셀러 조회',],
  },
  {
    title: '도서검색',
    submenu: ['전체 책 조회', '세부 검색',],
  },
];

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.menu}>
        {menuData.map((menu, idx) => (
          <div key={idx}>
            <div
              className={`${styles.menuItem} ${activeIndex === idx ? styles.active : ''}`}
              onClick={() => toggleMenu(idx)}
              tabIndex={-1} 
            >
              {menu.title}
            </div>
            <div
              className={styles.submenu}
              style={{
                maxHeight: activeIndex === idx ? `${menu.submenu.length * 40}px` : '0',
                padding: activeIndex === idx ? '15px 30px' : '0 30px',
              }}
            >
              {menu.submenu.map((sub, subIdx) => (
                <div className={styles.submenuItem} key={subIdx} tabIndex={-1} >
                  {sub}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.adminMode}>관리자 모드로 이동</div>
      </div>
    </div>
  );
}
