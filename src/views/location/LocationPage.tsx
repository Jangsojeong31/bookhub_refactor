import React, { useEffect, useState } from 'react';

import CreateLocation from './CreateLocation';
import UpdateLocation from './UpdateLocation';
import styles from './location.module.css';
import { deleteLocation, getLocations } from '@/apis/location/location';
import { LocationResponseDto } from '@/dtos/location/location.response.dto';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Modal from '@/apis/constants/Modal';

export default function LocationPage() {
  // 1. 라우터 파라미터로 branchId 받기 (string → number 변환)
  const { branchId } = useParams<{ branchId: string }>();
  const branchIdNum = branchId ? Number(branchId) : 0;

  // 2. 쿠키에서 accessToken 가져오기
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  // 3. 상태 선언
  const [list, setList] = useState<LocationResponseDto[]>([]);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  // 4. 데이터 불러오기 함수
  const fetch = async () => {
    if (!branchIdNum || !accessToken) return; // 필수 값 체크
    try {
      const { data } = await getLocations(accessToken, branchIdNum, search);
      setList(data ?? []);
    } catch (e) {
      console.error(e);
      setList([]);
    }
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line
  }, [search, branchIdNum]);

  // 5. 삭제 함수
  const onDelete = async (locationId: number) => {
    if (!window.confirm('정말 삭제하시겠어요?')) return;
    if (!accessToken || !branchIdNum) return;
    await deleteLocation(locationId, accessToken, branchIdNum);
    fetch();
  };

  return (
    <div className={styles.container}>
      <h2>진열 위치 목록</h2>
      <div className={styles.toolbar}>
        <input
          placeholder="책 제목으로 검색"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => setShowCreate(true)}>진열 위치 등록</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>층</th>
            <th>타입</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {list.map(loc => (
            <tr key={loc.locationId}>
              <td>{loc.locationId}</td>
              <td>{loc.bookTitle}</td>
              <td>{loc.floor}</td>
              <td>
                <span className={styles.type}>{loc.type}</span>
              </td>
              
              <td>
                <button className={styles.edit}
                  onClick={() => {
                    setSelectedId(loc.locationId);
                    setShowUpdate(true);
                  }}
                >
                  수정
                </button>
                <button className={styles.delete} onClick={() => onDelete(loc.locationId)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    {/* 진열 위치 등록 모달 */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)}>
        <CreateLocation
          branchId={branchIdNum}
          onClose={() => {
            setShowCreate(false);
            fetch();
          }}
        />
      </Modal>

      {/* 진열 위치 수정 모달 */}
      <Modal isOpen={showUpdate} onClose={() => setShowUpdate(false)}>
        {selectedId != null && (
          <UpdateLocation
            branchId={branchIdNum}
            locationId={selectedId}
            onClose={() => {
              setShowUpdate(false);
              fetch();
            }}
          />
        )}
      </Modal>
    </div>
  );
}
