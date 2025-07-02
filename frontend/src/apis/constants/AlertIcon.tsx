import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getUnreadAlerts } from "@/apis/alert/alert";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import styles from "../alert/AlertIcon.module.css";

export default function AlertIcon() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [cookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnread = async () => {
      const token = cookies.accessToken;
      if (!token) return;

      const res = await getUnreadAlerts(token);
      if (res.code === "SU" && res.data) {
        setUnreadCount(res.data.length);
      }
    };

    fetchUnread();
  }, []);

  return (
    <div className={styles.alertContainer} onClick={() => navigate("/alerts")}>
      <Bell size={30} stroke="black" fill="orange" />
      {unreadCount > 0 && (
        <div className={styles.badge}>
          {unreadCount > 99 ? "99+" : unreadCount}
        </div>
      )}
    </div>
  );
}
