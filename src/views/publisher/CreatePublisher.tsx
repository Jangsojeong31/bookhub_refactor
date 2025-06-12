// CreatePublisher.tsx
import React, { useState } from 'react';
import { createPublisher } from '@/apis/publisher/publisher';
import Modal from '@/apis/constants/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

function CreatePublisher({ isOpen, onClose, onCreated }: Props) {
  const [name, setName] = useState('');

  const handleCreate = async () => {
    const response = await createPublisher({ publisherName: name });
    if (response.code) {
      alert('출판사 등록 완료');
      onCreated();
      onClose();
    } else {
      alert(response.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3>출판사 등록</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="출판사명 입력"
      />
      <button onClick={handleCreate}>등록</button>
      <button onClick={onClose}>닫기</button>
    </Modal>
  );
}

export default CreatePublisher;
