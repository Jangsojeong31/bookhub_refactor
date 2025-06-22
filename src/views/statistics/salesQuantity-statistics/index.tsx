import React from 'react'
import { Route } from 'react-router-dom'
import TotalBestSeller from './BestSellerTotal'
import BestSellerByPeriod from './BestSellerByPeriod'
import BestSellerByCategory from './BestSellerByCategory'
import SalesQuantityByPeriod from './SalesQuantityByPeriod'
import SaleQuantityByBranch from './SalesQauntityByBranch'
import SalesQuantityByDiscountPolicy from './SalesQuantityByDiscountPolicy'
import SalesQuantityByCategory from './SalesQuantityByCategory'

function SalesQuantityStatistics() {
  return (
    <>
      <Route path="/best-seller" element={<TotalBestSeller />} />
      <Route path="/best-seller/period" element={<BestSellerByPeriod />} />
      <Route path="/best-seller/category" element={<BestSellerByCategory />} />

      <Route path="/statistics/sales-quantity/branch" element={<SaleQuantityByBranch />} />
      <Route path="/statistics/sales-quantity/period" element={<SalesQuantityByPeriod />} />
      <Route path="/statistics/sales-quantity/discount-policy" element={<SalesQuantityByDiscountPolicy />} />
      <Route path="/statistics/sales-quantity/category" element={<SalesQuantityByCategory />} />
    </>
  )
}

export default SalesQuantityStatistics