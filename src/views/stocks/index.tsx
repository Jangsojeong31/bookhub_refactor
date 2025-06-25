import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StockPage from './StockPage'

function Stock() {
  return (
    <Routes>
      <Route path = "/" element = {<StockPage/>}/>
     
      <Route path = "/search/:branchId" element = {<StockPage/>}/>
      <Route path = "/search/title" element = {<StockPage/>}/>
      <Route path = "/search/book/:bookIsbn" element = {<StockPage/>}/>
    </Routes>
  )
}

export default Stock

// //&Stock
// !1> Stock base Url
//  const STOCK_BASE_URL =  `${API_DOMAIN}/api/v1/${MANAGER}/stocks`;
// !Stock update Url
// export const UPDATE_STOCK_URL = (branchId : number, stockId : number) => `${STOCK_BASE_URL}/branch/${branchId}/${stockId}`;

// !2>책 검색 base Url
// export const STOCK_SEARCH_BASE_URL =  `${STOCK_BASE_URL}/search`;
// !1)책 Isbn 재고 전체 조회
//export const STOCK_SEARCH_BOOK_URL = (bookIsbn : string) => `${STOCK_SEARCH_BASE_URL}/book/${bookIsbn}`;
// !2)책 제목 재고 전체 조회
// export const STOCK_SEARCH_TITLE_URL =  `${STOCK_SEARCH_BASE_URL}/title`;
// !3)책 지점 기준 전체 조회
// export const STOCK_SEARCH_BRANCH_URL =  (branchId : number) => `${STOCK_SEARCH_BASE_URL}/${branchId}`;