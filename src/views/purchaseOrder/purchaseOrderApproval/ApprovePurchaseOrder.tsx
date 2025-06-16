import { getAllPurchaseOrderRequested, updatePurchaseOrderStatus } from '@/apis/purchaseOrder/purchaseOrderApproval';
import { PurchaseOrderResponseDto } from '@/dtos/purchaseOrder/response/purchaseOrder.response.dto';
import { PurchaseOrderStatus } from '@/dtos/purchaseOrderApproval/request/purchaseOrder-approve.request.dto';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';

function ApprovePurchaseOrder() {
  const [searchForm, setSearchForm] = useState({
      employeeName: "",
      bookTitle: "",
      approvalStatus: ""
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

  
  //* 발주 요청서 업데이트
  const onGetAllPurchaseOrdersRequested = async() => {
      const token = cookies.accessToken;
      
      if(!token){
        alert('인증 토큰이 없습니다.')
        return
      }
      const response = await getAllPurchaseOrderRequested(token);
      const {code, message, data} = response; 
  
      if(!code) {
        setMessage(message);
        return;
      }
  
      if (Array.isArray(data) && data?.length > 0) {
        setPurchaseOrders(data);
      } else {
        setMessage("발주 요청건이 존재하지 않습니다.");
      }
    }
  
  //* 리스트
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
        <td>{purchaseOrder.purchaseOrderDateAt}</td>
        <td>{purchaseOrder.purchaseOrderStatus == PurchaseOrderStatus.REQUESTED ? '요청중' : purchaseOrder.purchaseOrderStatus === PurchaseOrderStatus.APPROVED ? '승인' : '거부'}</td>
        <td><button onClick={() => onPurchaseOrderApproveClick(purchaseOrder.purchaseOrderId)} >승인</button></td>
        <td><button onClick={() => onPurchaseOrderRejectClick(purchaseOrder.purchaseOrderId)} >승인 거부</button></td>
        

        {/* <td>{purchaseOrder.purchaseOrderDateAt}</td> */} 
      </tr>
    )
  })

  //* 승인 버튼
  const onPurchaseOrderApproveClick = async(purchaseOrderId: number) => {
    const dto = {
      status: PurchaseOrderStatus.APPROVED
    }
    const token = cookies.accessToken;
    
    if(!token){
        alert('인증 토큰이 없습니다.')
        return
      }

    const response = await updatePurchaseOrderStatus(purchaseOrderId, dto, token)
    const { code, message } = response;

    if(!code) {
      setMessage(message);
      return
    }

    // '승인하시겠습니까?' 모달창 띄우기

    alert("승인되었습니다.")
    setPurchaseOrders(purchaseOrders);
    onGetAllPurchaseOrdersRequested();
  }

  //* 승인 거절 버튼
  const onPurchaseOrderRejectClick = async(purchaseOrderId: number) => {
    const dto = {
      status: PurchaseOrderStatus.REJECTED
    }
    const token = cookies.accessToken;
    
    if(!token){
        alert('인증 토큰이 없습니다.')
        return
      }

    const response = await updatePurchaseOrderStatus(purchaseOrderId, dto, token)
    const { code, message } = response;

    if(!code) {
      setMessage(message);
      return
    }

    // '승인 거부 하시겠습니까?' 모달창 띄우기
    
    alert("승인 거부되었습니다.")
    setPurchaseOrders(purchaseOrders);
    onGetAllPurchaseOrdersRequested();
  }

  //* 승인 로그 전체 조회

  return (
    <div>
      <button onClick={onGetAllPurchaseOrdersRequested}>발주 요청서 업데이트</button>
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
                <th>발주 일자</th>
                <th>승인 상태</th>
              </tr>
            </thead>
            <tbody>
              {responsePurchaseOrderList}
            </tbody>
          </table>
        )}
      {message && <p>{message}</p>}
    </div>
  )
}

export default ApprovePurchaseOrder