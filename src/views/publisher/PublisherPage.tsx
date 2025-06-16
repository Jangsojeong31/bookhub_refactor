// src/views/publisher/PublisherPage.tsx
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import CreatePublisherModalLauncher from './CreatePublisherModalLauncher';
import UpdatePublisher from './UpdatePublisher';
import {
  getPublishers,
  deletePublisher
} from '@/apis/publisher/publisher';
import { PublisherResponseDto } from '@/dtos/publisher/response/publisher.response.dto';
import { PageResponseDto } from '@/dtos/page-response.dto';
import './publisher.css';

const PublisherPage: React.FC = () => {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  // 페이징 상태
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState<number>(0);

  // 검색어
  const [search, setSearch] = useState<string>('');

  // 현재 화면에 보여줄 출판사 리스트
  const [publishers, setPublishers] = useState<PublisherResponseDto[]>([]);

  // 수정 모달 상태
  const [selectedPublisher, setSelectedPublisher] = useState<PublisherResponseDto | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);

  /**
   * page: 페이지 번호
   * keyword?: 검색어 (undefined 이면 페이징 조회)
   */
  const fetchPage = async (page: number, keyword?: string) => {
    if (!accessToken) return;
    try {
      const response = await getPublishers(accessToken, page, pageSize, keyword);
      if (response.code === 'SU' && response.data) {
        // response.data 가 PageResponseDto 인지 배열인지 분기
        if ('content' in response.data) {
          const pageData = response.data as PageResponseDto<PublisherResponseDto>;
          setPublishers(pageData.content);
          setTotalPages(pageData.totalPages);
          setCurrentPage(pageData.currentPage);
        } else {
          // 검색 결과(전체)인 경우
          const list = response.data as PublisherResponseDto[];
          setPublishers(list);
          setTotalPages(1);
          setCurrentPage(0);
        }
      } else {
        console.error('목록 조회 실패:', response.message);
      }
    } catch (err) {
      console.error('목록 조회 중 예외:', err);
    }
  };

  // accessToken 이 바뀌거나 search 가 바뀔 때마다 재조회
  useEffect(() => {
    fetchPage(0, search.trim() || undefined);
  }, [accessToken, search]);

  // 삭제 기능
  const onDelete = async (id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    if (!accessToken) return;
    try {
      const response = await deletePublisher(id, accessToken);
      if (response.code === 'SU') {
        // 삭제 후 빈 페이지라면 이전 페이지로
        if (publishers.length === 1 && currentPage > 0) {
          fetchPage(currentPage - 1, search.trim() || undefined);
        } else {
          fetchPage(currentPage, search.trim() || undefined);
        }
      } else {
        alert(response.message || '삭제 중 오류');
      }
    } catch (err) {
      console.error('삭제 중 예외:', err);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  // 수정 모달
  const openUpdateModal = (pub: PublisherResponseDto) => {
    setSelectedPublisher(pub);
    setIsUpdateOpen(true);
  };
  const handleUpdateClose = () => {
    setSelectedPublisher(null);
    setIsUpdateOpen(false);
  };
  const handleUpdated = async () => {
    handleUpdateClose();
    await fetchPage(currentPage, search.trim() || undefined);
  };

  // 페이지네이션
  const goToPage = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    fetchPage(page, search.trim() || undefined);
  };
  const goPrev = () => {
    if (currentPage > 0) goToPage(currentPage - 1);
  };
  const goNext = () => {
    if (currentPage < totalPages - 1) goToPage(currentPage + 1);
  };

  // 전체조회 (검색어 초기화)
  const onSearchAll = () => {
    setSearch('');
    fetchPage(0, undefined);
  };

  return (
    <div className="publisher-page-container">
      {/* 상단: 등록 버튼 + 검색창 */}
      <div className="topBar">
        <CreatePublisherModalLauncher onCreated={() => fetchPage(currentPage, search.trim() || undefined)} />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="검색할 출판사 이름을 입력하세요."
          className="search"
        />
      </div>

      {/* 테이블 */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: '60px' }}>번호</th>
              <th>출판사 이름</th>
              <th style={{ width: '120px' }}>작업</th>
            </tr>
          </thead>
          <tbody>
            {publishers.length === 0 ? (
              <tr>
                <td colSpan={3} className="gray-text">출판사 정보가 없습니다.</td>
              </tr>
            ) : (
              publishers.map((pub, idx) => (
                <tr key={pub.publisherId} className="tableheight">
                  <td>{currentPage * pageSize + idx + 1}</td>
                  <td>{pub.publisherName}</td>
                  <td>
                    <button className="modifyBtn" onClick={() => openUpdateModal(pub)}>수정</button>
                    <button className="deleteBtn" onClick={() => onDelete(pub.publisherId)}>삭제</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 + 전체조회 버튼 */}
      <div className="footer">
        <button className="pageBtn" onClick={goPrev} disabled={currentPage === 0}>{'<'}</button>
        {Array.from({ length: totalPages }, (_, i) => i).map(i => (
          <button
            key={i}
            className={`pageBtn${i === currentPage ? ' current' : ''}`}
            onClick={() => goToPage(i)}
          >
            {i + 1}
          </button>
        ))}
        <button className="pageBtn" onClick={goNext} disabled={currentPage >= totalPages - 1}>{'>'}</button>
        <span className="pageText">
          {totalPages > 0 ? `${currentPage + 1} / ${totalPages}` : '0 / 0'}
        </span>
        <button className="searchAll" onClick={onSearchAll}>전체 조회</button>
      </div>

      {/* 수정 모달 */}
      {isUpdateOpen && selectedPublisher && (
        <UpdatePublisher
          publisher={selectedPublisher}
          onClose={handleUpdateClose}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
};

export default PublisherPage;


// // src/views/publisher/PublisherPage.tsx

// // *src/views/publisher/PublisherPage.tsx
// import React, { useEffect, useState } from 'react';
// import { useCookies } from 'react-cookie';
// import CreatePublisherModalLauncher from './CreatePublisherModalLauncher';
// import UpdatePublisher from './UpdatePublisher';
// import {
//   getPublishers,
//   deletePublisher,
//   // getPublisherByName as searchPublisherByName
// } from '@/apis/publisher/publisher';
// import { PublisherResponseDto } from '@/dtos/publisher/response/publisher.response.dto';
// import { PageResponseDto } from '@/dtos/page-response.dto';
// import './publisher.css';

// const PublisherPage: React.FC = () => {
//   const [cookies] = useCookies(['accessToken']);
//   const accessToken = cookies.accessToken;

//   //* 페이징
//   const [currentPage, setCurrentPage] = useState<number>(0);
//   const pageSize = 10;
//   const [totalPages, setTotalPages] = useState<number>(0);

//   // *검색어
//   const [search, setSearch] = useState<string>('');

//   // *현재 페이지 콘텐츠 + 필터된 콘텐츠
//   const [pageContent, setPageContent] = useState<PublisherResponseDto[]>([]);
//   const [publishers, setPublishers] = useState<PublisherResponseDto[]>([]);

//   // 수정 모달 상태
//   const [selectedPublisher, setSelectedPublisher] = useState<PublisherResponseDto | null>(null);
//   const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);

//   // *1) 특정 페이지 데이터 조회
//   const fetchPage = async (page: number, keyword? : string) => {
//     if (!accessToken) return;
//     try {
//       const response = await getPublishers(accessToken, page, pageSize, keyword);
//       if (response.code === 'SU' && response.data) {
//         // const pageData = response.data as PageResponseDto<PublisherResponseDto>;
//         // setPageContent(pageData.content);
//         // setTotalPages(pageData.totalPages);
//         // setCurrentPage(pageData.currentPage);

//         // // 기본적으로 페이지 콘텐츠를 publishers에 세팅
//         // setPublishers(pageData.content);

//          // response.data 가 PageResponseDto 인지, T[] 인지 구분
//        if ('content' in response.data) {
//          const pageData = response.data as PageResponseDto<PublisherResponseDto>;
//         setPageContent(pageData.content);
//          setPublishers(   pageData.content);
//          setTotalPages(pageData.totalPages);
//           setCurrentPage(pageData.currentPage);
//       } else {
//           // 검색 결과(배열)인 경우
//           const list = response.data as PublisherResponseDto[];
//          setPageContent(list);
//           setPublishers(list);
//           setTotalPages(1);
//           setCurrentPage(0);
//       } 
//       }
//     } catch (err) {
//       console.error('목록 조회 중 예외:', err);
//     }
//   };

//   // *초기 마운트 시 첫 페이지 불러오기
//   // useEffect(() => {
//   //   fetchPage(0);
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [accessToken]);

//   useEffect(() => {
//     fetchPage(0, search.trim()|| undefined);

//   }, [accessToken,search]);

//   // // *2) 검색어 변경 시 백엔드 검색 호출
//   // useEffect(() => {
//   //   const keyword = search.trim();
//   //   if (!keyword) {
//   //     // 검색어 없으면 기존 페이지 콘텐츠 복원
//   //     setPublishers(pageContent);
//   //     setTotalPages(prev => prev);
//   //     setCurrentPage(prev => prev);
//   //     return;
//   //   }

//   //   (async () => {
//   //     if (!accessToken) return;
//   //     try {
//   //       const res = await searchPublisherByName(keyword, accessToken);
//   //       if (res.code === 'SU' && res.data) {
//   //         // 전체 검색 결과를 한 페이지로 보여줌
//   //         setPublishers(res.data);
//   //         setTotalPages(1);
//   //         setCurrentPage(0);
//   //       } else {
//   //         console.error('검색 실패:', res.message);
//   //       }
//   //     } catch (err) {
//   //       console.error('검색 중 예외:', err);
//   //     }
//   //   })();
//   // }, [search, accessToken, pageContent]);

//   // // 3) 삭제 기능
//   // const onDelete = async (id: number) => {
//   //   if (!window.confirm('정말 삭제하시겠습니까?')) return;
//   //   if (!accessToken) return;

//   //   try {
//   //     const response = await deletePublisher(id, accessToken);
//   //     if (response.code === 'SU') {
//   //       // 페이지 리로드
//   //       if (publishers.length === 1 && currentPage > 0) {
//   //         fetchPage(currentPage - 1);
//   //       } else {
//   //         fetchPage(currentPage);
//   //       }
//   //     } else {
//   //       alert(response.message || '삭제 중 오류');
//   //     }
//   //   } catch (err) {
//   //     console.error('삭제 중 예외:', err);
//   //     alert('삭제 중 오류가 발생했습니다.');
//   //   }
//   // };

//   // 4) 수정 모달
//   const openUpdateModal = (pub: PublisherResponseDto) => {
//     setSelectedPublisher(pub);
//     setIsUpdateOpen(true);
//   };
//   const handleUpdateClose = () => {
//     setIsUpdateOpen(false);
//     setSelectedPublisher(null);
//   };
//   const handleUpdated = async () => {
//     handleUpdateClose();
//     await fetchPage(currentPage);
//   };

//   // 5) 페이지네이션
//   const goToPage = (page: number) => {
//     if (page < 0 || page >= totalPages) return;
//     fetchPage(page, search.trim() || undefined);
//   };
//   const goPrev = () => {
//     if (currentPage > 0) fetchPage(currentPage - 1, search.trim() || undefined);
//   };
//   const goNext = () => {
//     if (currentPage < totalPages - 1) fetchPage(currentPage + 1, search.trim() || undefined);
//   };

//   // 6) 전체 조회 버튼
//   const onSearchAll = () => {
//     setSearch('');
//     fetchPage(0, undefined);
//   };

//   return (
//     <div className="publisher-page-container">
//       {/* 상단: 등록 버튼 + 검색창 */}
//       <div className="topBar">
//         <CreatePublisherModalLauncher onCreated={() => fetchPage(currentPage)} />
//         <input
//           type="text"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           placeholder="검색할 출판사 이름을 입력하세요."
//           className="search"
//         />
//       </div>

//       {/* 테이블 */}
//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th style={{ width: '60px' }}>번호</th>
//               <th>출판사 이름</th>
//               <th style={{ width: '120px' }}>작업</th>
//             </tr>
//           </thead>
//           <tbody>
//             {publishers.length === 0 ? (
//               <tr>
//                 <td colSpan={3} className="gray-text">출판사 정보가 없습니다.</td>
//               </tr>
//             ) : (
//               publishers.map((pub, idx) => (
//                 <tr key={pub.publisherId} className="tableheight">
//                   <td>{currentPage * pageSize + idx + 1}</td>
//                   <td>{pub.publisherName}</td>
//                   <td>
//                     <button className="modifyBtn" onClick={() => openUpdateModal(pub)}>수정</button>
//                     <button className="deleteBtn" onClick={() => onDelete(pub.publisherId)}>삭제</button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 페이지네이션 + 전체조회 버튼 */}
//       <div className="footer">
//         <button className="pageBtn" onClick={goPrev} disabled={currentPage === 0}>{'<'}</button>
//         {Array.from({ length: totalPages }, (_, i) => i).map(i => (
//           <button
//             key={i}
//             className={`pageBtn${i === currentPage ? ' current' : ''}`}
//             onClick={() => goToPage(i)}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button className="pageBtn" onClick={goNext} disabled={currentPage >= totalPages - 1}>{'>'}</button>
//         <span className="pageText">
//           {totalPages > 0 ? `${currentPage + 1} / ${totalPages}` : '0 / 0'}
//         </span>
//         <button className="searchAll" onClick={onSearchAll}>전체 조회</button>
//       </div>

//       {/* 수정 모달 */}
//       {isUpdateOpen && selectedPublisher && (
//         <UpdatePublisher
//           publisher={selectedPublisher}
//           onClose={handleUpdateClose}
//           onUpdated={handleUpdated}
//         />
//       )}
//     </div>
//   );
// };

// export default PublisherPage;

