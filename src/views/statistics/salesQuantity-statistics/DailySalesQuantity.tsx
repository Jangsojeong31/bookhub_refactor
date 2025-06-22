import {
  getDailySalesQuantity,
  getSalesQuantityByBranch,
} from "@/apis/statistics/salesQuantityStatistics/salesQuantityStatistics";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from "recharts";

type ChartData = { name: string; total: number };

function DailySalesQuantity() {
  const [cookies] = useCookies(["accessToken"]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const today = new Date();
  const dayRange = Array.from({ length: 15 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - 14 + i);
    return day;
  });

  const token = cookies.accessToken as string;

  // 새로고침하면 차트 갱신
  const onFetchChart = async () => {
    if (!token) return;
    setLoading(true);

    const response = await getDailySalesQuantity(token);
    const { code, message, data } = response;

    if (code != "SU") {
      // setMessage(message);
      return;
    }

    if (Array.isArray(data)) {
      const mapped = dayRange.map((day) => {
        const foundData = data.find((item) => {
          const d = new Date(item.orderDate!);
          return d.toDateString() === day.toDateString(); // 날짜 완전 일치
        });

        return {
          name: `${day.getMonth() + 1}/${day.getDate()}`,
          total: foundData ? foundData.totalSales : 0,
        };
      });
      setChartData(mapped);
    }
    setLoading(false);
  };

  // 차트 처음 불러오기
  useEffect(() => {
    onFetchChart();
  }, []);

  return (
    <div
      style={{ width: "100%", maxWidth: 1400, margin: "0 auto", padding: 32 }}
    >
      <h4>일일 통계</h4>

      <div style={{ margin: 16 }}>
        <button onClick={onFetchChart}>새로고침</button>
      </div>

      {loading ? (
        <div>불러오는 중...</div>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total">
              {chartData.map((data, idx) => (
                <Cell key={idx} cursor="pointer" fill="#8884d8" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      <p style={{ textAlign: "center", marginTop: 16 }}>
        {/* {`'${activeItem.name}'요일 매출: ${activeItem.total.toLocaleString()}원`} */}
      </p>
    </div>
  );
}

export default DailySalesQuantity;
