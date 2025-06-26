import { getCategoryTree } from "@/apis/category/category";
import { getBestSellersByCategory } from "@/apis/statistics/salesQuantityStatistics/salesQuantityStatistics";
import { CategoryTreeResponseDto } from "@/dtos/category/response/category-tree.response.dto";
import { BestSellerResponseDto } from "@/dtos/statistics/salesQuantityStatistics/response/bestSeller.reponse.dto";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function BestSellerByCategory() {
  const [bestSeller, setBestSeller] = useState<BestSellerResponseDto[]>([]);
  const [cookies] = useCookies(["accessToken"]);
  const [topCategory, setTopCategory] = useState<"DOMESTIC" | "FOREIGN">(
    "DOMESTIC"
  );
  const [bottomCategoryId, setBottomCategoryId] = useState("");
  const [categoryList, setCategoryList] = useState<CategoryTreeResponseDto[]>(
    []
  );

  const token = cookies.accessToken;

  // 상위 카테고리 선택하면 하위 카테고리 리스트 불러옴
  useEffect(() => {
    const fetchBottomCategory = async () => {
      const response = await getCategoryTree(topCategory, cookies.accessToken);
      const { code, message, data } = response;

      if (code != "SU") {
        // setMessage(message);
        return;
      }

      if (Array.isArray(data)) {
        setCategoryList(data);
        setBottomCategoryId("");
      } else {
        alert("잘못된 접근입니다.");
      }
    };

    fetchBottomCategory();
  }, [topCategory]);

  // 하위 카테고리를 선택하면 해당 카테고리의 베스트셀러 순위 불러옴
  useEffect(() => {
    const fetchDataByCategory = async () => {
      if (!token) {
        alert("인증 토큰이 없습니다.");
        return;
      }

      const response = await getBestSellersByCategory(
        Number(bottomCategoryId),
        token
      );
      const { code, message, data } = response;

      if (code != "SU") {
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

    fetchDataByCategory();
  }, [bottomCategoryId]);

  // 상위 카테고리 선택 핸들러 (국내 / 해외)
  const handleTopCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTopCategory(event.target.value as "DOMESTIC" | "FOREIGN");
  };

  // 하위 카테고리 선택 핸들러
  const handleBottomCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBottomCategoryId(event.target.value);
  };

  // 하위 카테고리 옵션 렌더링
  const categoryOption = categoryList.map((category, index) => {
    return (
      <option key={index} value={category.categoryId}>
        {category.categoryName}
      </option>
    );
  });

  // 베스트셀러 순위 렌더링
  const bestSellerList = bestSeller.map((book, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{book.isbn}</td>
        <td>{book.bookTitle}</td>
        <td>{book.authorName}</td>
        <td>{book.publisherName}</td>
        <td>{book.categoryName}</td>
        <td>
          <img src={book.coverUrl} alt="표지" width={50} />
        </td>
        <td>{book.totalSales}</td>
      </tr>
    );
  });

  return (
    <div>
      <h2>카테고리별 베스트셀러 순위</h2>
      <p>국내 / 해외</p>
      <select
        id="topCategory"
        value={topCategory}
        onChange={handleTopCategoryChange}
      >
        <option value="DOMESTIC">국내 도서</option>
        <option value="FOREIGN">해외 도서</option>
      </select>

      <p>하위 카테고리</p>
      <select
        id="bottomCategory"
        value={bottomCategoryId}
        onChange={handleBottomCategoryChange}
      >
        {/* <option value="ALL">전체</option> */}
        <option value="" disabled hidden>
          하위 카테고리를 선택해주세요
        </option>
        {categoryOption}
      </select>

      {bestSeller && (
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>ISBN</th>
              <th>책 제목</th>
              <th>저자</th>
              <th>출판사</th>
              <th>세부 카테고리</th>
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

export default BestSellerByCategory;
