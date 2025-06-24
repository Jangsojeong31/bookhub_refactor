// src/views/statistics/revenue/RevenueWeekday.tsx
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getWeekdayRevenue } from "@/apis/statistics/revenue/revenueStatistics";
import type { ResponseDto } from "@/dtos";
import type { WeekdayRevenueResponseDto } from "@/dtos/statistics/revenue/revenue.response";

type ChartData = { name: string; total: number };

export default function RevenueWeekday() {
  const [cookies] = useCookies(["accessToken"]);
  const accessToken = cookies.accessToken as string;

  const thisYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(thisYear);
  const [quarter, setQuarter] = useState<number>(1);
  const [data, setData] = useState<ChartData[]>([
    { name: "월", total: 0 },
    { name: "화", total: 0 },
    { name: "수", total: 0 },
    { name: "목", total: 0 },
    { name: "금", total: 0 },
    { name: "토", total: 0 },
    { name: "일", total: 0 },
  ]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

useEffect(() => {
  if (!accessToken) return;
  setLoading(true);

  getWeekdayRevenue(accessToken, year, quarter)
    .then((res) => {
      // ① 만약 data가 없으면 그냥 빈 배열 표시
      if (!res.data) {
        setData([]);
        return;
      }

      // ② data가 있으면 안전하게 맵핑
      const days = ["월","화","수","목","금","토","일"];
      const mapped = days.map((day) => {
        const found = res.data!.find((r) => r.weekday === day);
        return { name: day, total: found ? found.total : 0 };
      });
      setData(mapped);
      setActiveIndex(0);
    })
    .catch((err) => {
      console.error("API 요청 에러:", err);
    })
    .finally(() => {
      setLoading(false);
    });
}, [accessToken, year, quarter]);

  const activeItem = data[activeIndex];

  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: 32 }}>
      <h2>요일별 매출 통계</h2>
      <div style={{ marginBottom: 16 }}>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i} value={thisYear - i}>
              {thisYear - i}년
            </option>
          ))}
        </select>
        <select
          value={quarter}
          onChange={(e) => setQuarter(Number(e.target.value))}
          style={{ marginLeft: 8 }}
        >
          <option value={1}>1분기(1~3월)</option>
          <option value={2}>2분기(4~6월)</option>
          <option value={3}>3분기(7~9월)</option>
          <option value={4}>4분기(10~12월)</option>
        </select>
      </div>

      {loading ? (
        <div>불러오는 중...</div>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total">
              {data.map((entry, idx) => (
                <Cell
                  key={idx}
                  cursor="pointer"
                  fill={idx === activeIndex ? "#82ca9d" : "#8884d8"}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      <p style={{ textAlign: "center", marginTop: 16 }}>
        {`'${activeItem.name}'요일 매출: ${activeItem.total.toLocaleString()}원`}
      </p>
    </div>
  );
}



// //views/statistics/revenue/RevenueWeekday.tsx

// import { getWeekdayRevenue } from "@/apis/statistics/revenue/weekday";
// import React, { useState, useEffect } from "react";
// import { useCookies } from "react-cookie";
// import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


// function RevenueWeekday() {

//    const [cookies] = useCookies(['accessToken']);
//   const accessToken = cookies.accessToken;
  
//   const thisYear = new Date().getFullYear();
//   const [year, setYear] = useState(thisYear);
//   const [quarter, setQuarter] = useState(1);
//   const [data, setData] = useState([
//     { name: '월', total: 0 }, { name: '화', total: 0 }, { name: '수', total: 0 },
//     { name: '목', total: 0 }, { name: '금', total: 0 }, { name: '토', total: 0 }, { name: '일', total: 0 },
//   ]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [loading, setLoading] = useState(false);

// type WeekdayRevenue = { weekday: string; total: number };

// useEffect(() => {
//   setLoading(true);
//   getWeekdayRevenue(year, quarter,accessToken)
//     .then((result: WeekdayRevenue[]) => {
//       const days = ["월", "화", "수", "목", "금", "토", "일"];
//       const mapped = days.map(wd => {
//         const found = result.find(item => item.weekday === wd);  // ← result를 사용
//         return {
//           name: wd,
//           total: found ? found.total : 0
//         };
//       });
//       setData(mapped);


//       // setData(
//       //   days.map(wd => {
//       //     const found = result.find((d) => d.weekday === wd);
//       //     return found
//       //       ? { name: wd, total: found.total }
//       //       : { name: wd, total: 0 }
//       //   })
//       // );
//     })
//     .finally(() => setLoading(false));
// }, [year, quarter,accessToken]);


//   const activeItem = data[activeIndex];

//   return (
//     <div style={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: 32 }}>
//       <h2>요일별 매출 통계</h2>
//       <div style={{ marginBottom: 16 }}>
//         <select value={year} onChange={e => setYear(Number(e.target.value))}>
//           {Array.from({ length: 5 }, (_, i) => (
//             <option key={i} value={thisYear - i}>{thisYear - i}년</option>
//           ))}
//         </select>
//         <select value={quarter} onChange={e => setQuarter(Number(e.target.value))} style={{ marginLeft: 8 }}>
//           <option value={1}>1분기(1~3월)</option>
//           <option value={2}>2분기(4~6월)</option>
//           <option value={3}>3분기(7~9월)</option>
//           <option value={4}>4분기(10~12월)</option>
//         </select>
//       </div>
//       {loading ? (
//         <div>불러오는 중...</div>
//       ) : (
//         <ResponsiveContainer width="100%" height={240}>
//           <BarChart data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="total">
//               {data.map((entry, idx) => (
//         <Cell
//           key={`cell-${idx}`}
//           cursor="pointer"
//           fill={idx === activeIndex ? "#82ca9d" : "#8884d8"}
//           onClick={() => setActiveIndex(idx)}  // ← 여기에 onClick
//         />
//       ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       )}
//       <p style={{ textAlign: 'center', marginTop: 16 }}>
//         {`'${activeItem.name}'요일 매출: ${activeItem.total.toLocaleString()}원`}
//       </p>
//     </div>
//   );
// }

// export default RevenueWeekday;
