import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getPolicies, deletePolicy, getPolicyDetail } from '@/apis/policy/policy';
import CreatePolicy from './CreatePolicy';
import UpdatePolicy from './UpdatePolicy';
import { PolicyDetailResponseDto, PolicyListResponseDto } from '@/dtos/policy/policy.response.dto';
import { PolicyType } from '@/apis/enums/PolicyType';
import '@/views/publisher/publisher.css'

const PAGE_SIZE = 10;

const PolicyPage: React.FC = () => {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const [type, setType] = useState<PolicyType | ''>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [policies, setPolicies] = useState<PolicyListResponseDto[]>([]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyListResponseDto | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  // 리스트 조회
  const fetchPage = async (page: number) => {
    if (!accessToken) return;
    try {
      const res = await getPolicies(
        accessToken,
        page,
        PAGE_SIZE,
        keyword.trim() || undefined,
        type || undefined,
        startDate || undefined,
        endDate || undefined
      );

      if (res.code === 'SU' && res.data) {
        const data = res.data;
        if ('content' in data) {
          setPolicies(data.content);
          setTotalPages(data.totalPages);
          setCurrentPage(data.currentPage);
        } else {
          setPolicies(data as PolicyListResponseDto[]);
          setTotalPages(1);
          setCurrentPage(0);
        }
      } else {
        console.error('목록 조회 실패:', res.message);
      }
    } catch (err) {
      console.error('목록 조회 예외:', err);
    }
  };

  useEffect(() => {
    fetchPage(0);
  }, [accessToken, keyword, type, startDate, endDate]);

  // 삭제
  const handleDelete = async (id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    if (!accessToken) return;
    try {
      const res = await deletePolicy(id, accessToken);
      if (res.code === 'SU') {
        const isLast = policies.length === 1 && currentPage > 0;
        fetchPage(isLast ? currentPage - 1 : currentPage);
      } else {
        alert(res.message || '삭제 실패');
      }
    } catch (err) {
      console.error('삭제 예외:', err);
      alert('삭제 중 오류 발생');
    }
  };

  // 수정 모달 열기
  const openUpdate = (policy: PolicyListResponseDto) => {
    setSelectedPolicy(policy);
    setIsUpdateOpen(true);
  };



// state 추가
const [selectedDetail, setSelectedDetail] = useState<PolicyDetailResponseDto | null>(null);

// openUpdateModal 수정
const openUpdateModal = async (id: number) => {
  if (!accessToken) return;
  const res = await getPolicyDetail(id, accessToken);
  if (res.code === 'SU' && res.data) {
    setSelectedDetail(res.data);
    setIsUpdateOpen(true);
  } else {
    alert(res.message || '상세 조회 실패');
  }
};

  // 수정 닫기
  const handleUpdateClose = () => {
    setSelectedPolicy(null);
    setIsUpdateOpen(false);
  };

  // 수정 완료 콜백
  const handleUpdated = () => {
    handleUpdateClose();
    fetchPage(currentPage);
  };

  // 페이지 이동
  const goToPage = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    fetchPage(page);
  };

  return (
    <div className='publisher-page-container'>
      <div className='topBar'>
        <button onClick={() => setIsCreateOpen(true)} style={{ padding: '8px 16px', backgroundColor: '#4e7fff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          정책 등록
        </button>
      </div>

      {/* 필터 영역 */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <select value={type} onChange={e => setType(e.target.value as PolicyType)}>
          <option value="">전체</option>
          <option value={PolicyType.BOOK_DISCOUNT}>도서 할인</option>
          <option value={PolicyType.TOTAL_PRICE_DISCOUNT}>총 금액 할인</option>
          <option value={PolicyType.CATEGORY_DISCOUNT}>카테고리 할인</option>
        </select>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        <input
          type="text"
          placeholder="제목 검색"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && goToPage(0)}
          style={{ flex: 1 }}
        />
        <button onClick={() => goToPage(0)} style={{ padding: '4px 8px' }}>검색</button>
      </div>

      {/* 리스트 테이블 */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr>
            <th>정책 ID</th>
            <th>제목</th>
            <th>타입</th>
            <th>시작일</th>
            <th>종료일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {policies.map(p => (
            <tr key={p.policyId}>
              <td>{p.policyId}</td>
              <td>{p.policyTitle}</td>
              <td>{p.policyType}</td>
              <td>{p.startDate}</td>
              <td>{p.endDate}</td>
              <td>
                <button onClick={() => openUpdate(p.policyId)} style={{ marginRight: '8px' }}>수정</button>
                <button onClick={() => handleDelete(p.policyId)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button disabled={currentPage === 0} onClick={() => goToPage(currentPage - 1)}>이전</button>
        <span>{currentPage + 1} / {totalPages}</span>
        <button disabled={currentPage + 1 >= totalPages} onClick={() => goToPage(currentPage + 1)}>다음</button>
      </div>

      {/* 생성 모달 */}
      {isCreateOpen && (
        <CreatePolicy
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onCreated={() => fetchPage(currentPage)}
        />
      )}

      {/* 수정 모달 */}
    {isUpdateOpen && selectedDetail && (
  <UpdatePolicy
    isOpen={isUpdateOpen}
    onClose={handleUpdateClose}
    onUpdated={handleUpdated}
    policy={selectedDetail}     // 이제 DetailDto 타입!
  />
)}
    </div>
  );
};

export default PolicyPage;
