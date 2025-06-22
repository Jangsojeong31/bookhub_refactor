import { getTop100BestSellers } from "@/apis/statistics/salesQuantityStatistics/salesQuantityStatistics";
import { BestSellerResponseDto } from "@/dtos/statistics/salesQuantityStatistics/response/bestSeller.reponse.dto";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";

function TotalBestSeller() {
  const [bestSeller, setBestSeller] = useState<BestSellerResponseDto[]>([]);
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    const getTotalBestSellers = async () => {
      const token = cookies.accessToken;

      if (!token) {
        alert("인증 토큰이 없습니다.");
        return;
      }

      const response = await getTop100BestSellers(token);
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
    getTotalBestSellers();
  }, [cookies.accessToken]);

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
      <h2>총합 베스트셀러 순위</h2>
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

export default TotalBestSeller;
