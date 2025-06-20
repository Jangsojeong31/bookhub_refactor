import React from 'react'
import { Route } from 'react-router-dom'
import TotalBestSeller from './TotalBestSeller'
import BestSellerByPeriod from './BestSellerByPeriod'
import BestSellerByCategory from './BestSellerByCategory'
import SalesQuantityByBranch from './SalesQuantityByBranch'

function SalesQuantityStatistics() {
  return (
    <>
      <Route path="/best-seller" element={<TotalBestSeller />} />
      <Route path="/best-seller/period" element={<BestSellerByPeriod />} />
      <Route path="/best-seller/category" element={<BestSellerByCategory />} />

      <Route path="/sales-quantity/branch" element={<SalesQuantityByBranch />} />
    </>
  )
}

export default SalesQuantityStatistics