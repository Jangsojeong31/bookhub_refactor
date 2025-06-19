import { getCategoryTree } from '@/apis/category/category';
import { getBestSellersByCategory } from '@/apis/statistics/salesQuantityStatistics/salesQuantityStatistics';
import { CategoryTreeResponseDto } from '@/dtos/category/response/category-tree.response.dto';
import { BestSellerResponseDto } from '@/dtos/statistics/salesQuantityStatistics/response/bestSeller.reponse.dto';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

function BestSellerByCategory() {
  const [bestSeller, setBestSeller] = useState<BestSellerResponseDto[]>([]);
  const [cookies] = useCookies(["accessToken"]);
  const [topCategory, setTopCategory] = useState<"DOMESTIC" | "FOREIGN">("DOMESTIC");
  const [bottomCategory, setBottomCategory] = useState("");
  const [categoryList, setCategoryList] = useState<CategoryTreeResponseDto[]>([]);
  
  const token = cookies.accessToken;

  useEffect(() => {
    const fetchBottomCategory = async() => {
      const response = await getCategoryTree(topCategory, cookies.accessToken);
      const {code, message, data} = response; 
    
      if(!code) {
        // setMessage(message);
        return;
      }
    
      if (Array.isArray(data)) {
        setCategoryList(data);
        if (data.length > 0) {
          setBottomCategory(data[0].categoryName);
        } else {
          setBottomCategory("");
        }
      } else {
        alert('잘못된 접근입니다.')
      }
    };

    fetchBottomCategory();
  }, [topCategory])
  
  // 하위 카테고리를 선택하면 해당 카테고리의 베스트셀러 순위 불러옴
  useEffect(() => {
    const fetchDataByCategory = async() => {

      if(!token){
        alert('인증 토큰이 없습니다.')
        return
      }

      const response = await getBestSellersByCategory(bottomCategory, token);
      const {code, message, data} = response; 

      if(!code) {
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

  }, [bottomCategory]);

  // 상위 카테고리 선택 (국내 / 해외) -> 하위 카테고리 리스트 불러옴
  const handleTopCategoryChange = async(event: React.ChangeEvent<HTMLSelectElement>) => {
    setTopCategory(event.target.value as 'DOMESTIC' | 'FOREIGN');

  };

  // 하위 카테고리 선택
  const handleBottomCategoryChange = async(event: React.ChangeEvent<HTMLSelectElement>) => {
    setBottomCategory(event.target.value)
  };

  // 하위 카테고리 옵션 렌더링
  const categoryOption = categoryList.map((category, index) => {
    return (
      <option key={index} value={category.categoryName}>
        {category.categoryName}
        </option>
    )
  })

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
      )
    })
    
  return (
    <div>
      <p>국내 / 해외</p>
      <select id="topCategory" value={topCategory} onChange={handleTopCategoryChange}>
        <option value="DOMESTIC">국내 도서</option>
        <option value="FOREIGN">해외 도서</option>
      </select>

      <p>하위분류</p>
      <select id="bottomCategory" value={bottomCategory} onChange={handleBottomCategoryChange}>
        {categoryOption}
      </select>

      <p>{topCategory} ▷ {bottomCategory}</p>

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
          <tbody>
            {bestSellerList}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BestSellerByCategory