import React from 'react';
import Sidebar from './layouts/sidebar';
import Header from './layouts/header';
import { Route, Routes } from 'react-router-dom';
import CreateAuthor from './views/author/CreateAuthor';

function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* 메인 콘텐츠 영역: 사이드바 + 본문 */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '30px', overflowY: 'auto', minHeight: 0, minWidth: 0 }}>
          <h1>
            BookHub 메인 화면dfd
            <Routes>
              <Route path='author' element={<CreateAuthor />} />
            </Routes>
          </h1>
        </main>
      </div>
    </div>
  );
}

export default App;
