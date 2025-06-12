import { createPurchaseOrder } from '@/apis/purchaseOrder/purchaseOrder';
import { PurchaseOrderCreateRequestDto } from '@/dtos/purchaseOrder/request/purchaseOrder-create.request.dto';
import { PurchaseOrderRequestDto } from '@/dtos/purchaseOrder/request/purchaseOrder.request.dto';
import { PurchaseOrderResponseDto } from '@/dtos/purchaseOrder/response/purchaseOrder.response.dto';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';

function CreatePurchaseOrder() {
  const [form, setForm] = useState({
    isbn: "",
    purchaseOrderAmount: 0
  })
  const [purchaseOrders, setRequestOrders] = useState<PurchaseOrderRequestDto[]>([]);
  const [responseOrders, setResponseOrders] = useState<PurchaseOrderResponseDto[]>([]);
  const [message, setMessage] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  const [employee, setEmployee] = useState({
    employeeName: ""
  });
  const [cookies] = useCookies(["accessToken"]);  
  const [isActive, setIsActive] = useState<boolean>(false);
  
  const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }

  // 추가 버튼 누르면
  const onAddPurchaseOrder = () => {
    const {isbn, purchaseOrderAmount} = form;

    if(!isbn || !purchaseOrderAmount) {
      setMessage('모든 항목을 입력해주세요')
      return;
    }

    const newPurchaseOrder: PurchaseOrderRequestDto = {isbn, purchaseOrderAmount};
    setRequestOrders([...purchaseOrders,  newPurchaseOrder]);

    setForm({ isbn: "", purchaseOrderAmount: 0 });

    setMessage('');
  }
  
  // 노출 리스트(request)
  const reqeustPurchaseOrderList = purchaseOrders.map((purchaseOrder, index) => {
    return (
      <tr key={index}>
        <td>{purchaseOrder.isbn}</td>
        <td>{purchaseOrder.purchaseOrderAmount}</td>
      </tr>
    )
  })
  
  // 등록 기능
  const onCreatePurchaseOrderClick = async() => {
    const requestBody: PurchaseOrderCreateRequestDto = {purchaseOrders};
    const token = cookies.accessToken;
    
    
    if(!token){
      alert('인증 토큰이 없습니다.')
      return
    }
    console.log('testProblem1');
    
    const response = await createPurchaseOrder(requestBody, token); // 코드 문제 - 수정 요함
    console.log('testProblem2');
    const {code, message, data: responseOrders} = response; 
    
    console.log('testProblem3');
    
    if(!code) {
      setMessage(message);
      return;
    }
    
    // if (!responseOrders) {
    //   setRequestOrders([]);
    //   setMessage("주문 목록을 불러오지 못했습니다.");
    //   return;
    // }

    if (Array.isArray(responseOrders)) {
      setResponseOrders(responseOrders);
      console.log('testProblem4')
    } else {
      setMessage("데이터 형식이 올바르지 않습니다.");
      console.log('testProblem5')
    }
    
    setRequestOrders([]);

    alert("등록이 완료되었습니다."); 
  }
  
  // 노출 리스트(response)
  const responsePurchaseOrderList = responseOrders.map((purchaseOrder, index) => {
    return (
      <tr key={index}>
        <td>{purchaseOrder.branchName}</td>
        <td>{purchaseOrder.branchLocation}</td>
        <td>{purchaseOrder.employeeName}</td>
        <td>{purchaseOrder.isbn}</td>
        <td>{purchaseOrder.bookTitle}</td>
        <td>{purchaseOrder.bookPrice}</td>
        <td>{purchaseOrder.purchaseOrderAmount}</td>
        <td>{purchaseOrder.purchaseOrderPrice}</td>
        <td>{purchaseOrder.purchaseOrderStatus}</td>
        {/* <td>{purchaseOrder.purchaseOrderDateAt}</td> */} 
      </tr>
    )
  })

  return (
    <div>
      <h2>발주요청서 등록</h2>
      <input 
        type="text"
        placeholder='ISBN'
        name='isbn'
        value={form.isbn}
        onChange={onInputChange}
        />
      <input 
        type="text"
        placeholder='발주량'
        name='purchaseOrderAmount'
        value={form.purchaseOrderAmount}
        onChange={onInputChange}
        />
        <button onClick={onAddPurchaseOrder}>추가</button>
        <table>
          <thead>
            <tr>
              <th>ISBN</th>
              <th>발주량</th>
            </tr>
          </thead>
          <tbody>
            {reqeustPurchaseOrderList}
          </tbody>
        </table>
        <button onClick={onCreatePurchaseOrderClick}>등록</button>
        <br />
        {/* 모달창 안으로 */}
        등록된 발주 요청서
        {responseOrders && (
          <table>
            <thead>
              <tr>
                <th>지점명</th>
                <th>지점 주소</th>
                <th>발주 담당 사원</th>
                <th>ISBN</th>
                <th>책 제목</th>
                <th>책 가격</th>
                <th>발주 수량</th>
                <th>발주 가격</th>
                <th>승인 상태</th>
              </tr>
            </thead>
            <tbody>
              {responsePurchaseOrderList}
            </tbody>
          </table>
        )}
        {/* 모달창 닫기 누르면 setResponseOrders([]) */}
        {message && <p>{message}</p>}
    </div>
  )
}

export default CreatePurchaseOrder