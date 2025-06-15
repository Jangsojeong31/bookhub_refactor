import Sidebar from "./layouts/sidebar";
import Header from "./layouts/header";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEmployeeStore } from "./stores/employee.store";
import { useEffect } from "react";
import Main from "./views/main";
import Alert from "./views/alert";
import Auth from "./views/auth";
import Author from "./views/author";
import Branch from "./views/branch/Branch";
import Book from "./views/book";
import Category from "./views/category";
import Employee from "./views/employee";
import Policy from './views/policy';
import Publisher from "./views/publisher";
import PurchaseOrder from "./views/purchaseOrder";
import Reception from "./views/reception";
import StockStatistics from "./views/statistics";


function App() {
  const [cookies ] = useCookies(["accessToken"]);

  const setLogin = useEmployeeStore((state) => state.setLogin); 
  const isLogin = useEmployeeStore((state) => state.isLogin);

  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (accessToken) {
      setLogin();
    }
  }, [cookies]);

  return (
    <>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', border: 'none' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '30px', overflowY: 'auto', minHeight: 0, minWidth: 0 }}>
            <Routes>
              <Route path = "/" element={<Navigate to = "/main"/>}/>
              {Main()}
              {/* {Alert()} */}
              {Auth()}
              {/* {Book()}
              {Branch()}
              {BookLocation()}
              {Category()}
              {Policy()}
              {Publisher()}
              {Reception()}
              {Reception()}
              {StockStatistics()}
              {Stocks()} */}
              {Author()}
              {PurchaseOrder()}
              {/* {Employee()} */}
            </Routes>
          </main>
        </div>
      </div>
    </>
  )
}

export default App;
