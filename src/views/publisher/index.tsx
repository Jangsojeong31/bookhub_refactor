import React, { useEffect, useState } from 'react';
import { getPublishers, deletePublisher } from '@/apis/publisher/publisher';
import CreatePublisher from './CreatePublisher';
import UpdatePublisher from './UpdatePublisher';
import styles from './publisher.module.css';
import { PublisherListResponseDto, PublisherResponseDto } from '@/dtos/publisher/response/publisher.response.dto';
import { ResponseDto } from '@/dtos';

function PublisherPage() {
  // 👉 타입 정확히 지정
  const [publishers, setPublishers] = useState<PublisherResponseDto[]>([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<PublisherResponseDto[]>([]);
  const [selectedPublisher, setSelectedPublisher] = useState<PublisherResponseDto | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  // ✅ 출판사 목록 불러오기
const fetchPublishers = async () => {
 const response: ResponseDto<PublisherResponseDto[]> = await getPublishers();
if (response.code && response.data) {
  setPublishers(response.data); // 바로 배열
}
};

  useEffect(() => {
    fetchPublishers();
  }, []);

  // ✅ 검색 기능
  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(
      publishers.filter((p) =>
        p.publisherName.toLowerCase().includes(lower)
      )
    );
  }, [search, publishers]);

  // ✅ 삭제 기능
  const onDelete = async (id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const response = await deletePublisher(id);
    if (response.code) fetchPublishers();
  };

  return (
    <div>
      <h2>출판사 관리</h2>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="출판사명 검색"
        />
        <button onClick={() => setIsCreateOpen(true)}>출판사 등록</button>
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
          {filtered.map((pub) => (
            <tr key={pub.publisherId}>
              <td>{pub.publisherId}</td>
              <td>{pub.publisherName}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedPublisher(pub);
                    setIsUpdateOpen(true);
                  }}
                >
                  수정
                </button>
                <button onClick={() => onDelete(pub.publisherId)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PublisherPage;
