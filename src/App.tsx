import Sidebar from "./layouts/sidebar";
import Header from "./layouts/header";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEmployeeStore } from "./stores/employee.store";
import { useEffect, useRef, useState } from "react";
import Main from "./views/main";
import Alert from "./views/alert";
import Auth from "./views/auth";
import Author from "./views/author";
import Book from "./views/book";
import Category from "./views/category";
import Employee from "./views/employee";
import Policy from "./views/policy";
import Publisher from "./views/publisher";
import PurchaseOrder from "./views/purchaseOrder";
import Reception from "./views/reception";

// import 'react-datepicker/dist/react-datepicker.css';
import SalesQuantityStatistics from "./views/statistics/salesQuantity-statistics";
import StockLog from "./views/stock-logs";
import Revenue from "./views/statistics/revenue";

import StockStatistics from "./views/statistics/stockstatistics";

import Branch from "./views/branch";
import AlertPage from "./views/alert/AlertPage";
import LocationPage from "./views/location/LocationPage";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "tokenExpiresAt",
  ]);
  const token = cookies.accessToken;
  const expiresAt = cookies.tokenExpiresAt
    ? new Date(cookies.tokenExpiresAt)
    : null;

  const navigate = useNavigate();
  const location = useLocation();
  const logout = useEmployeeStore((state) => state.setLogout);
  const setLogin = useEmployeeStore((state) => state.setLogin);
  const isLogin = useEmployeeStore((state) => state.isLogin);

  const hasShownLogoutAlertRef = useRef(false);

  useEffect(() => {
    const now = new Date();

    if (token && expiresAt && now > expiresAt) {
      handleLogout("세션이 만료되었습니다. 다시 로그인해주세요.");
      return;
    }

    if (token) {
      setLogin();
      hasShownLogoutAlertRef.current = false;
    } else {
      if (
        !location.pathname.startsWith("/auth") &&
        !hasShownLogoutAlertRef.current
      ) {
        handleLogout("로그아웃되었습니다.");
      }
    }
  }, [token, expiresAt, navigate, location.pathname]);

  useEffect(() => {
    if (token && expiresAt) {
      const timeout = expiresAt.getTime() - new Date().getTime();

      const timer = setTimeout(() => {
        handleLogout("세션이 만료되었습니다. 다시 로그인해주세요.");
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [token, expiresAt]);

  const handleLogout = (message: string) => {
    if (!hasShownLogoutAlertRef.current) {
      alert(message);
      hasShownLogoutAlertRef.current = true;
      localStorage.removeItem("sidebarActiveIndex");
      logout();
      removeCookie("accessToken");
      removeCookie("tokenExpiresAt");
      navigate("/auth/login");
    }
  };

  if (!isLogin) {
    return <Routes>{Auth()}</Routes>;
  }

  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          border: "none",
        }}
      >
        <Header />
        <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
          <Sidebar />
          <main
            style={{
              flex: 1,
              padding: "30px",
              minWidth: "1500px",
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/main" />} />
              {/* <Route path="/publishers" element={<Publisher />} /> */}
              <Route path="/alerts/*" element={<AlertPage />} />

              <Route path="/publishers/*" element={<Publisher />} />
              <Route path="/policies/*" element={<Policy />} />
              <Route path="/branch/locations" element={<LocationPage />} />
              <Route path="/stock-logs/*" element={<StockLog />} />
              <Route path="/statistics/revenue/*" element={<Revenue />} />
              <Route
                path="/statistics/stocks/*"
                element={<StockStatistics />}
              />
              {Main()}
              {/* {Alert()} */}

              {/* {Publisher()} */}

              {Book()}
              {Branch()}
              {/* {BookLocation() */}
              {Category()}
              {Reception()}
              {/*Policy()}
              {Publisher()}
              {StockStatistics()}
              {Stocks()} */}
              {Author()}
              {PurchaseOrder()}
              {SalesQuantityStatistics()}
              {Employee()}
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
