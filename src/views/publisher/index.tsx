// import React from 'react'
// import styles from './publisher.module.css'

// function index() {

//   const publishers = [
//   { id: 1, name: "출판사A" },
//   { id: 2, name: "출판사B" },
// ];
//   return (
//     <div>    
//     <table className='{styles.table}'>
//       <thead>
//         <tr>
//           <th>NO.</th>
//           <th>이름</th>
//           <th>작업</th>
//         </tr>
//       </thead>
//       <tbody>
//         {publishers.map((publisher) => (
//           <tr key={publisher.id}>
//             <td>{publisher.id}</td>
//             <td>{publisher.name}</td>
//             <td><td>
//   <button className={styles['status-button']}>수정</button>
//   <button className={styles['status-button']}>삭제</button>
// </td>
// </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     </div>


//   )
// }

// export default index;

import React, { useState } from 'react'
import UpdatePublisher from './UpdatePublisher';
import styles from './publisherModal.module.css'

function Publisher() {

  const [isUpdatePublisherOpen, setUpdatePublisherOpen] = useState(false);
  

  return (
    <div style={{ padding: '2rem' }}>
      <button className={styles.createButton} onClick={() => setUpdatePublisherOpen(true)}>출판사 등록</button>

      <UpdatePublisher isOpen={isUpdatePublisherOpen} onClose={() => setUpdatePublisherOpen(false)}>
        <h2>출판사 등록</h2>
        <input type="text" placeholder='출판사명을 입력해주세요' />
        <button className={styles.createButton}>등록하기</button>
        <button onClick={() => setUpdatePublisherOpen(false)}>닫기</button>
      </UpdatePublisher>
    </div>
  )
}

export default Publisher