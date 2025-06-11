import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { commonMenu } from './common';
import { adminMenu } from './admin';

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const navigate = useNavigate(); // 🔑 라우팅 기능 사용

  const toggleMenu = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  const menuData = isAdminMode ? adminMenu : commonMenu;

  return (
    <div className={styles.sidebar}>
      <div className={styles.menuWrapper}>
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
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                }}
              >
                {menu.submenu.map((sub, subIdx) => (
                  <div
                    className={styles.submenuItem}
                    key={subIdx}
                    tabIndex={-1}
                    onClick={() => navigate(sub.path)} 
                  >
                    {sub.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.modeChange} onClick={() => setIsAdminMode(prev => !prev)}>
          {isAdminMode ? '통합 모드로 이동' : '관리자 모드로 이동'}
        </div>
      </div>
    </div>
  );
}
