// src/views/discountPolicy/DiscountPolicyCreate.tsx
import React, { useState } from 'react';
import styles from './policy.module.css'



function CreatePolicy() {
  const [form, setForm] = useState({
    policyTitle: '',
    policyDescription: '',
    policyType: '',
    totalPriceAchieve: '',
    discountPercent: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.policyTitle || !form.policyType || !form.discountPercent) {
      alert('필수 항목을 입력해주세요.');
      return;
    }

    // TODO: API 호출
    console.log('등록할 데이터:', form);
    alert('정책이 등록되었습니다.');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>할인 정책 등록</h2>

      <select
        name="policyType"
        value={form.policyType}
        onChange={handleChange}
        className={styles.select}
        required
      >
        <option value="">정책 유형 선택</option>
        <option value="MEMBER">회원 등급 할인</option>
        <option value="SEASONAL">시즌 할인</option>
        <option value="EVENT">이벤트 할인</option>
        {/* ENUM 값에 맞게 수정 */}
      </select>

      <input
        type="text"
        name="policyTitle"
        placeholder="정책 제목"
        value={form.policyTitle}
        onChange={handleChange}
        className={styles.input}
        required
      />

      <textarea
        name="policyDescription"
        placeholder="정책 설명 (선택)"
        value={form.policyDescription}
        onChange={handleChange}
        className={styles.textarea}
      />

      <input
        type="number"
        name="totalPriceAchieve"
        placeholder="달성 금액 기준 (선택)"
        value={form.totalPriceAchieve}
        onChange={handleChange}
        className={styles.input}
      />

      <input
        type="number"
        name="discountPercent"
        placeholder="할인율 (%)"
        value={form.discountPercent}
        onChange={handleChange}
        className={styles.input}
        required
      />

      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        className={styles.input}
      />

      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
        className={styles.input}
      />

      <button onClick={handleSubmit} className={styles.button}>
        등록
      </button>
    </div>
  );
}

export default CreatePolicy;
