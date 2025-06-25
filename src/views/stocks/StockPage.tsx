// 📁 src/views/stock/StockPage.tsx
import React, { useState } from 'react';
import StockTable from './StockTable';
import StockUpdateModal from './StockUpdateModal';
import {
  searchStocksByIsbn,
  searchStocksByTitle,
  searchStocksByBranch
} from '@/apis/stock/stock';
import { Stock } from './stock';

function StockPage() {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [branchId, setBranchId] = useState('');
  const [stocks, setStocks] = useState([]);

  const handleSearch = async (type: 'isbn' | 'title' | 'branch') => {
    try {
      let response;
      if (type === 'isbn') response = await searchStocksByIsbn(isbn);
      else if (type === 'title') response = await searchStocksByTitle(title);
      else response = await searchStocksByBranch(Number(branchId));

      setStocks(response.data.data);
    } catch (err) {
      alert('검색 실패');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">재고 검색</h2>
      <div className="space-x-2">
        <input value={isbn} onChange={e => setIsbn(e.target.value)} placeholder="ISBN" className="border p-1" />
        <button onClick={() => handleSearch('isbn')} className="btn">ISBN 검색</button>

        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목" className="border p-1" />
        <button onClick={() => handleSearch('title')} className="btn">제목 검색</button>

        <input value={branchId} onChange={e => setBranchId(e.target.value)} placeholder="지점 ID" className="border p-1" />
        <button onClick={() => handleSearch('branch')} className="btn">지점 검색</button>
      </div>

      <StockTable stocks={stocks} onEdit={setSelectedStock} />

      {selectedStock && (
        <StockUpdateModal stock={selectedStock} onClose={() => setSelectedStock(null)} />
      )}
    </div>
  );
}

export default StockPage;
