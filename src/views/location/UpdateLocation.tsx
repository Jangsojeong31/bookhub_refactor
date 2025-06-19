import React, { useState, useEffect } from 'react';
import styles from './location.module.css';
import { LocationUpdateRequestDto } from '@/dtos/location/location.request.dto';
import { getLocationDetail, updateLocation } from '@/apis/location/location';
import { useCookies } from 'react-cookie';
import { DisplayType } from '@/apis/enums/DisplayType'; // Enum import 예시

interface Props {
  branchId: number;
  locationId: number;
  onClose: () => void;
}

export default function UpdateLocation({ branchId, locationId, onClose }: Props) {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<LocationUpdateRequestDto>({
    floor: '',
    hall: '',
    section: '',
    displayType: '',
    note: ''
  });

  // 데이터 불러오기
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getLocationDetail(accessToken, branchId, locationId);
        setForm({
          floor: data?.floor,
          hall: data?.hall,
          section: data?.section,
          displayType: data?.type, // type → displayType 변환
          note: data?.note ?? ''
        });
      } catch (err) {
        console.error(err);
        alert('기존 위치 정보를 불러오는 데 실패했습니다.');
        onClose();
      } finally {
        setLoading(false);
      }
    })();
  }, [accessToken, branchId, locationId, onClose]);

  // input/select 공용 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // updateLocation 실제 시그니처에 맞게! (보통 locationId, form, accessToken, branchId 순)
      await updateLocation(locationId, form, accessToken, branchId);
      onClose();
    } catch (err) {
      console.error(err);
      alert('수정에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className={styles.modalBackdrop}>
        <div className={styles.modal}>로딩 중…</div>
      </div>
    );
  }

  return (
    <div className={styles.modalBackdrop}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <h3>진열 위치 수정</h3>

        <label>층</label>
        <input
          name="floor"
          value={form.floor}
          onChange={handleChange}
          required
        />

        <label>홀</label>
        <input
          name="hall"
          value={form.hall}
          onChange={handleChange}
          required
        />

        <label>구역</label>
        <input
          name="section"
          value={form.section}
          onChange={handleChange}
          required
        />

        <label>타입</label>
        <select
          name="displayType"
          value={form.displayType}
          onChange={handleChange}
          required
        >
          <option value="">선택</option>
          <option value={DisplayType.BOOK_SHELF}>책장진열</option>
          <option value={DisplayType.DISPLAY_TABLE}>평대진열</option>
        </select>

        <label>설명</label>
        <input
          name="note"
          value={form.note}
          onChange={handleChange}
        />

        <div className={styles.buttons}>
          <button type="button" onClick={onClose}>취소</button>
          <button type="submit">수정</button>
        </div>
      </form>
    </div>
  );
}
