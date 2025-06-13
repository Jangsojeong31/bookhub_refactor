import { deletePurchaseOrder, getAllPurchaseOrder, getAllPurchaseOrderByCriteria, updatePurchaseOrder } from '@/apis/purchaseOrder/purchaseOrder';
import { PurchaseOrderResponseDto } from '@/dtos/purchaseOrder/response/purchaseOrder.response.dto';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';

function ElsePurchaseOrder() {
  const [searchForm, setSearchForm] = useState({
      employeeName: "",
      bookTitle: "",
      approvalStatus: ""
    })
  
  const [updateForm, setUpdateForm] = useState({
    bookTitle: "",
    purchaseOrderAmount: 0
  })

  const [cookies] = useCookies(["accessToken"]);
  const [message, setMessage] = useState('');
  const [purchaseOrderId, setPurchaseOrderId] = useState<number>(0);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrderResponseDto[]>([]);    
  const [modalStatus, setModalStatus] = useState(false);

  const onSearchInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setSearchForm({...searchForm, [name]: value});
    }

  const onUpdateInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setUpdateForm({...updateForm, [name]: value});
    }

  // * 전체 조회
  const onGetAllPurchaseOrders = async() => {
    const token = cookies.accessToken;
    
    if(!token){
      alert('인증 토큰이 없습니다.')
      return
    }
    const response = await getAllPurchaseOrder(token);
    const {code, message, data} = response; 

    if(!code) {
      setMessage(message);
      return;
    }

    if (Array.isArray(data)) {
      setPurchaseOrders(data);
    } else {
      setMessage("데이터 형식이 올바르지 않습니다.");
    }
  }  

  //* 조회 조건으로 조회(발주 담당자, 책 제목, 승인 여부)
  const onGetPurchaseOrderByCriteria = async() => {
    const {employeeName, bookTitle, approvalStatus} = searchForm;
    const token = cookies.accessToken;

    if(!token){
      alert('인증 토큰이 없습니다.')
      return
    }

    const response = await getAllPurchaseOrderByCriteria(employeeName,  bookTitle, approvalStatus, token);
    const {code, message, data} = response; 

    if(!code) {
      setMessage(message);
      return;
    }

    if (Array.isArray(data)) {
      setPurchaseOrders(data);
      setMessage("");
    } else {
      setMessage("올바른 검색 조건을 입력해주세요.");
    }
  }

  //* 수정 모달창
  const openUpdateModal = (purchaseOrder: PurchaseOrderResponseDto) => {
      if(purchaseOrder.purchaseOrderStatus === "APPROVED" ||  purchaseOrder.purchaseOrderStatus === "DENIED") {
        alert("이미 승인(또는 승인거절)된 요청입니다.")
        return;
      }
      setPurchaseOrderId(purchaseOrder.purchaseOrderId); 
      setUpdateForm({bookTitle: purchaseOrder.bookTitle, purchaseOrderAmount: purchaseOrder.purchaseOrderAmount})
      setModalStatus(true);
    }

  //* 수정 (발주량만 수정 가능하도록)
  const onUpdatePurchaseOrderAmountClick = async (purchaseOrderId: number) => {
      const dto = {
        bookTitle: updateForm.bookTitle,
        purchaseOrderAmount: updateForm.purchaseOrderAmount
      }
      const token = cookies.accessToken;
  
      if(!token){
        alert('인증 토큰이 없습니다.')
        return
      }
    
      const response = await updatePurchaseOrder(purchaseOrderId, dto, token);
      const { code, message } = response;
    
      if (!code) {
        setMessage(message);
        return;
      }
    
      alert("수정되었습니다.");
      setPurchaseOrders(purchaseOrders);
      onGetAllPurchaseOrders();
      setModalStatus(false);
    };

  //* 삭제
  const onDeletePurchaseOrderClick = async(purchaseOrder: PurchaseOrderResponseDto, purchaseOrderId: number) => {
    if(purchaseOrder.purchaseOrderStatus === "APPROVED" ||  purchaseOrder.purchaseOrderStatus === "DENIED") {
        alert("이미 승인(또는 승인거절)된 요청입니다.")
        return;
      }

    const token = cookies.accessToken;
    
    if(!token){
      alert('인증 토큰이 없습니다.')
      return
    }

    const response = await deletePurchaseOrder(purchaseOrderId, token);
    const {code, message} = response;

    if(!code) {
      setMessage(message);
      return;
    }

    alert('삭제되었습니다.')

    const updatedPurchaseOrders = purchaseOrders.filter(purchaseOrder => purchaseOrder.purchaseOrderId !== purchaseOrderId);
    setPurchaseOrders(updatedPurchaseOrders);
  }

  // 노출 리스트
  const responsePurchaseOrderList = purchaseOrders.map((purchaseOrder, index) => {
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
        <button onClick={() => openUpdateModal(purchaseOrder)}>수정</button>
        <button onClick={() => onDeletePurchaseOrderClick(purchaseOrder, purchaseOrder.purchaseOrderId)}>삭제</button>

        {/* <td>{purchaseOrder.purchaseOrderDateAt}</td> */} 
      </tr>
    )
  })

  return (
    <div>
      <input 
        type="text"
        name="employeeName"
        value={searchForm.employeeName}
        placeholder="발주담당자(검색창)" 
        onInput={onSearchInputChange}
      />
      <input 
        type="text"
        name="bookTitle"
        value={searchForm.bookTitle}
        placeholder="책 제목(검색창)" 
        onInput={onSearchInputChange}
      />
      <input 
        type="text"
        name="approvalStatus"
        value={searchForm.approvalStatus}
        placeholder="승인여부(토글버튼)" 
        onInput={onSearchInputChange}
      />
      <button onClick={onGetPurchaseOrderByCriteria}>조회</button>
      <button onClick={onGetAllPurchaseOrders}>전체 조회</button>
      {purchaseOrders && (
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
        {modalStatus && 
          <div>
            <h3>발주량 수정 모달</h3>
            <h5>제목: {updateForm.bookTitle}</h5>
            <input
              type="text"
              name="purchaseOrderAmount"
              value={updateForm.purchaseOrderAmount}
              onChange={onUpdateInputChange}
              placeholder="수정할 발주량을 입력하세요"
            />
            <button onClick={() => onUpdatePurchaseOrderAmountClick(purchaseOrderId)}>수정</button>
            <button onClick={() => setModalStatus(false)}>닫기</button>
          </div>
        }
        {message && <p>{message}</p>}
    </div>
  )
}

export default ElsePurchaseOrder