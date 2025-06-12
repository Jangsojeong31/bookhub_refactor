import Sidebar from './layouts/sidebar';
import Header from './layouts/header';
import { Route, Routes } from 'react-router-dom';
import CreateAuthor from './views/author/CreateAuthor';
import SignUp from './views/auth/SignUp';
import * as csy from '@/apis/constants/csy.constants';
import * as jsj from '@/apis/constants/jsj.constants';
import Publisher from './views/publisher';

function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', border: 'none' }}>
      <Header />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '30px', overflowY: 'auto', minHeight: 0, minWidth: 0 }}>
            <Routes>
              <Route path='author' element={<CreateAuthor />} />
              <Route path='auth/sign-up' element={<SignUp />} />
              <Route path={jsj.POST_AUTHOR_URL} element={<CreateAuthor />} />
              <Route path='api/publishers' element={<Publisher />} />

            </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
