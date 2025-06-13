import Sidebar from "./layouts/sidebar";
import Header from "./layouts/header";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CreateAuthor from "./views/author/CreateAuthor";
import ElseAuthor from "./views/author/ElseAuthor";
import SignUp from "./views/auth/SignUp";
import * as csy from "@/apis/constants/csy.constants";
import * as jsj from "@/apis/constants/jsj.constants";
import Publisher from "./views/publisher";
import { useCookies } from "react-cookie";
import { useEmployeeStore } from "./stores/employee.store";
import { useEffect } from "react";
import SignIn from "./views/auth/SignIn";
import { SIGN_IN_URL } from "./apis/constants/khj.constants";
import { GET_ALL_PUBLISHER_URL } from './apis';
import MainCommon from './views/main/MainCommon';

import Policy from './views/policy';

import CreatePurchaseOrder from "./views/purchaseOrder/CreatePurchaseOrder";
import Category from "./views/category";


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
              <Route path = "/main" element = {<MainCommon />} />
              <Route path="/auth/login" element={<SignIn />} />
              <Route path='/auth/sign-up' element={<SignUp />} />
              <Route path='/authors' element={<CreateAuthor />} />
              <Route path='/authors-else' element={<ElseAuthor />} />
              <Route path= '/publishers' element={<Publisher />} />

              <Route path= '/policies' element={<Policy />} />


              <Route path= '/purchase-orders' element={<CreatePurchaseOrder />} />
              <Route path= '/categories' element={<Category />} />

            </Routes>
          </main>
        </div>
      </div>
    </>
  )
}

export default App;
