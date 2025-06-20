import { Route } from "react-router-dom"
import ReceptionConfirm from "./ReceptionConfirm"
import ReceptionPending from "./ReceptionPending"
import AdminReceptionList from "./AdminReceptionList"

function Reception() {
  return (
    <>
      <Route path="/reception/confirmed" element={<ReceptionConfirm />} />
      <Route path="/reception/pending" element={<ReceptionPending />} />
      <Route path="/reception/logs" element={<AdminReceptionList />} />
    </>
  )
}

export default Reception