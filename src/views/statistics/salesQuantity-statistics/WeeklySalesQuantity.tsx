import { getDailySalesQuantity, getWeeklySalesQuantity } from '@/apis/statistics/salesQuantityStatistics/salesQuantityStatistics';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';
import { parseISO, getWeekOfMonth, lastDayOfMonth } from 'date-fns';

type ChartData = { name: string; total: number };

function WeeklySalesQuantity() {
  const [cookies] = useCookies(["accessToken"]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const thisYear = new Date().getFullYear();

  const [month, setMonth] = useState<number | null>(new Date().getMonth() + 1);
  
  const token = cookies.accessToken as string;

  const getKoreanWeekLabel = (weekNumber: number, month: number) => {
    const label = ['첫째', '둘째', '셋째', '넷째', '다섯째'];
    return `${month}월 ${label[weekNumber - 1]}주`;
  };

  // 새로고침하면 차트 갱신
  const onFetchChart = async() => {
    setMonth(new Date().getMonth() + 1);

    if (!token) return;
    setLoading(true);
    
    const response = await getWeeklySalesQuantity(token);
    const {code, message, data} = response;
    
    if (Array.isArray(data)) {
      const lastDate = lastDayOfMonth(new Date(thisYear, month! - 1)); 
      const maxWeek = getWeekOfMonth(lastDate);
    
      const fullWeeksMap = new Map<string, number>();
      for (let weekNum = 1; weekNum <= maxWeek; weekNum++) {
        const label = getKoreanWeekLabel(weekNum, month!);
        fullWeeksMap.set(label, 0);
      }

      data.forEach((item) => {
        if (!item.orderDate) return;

        const date = parseISO(item.orderDate);
        if ((date.getMonth() + 1) !== month) return; 

        const week = getWeekOfMonth(date);
        const label = getKoreanWeekLabel(week, month);

        fullWeeksMap.set(label, (fullWeeksMap.get(label) ?? 0) + item.totalSales);
      });

      
      setChartData(Array.from(fullWeeksMap, ([name, total]) => ({ name, total })));
      }
      setLoading(false);
    };

  // 차트 처음 불러오기
  useEffect(() => {
    onFetchChart();
  }, []);
  
  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: 32 }}>
      <h4>주간 통계 [{month}월]</h4>
    
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
                <Cell
                  key={idx}
                  cursor="pointer"
                  fill="#8884d8"
                />
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

export default WeeklySalesQuantity