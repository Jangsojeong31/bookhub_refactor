import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

function StockLogPage() {
  const [cookies] = useCookies(['accessToken']);
  console.log(cookies.accessToken);
  const [branchId, setBranchId] = useState<number | null>(null)
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!cookies.accessToken) return

    //뭔가 현재 로그인된 사람의 BranchId를 받아오는거가 이 중간에 있어야할거같다...

  }, [cookies.accessToken])

  // branchId 불러오는 중일 때
  if (branchId === null) return <div>지점 정보 불러오는 중...</div>

  return (
    <div>
      <h2>재고 로그 메인</h2>
      <button onClick={() => navigate(`/stock-logs/branch/${branchId}`)}>전체 로그</button>
      <button onClick={() => navigate(`/stock-logs/branch/${branchId}/type`)}>유형별 로그</button>
      <button onClick={() => navigate(`/stock-logs/branch/${branchId}/date`)}>날짜별 로그</button>
      <button onClick={() => navigate(`/stock-logs/employee/${cookies.employeeId}`)}>사원별 로그</button>
      <button onClick={() => navigate(`/stock-logs/branch/${branchId}/book/1234567890123`)}>도서별 로그</button>
    </div>
  )
}

export default StockLogPage


// import React, { useEffect, useState } from 'react'
// import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';

// function StockLogPage() {
//  const [cookies] = useCookies(['accessToken']);
//   const [branchId, setBranchId] = useState<number | null>(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     // accessToken이 있으면 내 정보 조회
//     if (!cookies.accessToken) return

//     // 내 정보 API 호출
//     getEmployee(cookies.accessToken).then(res => {
//       setBranchId(res.data.branchId)
//       // console.log('branchId:', res.data.branchId)
//     })
//   }, [cookies.accessToken])

//   return (
//   <div>
//     <h2>재고 로그 메인</h2>
//     <button onClick={() => navigate(`/stock-logs/branch/${cookies.branchId}`)}>전체 로그</button>
//     <button onClick={() => navigate(`/stock-logs/branch/${cookies.branchId}/type`)}>유형별 로그</button>
//     <button onClick={() => navigate(`/stock-logs/branch/${cookies.branchId}/date`)}>날짜별 로그</button>
//     <button onClick={() => navigate(`/stock-logs/employee/${cookies.employeeId}`)}>사원별 로그</button>
//     <button onClick={() => navigate(`/stock-logs/branch/${cookies.branchId}/book/1234567890123`)}>도서별 로그</button>
//   </div>
// )
// }

// export default StockLogPage


