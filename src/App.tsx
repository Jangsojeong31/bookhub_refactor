import Sidebar from './layouts/sidebar';
import Header from './layouts/header';
import { Navigate, Route, Routes } from 'react-router-dom';
import CreateAuthor from './views/author/CreateAuthor';
import SignUp from './views/auth/SignUp';
import * as jsj from '@/apis/constants/jsj.constants';
import Publisher from './views/publisher';
import { GET_ALL_PUBLISHER_URL } from './apis';
import MainCommon from './views/main/MainCommon';

function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', border: 'none' }}>
      <Header />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '30px', overflowY: 'auto', minHeight: 0, minWidth: 0 }}>
            <Routes>
              <Route path = "/" element={<Navigate to = "/main"/>}/>
              <Route path = "/main" element = {<MainCommon />} />
              <Route path='auth/sign-up' element={<SignUp />} />
              <Route path='/authors' element={<CreateAuthor />} />
              <Route path= '/publishers' element={<Publisher />} />

            </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
