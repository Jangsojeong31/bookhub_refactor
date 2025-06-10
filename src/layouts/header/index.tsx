import React from 'react';
import styles from './Header.module.css';


export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/src/apis/constants/북허브_로고_배경제거_navy.png" alt="BookHub 로고" className={styles.logoImg} />
      </div>
      <div className={styles.headerInfo}>
        <div>부산 지점현황관리</div>
      </div>
    </header>
  );
}