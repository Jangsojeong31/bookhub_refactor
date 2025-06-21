import React, { useEffect } from "react";
import styles from "./Header.module.css";
import { logoutRequest } from "@/apis/auth/auth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEmployeeStore } from "@/stores/employee.store";
import AlertIcon from "@/apis/constants/AlertIcon";
import Employee from "@/views/employee";
import { GET_BRANCH_URL } from "@/apis";

export default function Header() {
  const [, , removeCookie] = useCookies(["accessToken"]);
  const logout = useEmployeeStore((state) => state.setLogout);
  const employee = useEmployeeStore((state) => state.employee);
  const clearEmployee = useEmployeeStore((state) => state.clearEmployee);

  const navigate = useNavigate();
  const onLogoutClick = async () => {
    await logoutRequest();
    removeCookie("accessToken", { path: "/" });
    clearEmployee();
    logout();
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
        <AlertIcon />
        <div>{employee?.branchName} {employee?.positionName} {employee?.employeeName}</div>
        <button onClick={onLogoutClick}>로그아웃</button>
      </div>
    </header>
  );
}
