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
import Stock from "./views/stocks"
import Revenue from "./views/statistics/revenue";

import StockStatistics from "./views/statistics/stockstatistics";

import Branch from "./views/branch";
import AlertPage from "./views/alert/AlertPage";
import LocationPage from "./views/location/LocationPage";

function App() {
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;
  const navigate = useNavigate();
  const logout = useEmployeeStore((state) => state.setLogout);
  const location = useLocation();
  const [hasShownLogoutAlert, setHasShownLogoutAlert] = useState(false);

  const setLogin = useEmployeeStore((state) => state.setLogin);
  const isLogin = useEmployeeStore((state) => state.isLogin);

  const hasShownLogoutAlertRef = useRef(false);

  useEffect(() => {
    if (token) {
      setLogin();
      hasShownLogoutAlertRef.current = false;
    } else {
      if (
        !location.pathname.startsWith("/auth") &&
        !hasShownLogoutAlertRef.current
      ) {
        alert("로그아웃되었습니다.");
        hasShownLogoutAlertRef.current = true;
        localStorage.removeItem("sidebarActiveIndex");
        logout();
        navigate("/auth/login");
      }
    }
  }, [token, navigate, location.pathname]);

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
              overflowY: "auto",
              minHeight: 0,
              minWidth: 0,
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/main" />} />
              {/* <Route path="/publishers" element={<Publisher />} /> */}
              <Route path="/alerts/*" element={<AlertPage />} />

              <Route path="/publishers/*" element={<Publisher />} />
              <Route path="/policies/*" element={<Policy />} />
              <Route
                path="/branch/locations"
                element={<LocationPage />}
              />
              <Route path="/stock-logs/*" element={<StockLog />} />
              <Route path="/stocks/*" element={<Stock />} />
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
