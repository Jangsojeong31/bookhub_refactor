import { Route } from "react-router-dom";
import ReceptionConfirm from "./ReceptionConfirm";
import ReceptionPending from "./ReceptionPending";
import AdminReceptionList from "./AdminReceptionList";
import RequireAuth from "@/components/auth/RequireAuth";

function Reception() {
  return (
    <>
      <Route path="/reception/confirmed" element={<ReceptionConfirm />} />
      <Route path="/reception/pending" element={<ReceptionPending />} />
      <Route
        path="/reception/logs"
        element={
          <RequireAuth allowedRoles={["ADMIN"]}>
            <AdminReceptionList />
          </RequireAuth>
        }
      />
    </>
  );
}

export default Reception;
