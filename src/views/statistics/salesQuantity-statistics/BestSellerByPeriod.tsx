import {
  getMonthlyBestSellers,
  getWeeklyBestSellers,
  getYearlyBestSellers,
} from "@/apis/statistics/salesQuantityStatistics/salesQuantityStatistics";
import { BestSellerResponseDto } from "@/dtos/statistics/salesQuantityStatistics/response/bestSeller.reponse.dto";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

function BestSellerByPeriod() {
  const [bestSeller, setBestSeller] = useState<BestSellerResponseDto[]>([]);
  const [cookies] = useCookies(["accessToken"]);
  const [bestSellerTitle, setBestSellerTitle] = useState("");

  const onWeeklyBestSellers = async () => {
    const token = cookies.accessToken;

    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    const response = await getWeeklyBestSellers(token);
    const { code, message, data } = response;

    if (code != "SU") {
      return;
    }

    if (Array.isArray(data)) {
      setBestSeller(data);
      // setMessage("");
    } else {
      // setMessage("올바른 검색 조건을 입력해주세요.");
    }
  };
  const onMonthlyBestSellers = async () => {
    const token = cookies.accessToken;

    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    const response = await getMonthlyBestSellers(token);
    const { code, message, data } = response;

    if (!code) {
      // setMessage(message);
      return;
    }

    if (Array.isArray(data)) {
      setBestSeller(data);
      // setMessage("");
    } else {
      // setMessage("올바른 검색 조건을 입력해주세요.");
    }
  };
  const onYearlyBestSellers = async () => {
    const token = cookies.accessToken;

    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    const response = await getYearlyBestSellers(token);
    const { code, message, data } = response;

    if (!code) {
      // setMessage(message);
      return;
    }

    if (Array.isArray(data)) {
      setBestSeller(data);
      // setMessage("");
    } else {
      // setMessage("올바른 검색 조건을 입력해주세요.");
    }
  };

  const bestSellerList = bestSeller.map((book, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{book.isbn}</td>
        <td>{book.bookTitle}</td>
        <td>{book.authorName}</td>
        <td>{book.publisherName}</td>
        <td>{book.categoryName}</td>
        <td>{book.coverUrl}</td>
        <td>{book.totalSales}</td>
      </tr>
    );
  });

  return (
    <div>
      <h2>기간별 베스트셀러 순위</h2>
      <div
        style={{ display: "flex", justifyContent: "space-between", height: 30 }}
      >
        <div style={{ display: "flex", height: 30, padding: 0 }}>
          <button
            className="searchAll"
            style={{ backgroundColor: "#2b5480" }}
            onClick={() => {
              onWeeklyBestSellers(), setBestSellerTitle("주간 베스트셀러");
            }}
          >
            주간 베스트셀러
          </button>
          <button
            className="searchAll"
            style={{ backgroundColor: "#2b5480" }}
            onClick={() => {onMonthlyBestSellers(), setBestSellerTitle("월간 베스트셀러");}}
          >
            월간 베스트셀러
          </button>
          <button
            className="searchAll"
            style={{ backgroundColor: "#2b5480" }}
            onClick={() => {onYearlyBestSellers(), setBestSellerTitle("연간 베스트셀러") }}
          >
            연간 베스트셀러
          </button>
        </div>
        <div style={{ height: 30 }}>
          <h3 style={{ marginTop: 0 }}>{bestSellerTitle}</h3>
        </div>
      </div>
      {bestSeller && (
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>ISBN</th>
              <th>책 제목</th>
              <th>저자</th>
              <th>출판사</th>
              <th>카테고리</th>
              <th>표지</th>
              <th>판매량</th>
            </tr>
          </thead>
          <tbody>{bestSellerList}</tbody>
        </table>
      )}
    </div>
  );
}

export default BestSellerByPeriod;
