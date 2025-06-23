import React, { useState, useEffect } from 'react';
import Modal from '@/apis/constants/Modal';
import { useCookies } from 'react-cookie';
import { updatePolicy, deletePolicy } from '@/apis/policy/policy';
import { PolicyUpdateRequestDto } from '@/dtos/policy/policy.request.dto';
import { PolicyDetailResponseDto } from '@/dtos/policy/policy.response.dto';
import { PolicyType } from '@/apis/enums/PolicyType';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
  policy: PolicyDetailResponseDto;
}

function UpdatePolicy({ isOpen, onClose, onUpdated, policy }: Props) {
  const [cookies] = useCookies(['accessToken']);
  const token = cookies.accessToken;

  // form state
  const [policyTitle, setPolicyTitle] = useState('');
  const [policyDescription, setPolicyDescription] = useState('');
  const [policyType, setPolicyType] = useState<PolicyType>(PolicyType.BOOK_DISCOUNT);
  const [totalPriceAchieve, setTotalPriceAchieve] = useState<number | undefined>(undefined);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  // 받은 policy 로 초기화
  useEffect(() => {
    if (policy) {
      setPolicyTitle(policy.policyTitle);
      setPolicyDescription(policy.policyDescription || '');
      setPolicyType(policy.policyType);
      setTotalPriceAchieve(policy.totalPriceAchieve);
      setDiscountPercent(policy.discountPercent);
      setStartDate(policy.startDate);
      setEndDate(policy.endDate);
      setMessage('');
    }
  }, [policy]);

  // 수정 클릭 핸들러
  const onUpdateClick = async () => {
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

    const dto: PolicyUpdateRequestDto = {
      policyDescription,

      totalPriceAchieve,
      discountPercent,
      startDate,
      endDate,
      policyId: 0
    };

    try {
      const res = await updatePolicy(policy.policyId, dto, token);
      if (res.code !== 'SU') {
        setMessage(res.message || '수정에 실패했습니다.');
        return;
      }
      alert('정책이 수정되었습니다.');
      onUpdated();
      onClose();
    } catch (err) {
      console.error('정책 수정 중 오류:', err);
      setMessage('수정 중 오류가 발생했습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '16px' }}>정책 수정</h2>

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
          style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
        />

        {/* 설명 */}
        <textarea
          placeholder="설명을 입력하세요"
          value={policyDescription}
          onChange={e => setPolicyDescription(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '80px' }}
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
        {message && <p style={{ color: 'red', marginBottom: '12px' }}>{message}</p>}

        {/* 수정 버튼 */}
        <button
          onClick={onUpdateClick}
          style={{ width: '100%', padding: '12px', backgroundColor: '#4e7fff', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer' }}
        >
          수정
        </button>
      </div>
    </Modal>
  );
}

export default UpdatePolicy;
