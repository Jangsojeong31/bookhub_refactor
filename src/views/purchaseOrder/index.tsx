import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateAuthor from '../author/CreateAuthor'
import ElseAuthor from '../author/ElseAuthor'
import CreatePurchaseOrder from './CreatePurchaseOrder'
import ElsePurchaseOrder from './ElsePurchaseOrder'

function PurchaseOrder() {
  return (
    <>
      <Route path= '/purchase-order-create' element={<CreatePurchaseOrder />} />
      <Route path= '/purchase-order-else' element={<ElsePurchaseOrder />} />
    </>
  )
}

export default PurchaseOrder