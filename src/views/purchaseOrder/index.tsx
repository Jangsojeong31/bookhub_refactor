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
    </>
  );
}

export default PurchaseOrder;
