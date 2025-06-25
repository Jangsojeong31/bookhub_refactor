// PolicyDetail.tsx
import React from 'react';
import { PolicyDetailResponseDto } from '@/dtos/policy/policy.response.dto';
import './policyC.css';


interface PolicyDetailProps {
  isOpen: boolean;
  onClose: () => void;
  policyDetail: PolicyDetailResponseDto;
  policyId: number;
}

const PolicyDetail: React.FC<PolicyDetailProps> = ({ isOpen, onClose, policyDetail, policyId }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="modal-content" style={{ background: '#fff', padding: '20px', borderRadius: '4px', maxWidth: '500px', width: '100%' }}>
        <h2>정책 상세 정보 (ID: {policyId})</h2>
        <p><strong>제목:</strong> {policyDetail.policyTitle}</p>
        <p><strong>타입:</strong> {policyDetail.policyType}</p>
        <p><strong>시작일:</strong> {policyDetail.startDate}</p>
        <p><strong>종료일:</strong> {policyDetail.endDate}</p>
        {'discountPercent' in policyDetail && (
          <p><strong>할인율:</strong> {policyDetail.discountPercent}%</p>
        )}
        <p><strong>설명</strong> {policyDetail.policyDescription}</p>
        <button onClick={onClose} style={{ marginTop: '20px' }}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default PolicyDetail;
