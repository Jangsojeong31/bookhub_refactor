import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateAuthor from "../author/CreateAuthor";
import ElseAuthor from "../author/ElseAuthor";
import CreatePurchaseOrder from "./CreatePurchaseOrder";
import ElsePurchaseOrder from "./ElsePurchaseOrder";
import ApprovePurchaseOrder from "./purchaseOrderApproval/ApprovePurchaseOrder";
import ElsePurchaseOrderApproval from "./purchaseOrderApproval/ElsePurchaseOrderApproval";
import RequireAuth from "@/components/auth/RequireAuth";

function PurchaseOrder() {
  return (
    <>
<<<<<<< refactor/files-jsj
      {/* <Route path= '/purchase-order/create' element={<CreatePurchaseOrder />} /> */}
      <Route path= '/purchase-order' element={<ElsePurchaseOrder />} />
      <Route path= '/purchase-order/approve' element={<ApprovePurchaseOrder />} />
      <Route path= '/purchase-order-approval' element={<ElsePurchaseOrderApproval />} />
=======
      <Route path="/purchase-order/create" element={<CreatePurchaseOrder />} />
      <Route path="/purchase-order/else" element={<ElsePurchaseOrder />} />
      <Route
        path="/purchase-order/approve"
        element={
          <RequireAuth allowedRoles={["ADMIN"]}>
            <ApprovePurchaseOrder />
          </RequireAuth>
        }
      />
      <Route
        path="/purchase-order-approval"
        element={
          <RequireAuth allowedRoles={["ADMIN"]}>
            <ElsePurchaseOrderApproval />
          </RequireAuth>
        }
      />
>>>>>>> develop
    </>
  );
}

export default PurchaseOrder;
