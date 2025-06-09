import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/src/bookHubLogo.png" alt="BookHub 로고" className={styles.logoImg} />
      </div>
      <div className={styles.headerInfo}>
        <div>부산 지점현황관리</div>
      </div>
    </header>
  );
}