import { zeroStockRequest } from "@/apis/statistics/stocksStatistics/stocksStatistics";
import { ZeroStockResponseDto } from "@/dtos/statistics/StocksStatistics/response/zeroStock.response.dto";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ZeroStockStatistics() {
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  const [data, setData] = useState<ZeroStockResponseDto[]>([]);
  const [loading, setLoading] = useState(false);

  const onFetchZeroStockCountChart = async () => {
    if (!token) {
      alert("권한이 없습니다.");
      return;
    }

    setLoading(true);

    const response = await zeroStockRequest(token);
    const { code, message, data } = response;

    if (code == "SU" && data) {
      setData(data);
    } else {
      console.error(message);
      return;
    }

    setLoading(false);
  };

  useEffect(() => {
    onFetchZeroStockCountChart();
  },[]);

  return (
    <>
      <div>
        <button onClick={onFetchZeroStockCountChart}>새로고침</button>
        <h2>재고가 0인 책 개수</h2>
      </div>
      {loading ? (
        <div>불러오는 중...</div>
      ) : (
        <div style={{ overflowX: "auto", width: 1200, overflowY: "clip" }}>
          <div style={{ width: `${data.length * 100}px`, height: 700 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="branchName"
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="zeroStockCount"
                  name="책 개수"
                  fill="#eac360"
                ></Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}

export default ZeroStockStatistics;
