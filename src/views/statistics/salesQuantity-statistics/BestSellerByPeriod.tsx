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
      <button
        className="searchAll"
        style={{ backgroundColor: "#2b5480" }}
        onClick={onWeeklyBestSellers}
      >
        주간 베스트셀러
      </button>
      <button
        className="searchAll"
        style={{ backgroundColor: "#2b5480" }}
        onClick={onMonthlyBestSellers}
      >
        월간 베스트셀러
      </button>
      <button
        className="searchAll"
        style={{ backgroundColor: "#2b5480" }}
        onClick={onYearlyBestSellers}
      >
        연간 베스트셀러
      </button>
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
