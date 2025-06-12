// import { useEffect, useState } from "react";

// export const getUserProfile = () => {
//   const [user, setUser] = useState(null);
//   const token = localStorage.getItem('token'); // 또는 세션 스토리지, 쿠키 등

//   useEffect(() => {
//     if (token) {
//       fetch('/api/user', { // 서버의 사용자 정보 API 엔드포인트
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json' // 필요에 따라
//         }
//       })
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error('사용자 정보를 가져오는데 실패했습니다.');
//         }
//       })
//       .then(data => setUser(data))
//       .catch(error => console.error(error));
//     }
//   }, [token]);

// }