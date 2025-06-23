// // ------------------------------------------------------------
// // 📁 src/components/location/LocationDetail.tsx
// // ------------------------------------------------------------
// import React, { useEffect, useRef, useState } from "react";
// import { getLocationDetail } from "@/apis/location/location";
// import { useCookies } from "react-cookie";
// import { LocationDetailResponseDto } from "@/dtos/location/location.dto";

// interface Props {
//   locationId: number | null;
//   open: boolean;
//   onClose: () => void;
// }

// export function LocationDetail({ locationId, open, onClose }: Props) {
//   const dialogRef = useRef<HTMLDialogElement>(null);
//   const [cookies] = useCookies(["accessToken"]);
//   const [detail, setDetail] = useState<LocationDetailResponseDto | null>(null);

//   useEffect(() => {
//     if (open && locationId) {
//       (async () => {
//         const res = await getLocationDetail(locationId, cookies.accessToken);
//         setDetail(res);
//       })();
//     }
//   }, [open, locationId]);

//   useEffect(() => {
//     if (open) {
//       dialogRef.current?.showModal();
//     } else {
//       dialogRef.current?.close();
//     }
//   }, [open]);

//   return (
//     <dialog ref={dialogRef} onClose={onClose}>
//       <h3>책 위치 상세</h3>
//       {detail && (
//         <ul>
//           <li>제목: {detail.bookTitle}</li>
//           <li>층: {detail.floor}</li>
//           <li>홀: {detail.hall}</li>
//           <li>섹션: {detail.section}</li>
//           <li>타입: {detail.type}</li>
//           {detail.note && <li>비고: {detail.note}</li>}
//         </ul>
//       )}
//       <button onClick={onClose}>닫기</button>
//     </dialog>
//   );
// }