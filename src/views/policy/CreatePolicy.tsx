// src/views/policy/CreatePolicy.tsx
import React, { useState } from 'react';
import Modal from '@/apis/constants/Modal';
import { useCookies } from 'react-cookie';
import { createPolicy } from '@/apis/policy/policy';
import { PolicyCreateRequestDto } from '@/dtos/policy/policy.request.dto';
import { PolicyType } from '@/apis/enums/PolicyType';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void; // 생성 후 부모에게 알림
}

function CreatePolicy({ isOpen, onClose, onCreated }: Props) {
  const [cookies] = useCookies(['accessToken']);
  const token = cookies.accessToken;

  const [policyTitle, setPolicyTitle] = useState('');
  const [policyDescription, setPolicyDescription] = useState('');
  const [policyType, setPolicyType] = useState<PolicyType>(PolicyType.BOOK_DISCOUNT);
  const [totalPriceAchieve, setTotalPriceAchieve] = useState<number | undefined>(undefined);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  const onCreateClick = async () => {
    if (!policyTitle.trim()) {
      setMessage('제목을 입력해주세요.');
      return;
    }
    if (discountPercent <= 0) {
      setMessage('할인율을 입력해주세요.');
      return;
    }

    if (!token) {
      alert('인증 토큰이 없습니다.');
      return;
    }

    const dto: PolicyCreateRequestDto = {
      policyTitle,
      policyDescription,
      policyType,
      totalPriceAchieve,
      discountPercent,
      startDate,
      endDate,
    };

    const response = await createPolicy(dto, token);
    if (response.code !== 'SU') {
      setMessage(response.message || '정책 생성에 실패했습니다.');
      return;
    }

    alert('정책이 등록되었습니다.');
    onCreated();  // 부모에 알림 (리스트 새로고침)
    onClose();    // 모달 닫기
    // 폼 초기화
    setPolicyTitle('');
    setPolicyDescription('');
    setPolicyType(PolicyType.BOOK_DISCOUNT);
    setTotalPriceAchieve(undefined);
    setDiscountPercent(0);
    setStartDate('');
    setEndDate('');
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '16px' }}>정책 등록</h2>

        {/* 할인 종류 */}
        <select
          value={policyType}
          onChange={e => setPolicyType(e.target.value as PolicyType)}
          style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
        >
          <option value={PolicyType.BOOK_DISCOUNT}>도서 할인</option>
          <option value={PolicyType.TOTAL_PRICE_DISCOUNT}>총 금액 할인</option>
          <option value={PolicyType.CATEGORY_DISCOUNT}>카테고리 할인</option>
        </select>

        {/* 날짜 */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            style={{ flex: 1, padding: '8px' }}
          />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            style={{ flex: 1, padding: '8px' }}
          />
        </div>

        {/* 제목 */}
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={policyTitle}
          onChange={e => setPolicyTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '12px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />

        {/* 설명 */}
        <textarea
          placeholder="설명을 입력하세요"
          value={policyDescription}
          onChange={e => setPolicyDescription(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            minHeight: '80px'
          }}
        />

        {/* 금액·할인율 */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input
            type="number"
            placeholder="총 금액"
            value={totalPriceAchieve ?? ''}
            onChange={e => setTotalPriceAchieve(e.target.value ? Number(e.target.value) : undefined)}
            style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="number"
            placeholder="할인율(%)"
            value={discountPercent}
            onChange={e => setDiscountPercent(Number(e.target.value))}
            style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        {/* 에러 메시지 */}
        {message && (
          <p style={{ color: 'red', marginBottom: '12px' }}>{message}</p>
        )}

        {/* 등록 버튼 */}
        <button
          onClick={onCreateClick}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4e7fff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          등록
        </button>
      </div>
    </Modal>
  );
}

export default CreatePolicy;

