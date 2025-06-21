import { branchStockBarChartRequest } from "@/apis/statistics/stocksStatistics/stocksStatistics";
import { BranchStockBarChartResponseDto } from "@/dtos/statistics/StocksStatistics/response/branchStockBarChart.response.dto";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BranchStockStatistics() {
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  const [searchParams, setSearchParams] = useState({
    year: "",
    month: "",
  });
  const [data, setData] = useState<BranchStockBarChartResponseDto[]>([]);
  const [loading, setLoading] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month] = e.target.value.split("-");
    setSearchParams({
      year: year,
      month: month,
    });
  };

  const onSearchClick = async () => {
    setLoading(true);

    const response = await branchStockBarChartRequest(
      {
        year: parseInt(searchParams.year),
        month: parseInt(searchParams.month),
      },
      token
    );
    const { code, message, data } = response;

    if (code == "SU" && data) {
      setData(data);
    } else {
      console.error(message);
    }

    setLoading(false);
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <>
      <div>
        <input
          type="month"
          value={`${searchParams.year}-${searchParams.month
            .toString()
            .padStart(2, "0")}`}
          onChange={onInputChange}
        />
        <button onClick={onSearchClick}>검색</button>
      </div>
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
                dataKey="inAmount"
                stackId="a"
                fill="#4CAF50"
                name="입고량"
              />
              <Bar
                dataKey="outAmount"
                stackId="b"
                fill="#FF9800"
                name="출고량"
              />
              <Bar
                dataKey="lossAmount"
                stackId="c"
                fill="#9E9E9E"
                name="손실량"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default BranchStockStatistics;
