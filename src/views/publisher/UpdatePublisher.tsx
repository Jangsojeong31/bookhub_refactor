// src/views/publisher/UpdatePublisher.tsx
import React, { useState } from 'react';
import { updatePublisher } from '@/apis/publisher/publisher';

function UpdatePublisher({ publisher, onClose, onUpdated }: any) {
  const [name, setName] = useState(publisher.publisherName);

  const handleUpdate = async () => {
    const response = await updatePublisher(publisher.publisherId, {
      publisherName: name,
    });
    if (response.code) {
      alert('수정 완료');
      onUpdated();
      onClose();
    } else {
      alert(response.message);
    }
  };

  return (
    <div style={{ border: '1px solid gray', padding: '20px', background: '#fff' }}>
      <h3>출판사 수정</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleUpdate}>저장</button>
      <button onClick={onClose}>닫기</button>
    </div>
  );
}

export default UpdatePublisher;
