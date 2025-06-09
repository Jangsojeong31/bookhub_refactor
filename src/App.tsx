import React from 'react';
import Sidebar from './layouts/sidebar';
import Header from './layouts/header';

function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* 메인 콘텐츠 영역: 사이드바 + 본문 */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '30px', overflowY: 'auto', minHeight: 0, minWidth: 0 }}>
          <h1>BookHub 메인 화면dfd</h1>
        </main>
      </div>
    </div>
  );
}

export default App;
