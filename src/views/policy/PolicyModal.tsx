// // src/views/policy/PolicyModal.tsx
// import React from "react";
// import { PolicyListResponseDto } from "@/dtos/policy/policy.response.dto";

// interface PolicyModalProps {
//   policy: PolicyListResponseDto;
//   onClose: () => void;
//   onUpdated: () => Promise<void>;
// }

// const PolicyModal: React.FC<PolicyModalProps> = ({ policy, onClose, onUpdated }) => {
//   return (
//     <div>
//       {/* policy 데이터를 화면에 렌더링 */}
//       <h2>{policy.policyTitle}</h2>
//       {/* 닫기 버튼 클릭 시 onClose 호출 */}
//       <button onClick={onClose}>닫기</button>
//     </div>
//   );
// };

// export default PolicyModal;
