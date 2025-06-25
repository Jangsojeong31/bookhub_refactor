import React, { useState } from 'react';
import { updateStock } from '@/apis/stock/stock';
import { Stock } from './stock';


interface StockUpdateModalProps {
  stock: Stock;
  onClose: () => void;
}

function StockUpdateModal({ stock, onClose }: StockUpdateModalProps) {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('OUT');

  const handleSubmit = async () => {
    try {
      await updateStock(stock.branchId, stock.stockId, {
        type,
        amount,
        branchId: stock.branchId,
        bookIsbn: stock.bookIsbn,
        employeeId: 1, // 나중에 로그인 사용자로 대체
        description: '재고 수정',
      });
      alert('수정 성공');
      onClose();
    } catch {
      alert('수정 실패');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md space-y-4 w-96">
        <h3 className="text-lg font-semibold">재고 수정</h3>
        <p><strong>{stock.bookTitle}</strong> @ {stock.branchName}</p>

        <select value={type} onChange={(e) => setType(e.target.value)} className="border p-1 w-full">
          <option value="IN">입고</option>
          <option value="OUT">출고</option>
          <option value="LOSS">손실</option>
        </select>

        <input
          type="number"
          placeholder="수량 입력"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-1 w-full"
        />

        <div className="flex justify-between">
          <button onClick={handleSubmit} className="btn">수정하기</button>
          <button onClick={onClose} className="btn btn-secondary">닫기</button>
        </div>
      </div>
    </div>
  );
}

export default StockUpdateModal;
