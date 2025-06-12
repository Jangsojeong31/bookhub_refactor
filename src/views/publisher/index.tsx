import React, { useEffect, useState } from 'react';
import { getPublishers, deletePublisher } from '@/apis/publisher/publisher';
import CreatePublisher from './CreatePublisher';
import UpdatePublisher from './UpdatePublisher';
import styles from './publisher.module.css';
import { PublisherResponseDto } from '@/dtos/publisher/response/publisher.response.dto';
import { ResponseDto } from '@/dtos';

function Publisher() {
  const [publishers, setPublishers] = useState<PublisherResponseDto[]>([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<PublisherResponseDto[]>([]);
  const [selectedPublisher, setSelectedPublisher] = useState<PublisherResponseDto | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  // ✅ 출판사 목록 불러오기
  const fetchPublishers = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    const response: ResponseDto<PublisherResponseDto[]> = await getPublishers(accessToken);
    if (response.code && response.data) {
      setPublishers(response.data);
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  // ✅ 검색 기능
  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(
      publishers.filter((p) => p.publisherName.toLowerCase().includes(lower))
    );
  }, [search, publishers]);

  // ✅ 삭제 기능
  const onDelete = async (id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    const response = await deletePublisher(id, accessToken);
    if (response.code) fetchPublishers();
  };

  return (
    <div>
      {/* 상단 버튼 + 검색창 */}
      <div className={styles.topBar}>
        <button className={styles.button} onClick={() => setIsCreateOpen(true)}>출판사 등록</button>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색할 출판사 이름을 입력하세요."
          className={styles.search}
        />
      </div>

      {/* 등록 모달 */}
      {isCreateOpen && (
        <CreatePublisher
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onCreated={fetchPublishers}
        />
      )}

      {/* 수정 모달 */}
      {isUpdateOpen && selectedPublisher && (
        <UpdatePublisher
          publisher={selectedPublisher}
          onClose={() => setIsUpdateOpen(false)}
          onUpdated={fetchPublishers}
        />
      )}

      {/* 목록 테이블 */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((pub, idx) => (
            <tr key={pub.publisherId}>
              <td>{idx + 1}</td>
              <td>{pub.publisherName}</td>
              <td>
                <button
                  className={styles.modifyBtn}
                  onClick={() => {
                    setSelectedPublisher(pub);
                    setIsUpdateOpen(true);
                  }}
                >
                  수정
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => onDelete(pub.publisherId)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 하단 페이지네이션 & 전체조회 */}
      <div className={styles.footer}>
        <button className={styles.pageBtn}>{'<'}</button>
        <span className={styles.pageText}>01 / 10</span>
        <button className={styles.pageBtn}>{'>'}</button>

        <button className={styles.searchAll} onClick={() => setSearch('')}>
          전체 조회
        </button>
      </div>
    </div>
  );
}

export default Publisher;





// import React, { useEffect, useState } from 'react';
// import { getPublishers, deletePublisher } from '@/apis/publisher/publisher';
// import CreatePublisher from './CreatePublisher';
// import UpdatePublisher from './UpdatePublisher';
// import styles from './publisher.module.css';
// import { PublisherListResponseDto, PublisherResponseDto } from '@/dtos/publisher/response/publisher.response.dto';
// import { ResponseDto } from '@/dtos';



// function Publisher() {
//   // 👉 타입 정확히 지정
//   const [publishers, setPublishers] = useState<PublisherResponseDto[]>([]);
//   const [search, setSearch] = useState('');
//   const [filtered, setFiltered] = useState<PublisherResponseDto[]>([]);
//   const [selectedPublisher, setSelectedPublisher] = useState<PublisherResponseDto | null>(null);
//   const [isCreateOpen, setIsCreateOpen] = useState(false);
//   const [isUpdateOpen, setIsUpdateOpen] = useState(false);

//   // ✅ 출판사 목록 불러오기
// const fetchPublishers = async () => {
//  const response: ResponseDto<PublisherResponseDto[]> = await getPublishers();
// if (response.code && response.data) {
//   setPublishers(response.data); // 바로 배열
// }
// };

//   useEffect(() => {
//     fetchPublishers();
//   }, []);

//   // ✅ 검색 기능
//   useEffect(() => {
//     const lower = search.toLowerCase();
//     setFiltered(
//       publishers.filter((p) =>
//         p.publisherName.toLowerCase().includes(lower)
//       )
//     );
//   }, [search, publishers]);

//   // ✅ 삭제 기능
//   const onDelete = async (id: number) => {
//     if (!window.confirm('정말 삭제하시겠습니까?')) return;
//     const response = await deletePublisher(id);
//     if (response.code) fetchPublishers();
//   };

//   return (
//     <div>
      
//       <div className='styles.topBar'>
//           <button className = {styles.button} onClick={() => setIsCreateOpen(true)}>출판사 등록</button>

//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="검색할 출판사 이름을 입력하세요."
//           className={styles.search}
//         />
      
//       </div>

//       {/* 등록 모달 */}
//    {isCreateOpen && (
//   <CreatePublisher
//     isOpen={isCreateOpen}
//     onClose={() => setIsCreateOpen(false)}
//     onCreated={fetchPublishers}
//   />
// )}


//       {/* 수정 모달 */}
//       {isUpdateOpen && selectedPublisher && (
//         <UpdatePublisher
//           publisher={selectedPublisher}
//           onClose={() => setIsUpdateOpen(false)}
//           onUpdated={fetchPublishers}
//         />
//       )}

//       {/* 목록 테이블 */}
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>이름</th>
//             <th>작업</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.map((pub) => (
//             <tr key={pub.publisherId}>
//               <td>{pub.publisherId}</td>
//               <td>{pub.publisherName}</td>
//               <td>
//                 <button className='modifyBtn'
//                   onClick={() => {
//                     setSelectedPublisher(pub);
//                     setIsUpdateOpen(true);
//                   }}
//                 >
//                   수정
//                 </button>
//                 <button className={styles.deleteBtn} onClick={() => onDelete(pub.publisherId)}>삭제</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className={styles.footer}>
//   <button className={styles.pageBtn}>{'<'}</button>
//   <span className={styles.pageText}>01 / 10</span>
//   <button className={styles.pageBtn}>{'>'}</button>

//   <button className={styles.searchAll}>전체 조회</button>
// </div>

//     </div>
//   );
// }

// export default Publisher;
