// import { createPurchaseOrder } from '@/apis/purchaseOrder/purchaseOrder';
// import { PurchaseOrderCreateRequestDto } from '@/dtos/purchaseOrder/request/purchaseOrder-create.request.dto';
// import { PurchaseOrderRequestDto } from '@/dtos/purchaseOrder/request/purchaseOrder.request.dto';
// import { PurchaseOrderResponseDto } from '@/dtos/purchaseOrder/response/purchaseOrder.response.dto';
// import React, { useState } from 'react'
// import { useCookies } from 'react-cookie';

// function CreatePurchaseOrder() {
//   const [form, setForm] = useState({
//     isbn: "",
//     purchaseOrderAmount: 0
//   })
//   const [requestOrders, setRequestOrders] = useState<PurchaseOrderRequestDto[]>([]);
//   const [responseOrders, setResponseOrders] = useState<PurchaseOrderResponseDto[]>([]);
//   const [message, setMessage] = useState('');
//   const [modalStatus, setModalStatus] = useState(false);
//   const [employee, setEmployee] = useState({
//     employeeName: ""
//   });
//   const [cookies] = useCookies(["accessToken"]);

  
  
//   const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
//     const {name, value} = e.target;
//     setForm({...form, [name]: value});
//   }

//   const onAddPurchaseOrder = () => {
//     const {isbn, purchaseOrderAmount} = form;

//     if(!isbn || !purchaseOrderAmount) {
//       setMessage('모든 항목을 입력해주세요')
//       return;
//     }

//     const newPurchaseOrder: PurchaseOrderRequestDto = {isbn, purchaseOrderAmount};
//     setRequestOrders([...requestOrders, newPurchaseOrder]);

//     // 사용자 정보 받아오기
//     // requestOrders -> responseOrders

//     setForm({isbn: "", purchaseOrderAmount: 0});

//   }
  
//   const puchaseOrderList = responseOrders.map((purchaseOrder, index) => {
//     return (
//       <tr key={index}>
//         <td>{purchaseOrder.purchaseOrderId}</td>
//         <td>{purchaseOrder.branchName}</td>
//         <td>{purchaseOrder.branchLocation}</td>
//         <td>{purchaseOrder.employeeName}</td>
//         <td>{purchaseOrder.isbn}</td>
//         <td>{purchaseOrder.bookTitle}</td>
//         <td>{purchaseOrder.purchaseOrderAmount}</td>
//         <td>{purchaseOrder.purchaseOrderPrice}</td>
//         <td>{purchaseOrder.purchaseOrderStatus}</td>
//         {/* <td>{purchaseOrder.purchaseOrderDateAt}</td> */} // Date 형식 가져오기
//       </tr>
//     )
//   })
  
//   // 등록 기능
//   const onCreatePurchaseOrderClick = async() => {
//     const requestBody: PurchaseOrderCreateRequestDto = {requestOrders};
//     const token = cookies.accessToken;

//     const response = await createPurchaseOrder(requestBody, token);
//     const {code, message} = response;

//     if(!code) {
//       setMessage(message);
//       return;
//     }

//     // 팝업창(모달창) 열림
//     // onHandleModalStatus();

//     alert("등록이 완료되었습니다."); // 메시지를 모달창 안으로 포함시킬까 고민중

//     // authors 초기화
//     setPurchaseOrders([]);
  
//   return (
//     <div>
//       <h2>발주요청서 등록</h2>
//       <input 
//         type="text"
//         placeholder='ISBN'
//         name='isbn'
//         value={form.isbn}
//         onChange={onInputChange}
//         />
//       <input 
//         type="text"
//         placeholder='발주량'
//         name='purchaseOrderAmount'
//         value={form.purchaseOrderAmount}
//         onChange={onInputChange}
//         />
//         <button onClick={onAddPurchaseOrder}>추가</button>
//         <table>
//           <tr>
//             <th>ISBN</th>
//             <th>발주량</th>
//           </tr>
//           {puchaseOrderList}
//         </table>
//         <button onClick={onCreatePurchaseOrderClick}>등록</button>

//         {/* <button onClick={onHandleModalStatus}>모달창 열기</button> */}
//         {/* {modalStatus && (
//           <Modal title='모달 제목' setModal={onHandleModalStatus}>
//             {authorList}
//             <button onClick={onHandleModalStatus}>창 닫기</button>
//           </Modal>
//         )} */}
//         {message && <p>{message}</p>}
//     </div>
//   )
// }

// export default CreatePurchaseOrder