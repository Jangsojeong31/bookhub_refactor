import React, { useState } from 'react';
import styles from './location.module.css';
import { createLocation } from '@/apis/location/location';
import { DisplayType } from '@/apis/enums/DisplayType';
import { useCookies } from 'react-cookie';

interface Props {
  branchId: number;
  onClose: () => void;
}

export default function CreateLocation({ branchId, onClose }: Props) {
  const [form, setForm] = useState({
    bookIsbn: '', floor: '', hall: '', section: '', displayType: '', note: ''
  });

  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // displayType이 빈값일 경우 방지 (필수 값 체크)
    if (!form.displayType) {
      alert('진열위치를 선택하세요.');
      return;
    }
    await createLocation(form, accessToken, branchId); // 시그니처 맞게!
    onClose();
  };
  return (
    <div className={styles.modalBackdrop}>
      <form className={styles.modal} onSubmit={onSubmit}>
        <h3>진열 위치 등록</h3>
        <label>ISBN</label>
        <input name="bookIsbn" value={form.bookIsbn} onChange={handleChange} required />
        <label>층</label>
        <input name="floor" value={form.floor} onChange={handleChange} required />
        <label>홀</label>
        <input name="hall" value={form.hall} onChange={handleChange} required />
        <label>구역</label>
        <input name="section" value={form.section} onChange={handleChange} required />
        <label>진열위치</label>
        <select name="displayType" value={form.displayType} onChange={handleChange} required>
          <option value="">선택</option>
          <option value={DisplayType.BOOK_SHELF}>책장 진열</option>
          <option value={DisplayType.DISPLAY_TABLE}>평대 진열</option>
        </select>
        <label>설명</label>
        <input name="note" value={form.note} onChange={handleChange} />
        <div className={styles.buttons}>
          <button type="button" onClick={onClose}>취소</button>
          <button type="submit">등록</button>
        </div>
      </form>
    </div>
  );
}
