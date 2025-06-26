// StockUpdateModal.tsx
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { StockActionType } from '@/apis/enums/StockActionType';
import { updateStock } from '@/apis/stock/stock';
import { useEmployeeStore } from '@/stores/employee.store';
import { StockListResponseDto } from '@/dtos/stock/Stock.response.dto';
import './stockmodal.css';

interface StockUpdateModalProps {
  stock: StockListResponseDto;
  onClose: () => void;
  onUpdated: () => void;
}

const StockUpdateModal: React.FC<StockUpdateModalProps> = ({ stock, onClose, onUpdated }) => {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  const employee = useEmployeeStore((s) => s.employee);
  const employeeId = employee?.employeeId;

  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<StockActionType>(StockActionType.OUT);

  const handleSubmit = async () => {
    if (!employeeId) {
      alert('로그인 정보가 없습니다.');
      return;
    }
    if (!stock.branchId || !stock.stockId) {
      alert('지점 또는 재고 ID 정보가 없습니다.');
      return;
    }

    try {
      await updateStock(
        stock.stockId,
        {
          type,
          amount,
          branchId: stock.branchId,
          bookIsbn: stock.bookIsbn,
          employeeId,
          description: '재고 수정',
        },
        accessToken
      );
      alert('수정 성공');
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert('수정 실패');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">재고 수정</h3>
          <button className="modal-close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <p className="modal-subtitle">

    <span className = "labletitle">도서 제목</span>
    <span className="book-title">           {stock.bookTitle}</span>
    <p></p>
    <span className = "labletitle">지점 이름</span>
    <span className="book-title">           {stock.branchName}</span>
  </p>

          <select
            value={type}
            onChange={(e) => setType(e.target.value as StockActionType)}
            className="input-fields"
          >
            <option value={StockActionType.IN}>{StockActionType.IN}</option>
            <option value={StockActionType.OUT}>{StockActionType.OUT}</option>
            <option value={StockActionType.LOSS}>{StockActionType.LOSS}</option>
          </select>

          <input
            type="number"
            placeholder="수량 입력"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="input-field"
          />
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={handleSubmit}>
            수정하기
          </button>
          <button className="btn-secondary" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockUpdateModal;


// // StockUpdateModal.tsx
// import React, { useState } from 'react';
// import { useCookies } from 'react-cookie';
// import { StockActionType } from '@/apis/enums/StockActionType';
// import { updateStock } from '@/apis/stock/stock';
// import { useEmployeeStore } from '@/stores/employee.store';
// import { StockListResponseDto } from '@/dtos/stock/Stock.response.dto';
// import './stockmodal.css'

// interface StockUpdateModalProps {
//   stock: StockListResponseDto;
//   onClose: () => void;
//   onUpdated: () => void;           // ← 추가
// }

// function StockUpdateModal({
//   stock,
//   onClose,
//   onUpdated,                       // ← 추가
// }: StockUpdateModalProps) {
//   const [cookies] = useCookies(['accessToken']);
//   const accessToken = cookies.accessToken ;
//   const employee = useEmployeeStore((s) => s.employee);
//   const employeeId = employee?.employeeId;

//   const [amount, setAmount] = useState(0);
//   const [type, setType] = useState<StockActionType>(StockActionType.OUT);

//   const handleSubmit = async () => {
//     if (!employeeId) {
//       alert('로그인 정보가 없습니다.');
//       return;
//     }else{
//        const payload = {
//       type,
//       employeeId: employeeId,
//       bookIsbn: stock.bookIsbn,
//       branchId: stock.branchId,
//       amount,
//       description: '재고 수정'
//     };
//     console.log(payload);
//     }


    
//     if (!stock.branchId || !stock.stockId) {
//       alert('지점 또는 재고 ID 정보가 없습니다.');
//       return;
//     }

//     try {
//       await updateStock(
     
//         stock.stockId,
//         {
//           type,
//           amount,
//           branchId: stock.branchId,
//           bookIsbn: stock.bookIsbn,
//           employeeId,
//           description: '재고 수정',
//         },
//         accessToken
//       );
//       alert('수정 성공');
//       onClose();
//       onUpdated();               // ← 성공 후 목록 갱신 콜백 호출
//     } catch (err) {
//       console.error(err);
//       alert('수정 실패');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
//       <div className="bg-white p-4 rounded shadow-md space-y-4 w-96">
//         <h3 className="text-lg font-semibold">재고 수정</h3>
//         <p>
//           <strong>{stock.bookTitle}</strong> @ {stock.branchName}
//         </p>
//         <select
//           value={type}
//           onChange={(e) => setType(e.target.value as StockActionType)}
//           className="border p-1 w-full"
//         >
//           <option value={StockActionType.IN}>{StockActionType.IN}</option>
//           <option value={StockActionType.OUT}>{StockActionType.OUT}</option>
//           <option value={StockActionType.LOSS}>{StockActionType.LOSS}</option>
//         </select>

//         <input
//           type="number"
//           placeholder="수량 입력"
//           value={amount}
//           onChange={(e) => setAmount(Number(e.target.value))}
//           className="border p-1 w-full"
//         />

//         <div className="flex justify-between">
//           <button onClick={handleSubmit} className="btn">
//             수정하기
//           </button>
//           <button onClick={onClose} className="btn btn-secondary">
//             닫기
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StockUpdateModal;
