import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateAuthor from '../author/CreateAuthor'
import ElseAuthor from '../author/ElseAuthor'
import CreatePurchaseOrder from './CreatePurchaseOrder'
import ElsePurchaseOrder from './ElsePurchaseOrder'
import ApprovePurchaseOrder from './purchaseOrderApproval/ApprovePurchaseOrder'
import ElsePurchaseOrderApproval from './purchaseOrderApproval/ElsePurchaseOrderApproval'

function PurchaseOrder() {
  return (
    <>
      <Route path= '/purchase-order/create' element={<CreatePurchaseOrder />} />
      <Route path= '/purchase-order/else' element={<ElsePurchaseOrder />} />
      <Route path= '/purchase-order/approve' element={<ApprovePurchaseOrder />} />
      <Route path= '/purchase-order-approval' element={<ElsePurchaseOrderApproval />} />
    </>
  )
}

export default PurchaseOrder