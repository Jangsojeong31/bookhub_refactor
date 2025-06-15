import { getAllPurchaseOrderApproval, getAllPurchaseOrderApprovalByCriteria, getAllPurchaseOrderApprovalByDate } from '@/apis/purchaseOrder/purchaseOrderApproval'
import { PurchaseOrderApprovalResponseDto } from '@/dtos/purchaseOrderApproval/response/purchaseOrderApproval.respose.dto';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';

function ElsePurchaseOrderApproval() {
  const [searchForm, setSearchForm] = useState<{
    employeeName: string;
    isApproved: boolean | null;
  }>({
    employeeName: "",
    isApproved: null
  })

  const [dateForm, setDateForm] = useState({
    startDate: "",
    endDate: ""
  })

  const [cookies] = useCookies(["accessToken"]);
  const [message, setMessage] = useState('');
  const [purchaseOrderApprovals, setPurchaseOrderApprovals] = useState<PurchaseOrderApprovalResponseDto[]>([]);    
  
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setDateForm({...dateForm, [name]: value})
  }

  //* 전체 조회
  const onGetAllPurchaseOrderApprovals = async() => {
    const token = cookies.accessToken;

    if(!token){
      alert('인증 토큰이 없습니다.')
      return
    }

    const response = await getAllPurchaseOrderApproval(token);
    const {code, message, data} = response; 

    if(!code) {
      setMessage(message);
      return;
    }

    if (Array.isArray(data)) {
      setPurchaseOrderApprovals(data);
    } else {
      setMessage("데이터 형식이 올바르지 않습니다.");
    }
  }

  //* 조회 조건으로 조회
  const onGetPurchaseOrderByCriteria = async() => {
    const{employeeName, isApproved} = searchForm;
    const token = cookies.accessToken;

    if(!token){
      alert('인증 토큰이 없습니다.')
      return
    }

    const response = await getAllPurchaseOrderApprovalByCriteria(employeeName, isApproved, token);
    const {code, message, data} = response; 

    if(!code) {
      setMessage(message);
      return;
    }

    if (Array.isArray(data)) {
      setPurchaseOrderApprovals(data);
      setMessage("");
    } else {
      setMessage("올바른 검색 조건을 입력해주세요.");
    }
  }
  
  // * 날짜로 조회
  const onGetPurchaseOrderApprovalByDate = async() => {
    const{startDate, endDate} = dateForm;
    const token = cookies.accessToken;

    if(!token){
      alert('인증 토큰이 없습니다.')
      return
    }

    const response = await getAllPurchaseOrderApprovalByDate(startDate, endDate, token);
    const {code, message, data} = response; 

    if(!code) {
      setMessage(message);
      return;
    }

    if (Array.isArray(data)) {
      setPurchaseOrderApprovals(data);
      setMessage("");
    } else {
      setMessage("올바른 검색 조건을 입력해주세요.");
    }
  }

  // *노출 리스트
  const responsePurchaseOrderApprovalList = purchaseOrderApprovals.map((purchaseOrderApproval, index) => {
    return (
      <tr key={index}>
        <td>{purchaseOrderApproval.employeeName}</td>
        <td>{purchaseOrderApproval.isApproved ? "승인" : "승인 거절"}</td>
        <td>{purchaseOrderApproval.approvedDateAt}</td>
        
        <td>[발주서 사항]</td>
        <td>{purchaseOrderApproval.poDetail?.branchName}</td>
        <td>{purchaseOrderApproval.poDetail?.employeeName}</td>
        <td>{purchaseOrderApproval.poDetail?.isbn}</td>
        <td>{purchaseOrderApproval.poDetail?.bookTitle}</td>
        <td>{purchaseOrderApproval.poDetail?.bookPrice}</td>
        <td>{purchaseOrderApproval.poDetail?.purchaseOrderAmount}</td>
        <td>{purchaseOrderApproval.poDetail?.purchaseOrderStatus}</td>
      </tr>
    )
  })

  return (
    <div>
      <input 
          type="text"
          name="employeeName"
          value={searchForm.employeeName}
          placeholder="승인담당자(검색창)" 
          onInput={(e:React.ChangeEvent<HTMLInputElement>) => {setSearchForm({...searchForm, employeeName: e.target.value})}}
        />
      <select
        name="isApproved"
        value={searchForm.isApproved == null ? "" : String(searchForm.isApproved)}
        onChange={(e) =>
          setSearchForm({ ...searchForm, isApproved: e.target.value == "" ? null : 
            e.target.value === "true" ? true : false})
        }
      >
        <option value="">전체</option>
        <option value="true">승인</option>
        <option value="false">승인 거부</option>
      </select>
      <button onClick={onGetPurchaseOrderByCriteria}>조회</button>

      <input 
        type="date"
        name='startDate'
        value={dateForm.startDate}  
        placeholder='시작일'
        onInput={onInputChange}
      />
      <input 
        type="date"
        name='endDate'
        value={dateForm.endDate}  
        placeholder='종료일'
        onInput={onInputChange}
      />
      <button onClick={onGetPurchaseOrderApprovalByDate}>조회</button>

      <button onClick={onGetAllPurchaseOrderApprovals}>전체 조회</button>
      
      {purchaseOrderApprovals && 
        <table style={{
          border: '1px solid black',
          borderCollapse: 'collapse', 
          width: '100%',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontSize: '14px'}}>
          <thead>
            <tr>
              <th>승인 담당자</th>
              <th>승인 여부</th>
              <th>승인 일자</th>
              
              <th>[발주서 사항]</th>
              <th>지점명</th>
              <th>지점 주소</th>
              <th>ISBN</th>
              <th>책 제목</th>
              <th>책 가격</th>
              <th>발주 수량</th>
              <th>승인 상태</th>
            </tr>
          </thead>
          <tbody>
          {responsePurchaseOrderApprovalList}
          </tbody>
        </table> 
      }
      
    </div>
  )
}

export default ElsePurchaseOrderApproval