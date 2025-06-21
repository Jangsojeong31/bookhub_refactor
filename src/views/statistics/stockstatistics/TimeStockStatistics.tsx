import { timeStockChartrequest } from "@/apis/statistics/stocksStatistics/stocksStatistics";
import { TimeStockChartResponseDto } from "@/dtos/statistics/StocksStatistics/response/timestockchart.response.dto";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#9e6d0a",
  "#ff7300",
  "#9fb547",
  "#a4de6c",
  "#8dd1e1",
  "#83a6ed",
];

function TimeStockStatistics() {
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  const [searchParam, setSearchParam] = useState<{ year: number | "" }>({
    year: "",
  });

  const [data, setData] = useState<TimeStockChartResponseDto[]>([]);
  const [loading, setLoading] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParam({
      ...searchParam,
      [name]: value === "" ? "" : parseInt(value),
    });
  };

  const onSearchClick = async () => {
    if (
      !searchParam.year ||
      Number(searchParam.year) > new Date().getFullYear()
    ) {
      alert("유효한 연도를 입력하세요.");
      return;
    }

    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    setLoading(true);

    const response = await timeStockChartrequest(
      { year: Number(searchParam.year) },
      token
    );
    const { code, message, data } = response;

    if (code === "SU" && data) {
      setData(data);
      console.log(data);
    } else {
      console.error(message);
    }

    setLoading(false);
  };

  const branches = Array.from(new Set(data.map((d) => d.branchName)));

  const currentYear = new Date().getFullYear();
  const currentMonth =
    currentYear === Number(searchParam.year) ? new Date().getMonth() + 1 : 12;

  const chartData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const monthData: any = { month: `${month}월` };

    if (month > currentMonth) {
      branches.forEach((branch) => {
        monthData[`${branch}_in`] = null;
        monthData[`${branch}_out`] = null;
      });
    } else {
      branches.forEach((branch) => {
        const item = data.find(
          (d) => d.branchName === branch && d.month === month
        );

        monthData[`${branch}_in`] = item?.inAmount ?? 0;
        monthData[`${branch}_loss`] = item?.lossAmount ?? 0;
      });
    }

    return monthData;
  });

  return (
    <div>
      <div>
        <input
          type="text"
          name="year"
          placeholder="연도 입력"
          value={searchParam.year}
          onChange={onInputChange}
        />
        <button onClick={onSearchClick}>검색</button>
      </div>
      {data.length > 0 && (
        <>
          <h2>월별 지점 입고량</h2>
          <ResponsiveContainer width={1100} height={800}>
            <LineChart
              data={chartData}
              margin={{ top: 30, right: 30, left: 30, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {branches.map((branch, idx) => (
                <Line
                  key={`${branch} - in`}
                  type="monotone"
                  dataKey={`${branch}_in`}
                  stroke={COLORS[idx % COLORS.length]}
                  name={`${branch}`}
                  strokeWidth={2}
                  connectNulls={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </>
      )}

      {data.length > 0 && (
        <>
          <h2>월별 지점 손실량</h2>
          <ResponsiveContainer width={1100} height={800}>
            <LineChart
              data={chartData}
              margin={{ top: 30, right: 30, left: 30, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {branches.map((branch, idx) => (
                <Line
                  key={`${branch} - loss`}
                  type="monotone"
                  dataKey={`${branch}_loss`}
                  stroke={COLORS[idx % COLORS.length]}
                  name={`${branch}`}
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  connectNulls={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default TimeStockStatistics;
