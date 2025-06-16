import React from "react";
import styles from "./Header.module.css";
import { logoutRequest } from "@/apis/auth/auth";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const onLogoutClick = async () => {
    await logoutRequest();
    document.cookie = "accessToken=; path=/; max-age=0";
    navigate("/auth/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src="/src/apis/constants/북허브_로고_배경제거_navy.png"
          alt="BookHub 로고"
          className={styles.logoImg}
        />
      </div>
      <div className={styles.headerInfo}>
        <div>부산 지점현황관리</div>
        <button onClick={onLogoutClick}>로그아웃</button>
      </div>
    </header>
  );
}
