import { Route } from "react-router-dom";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeSignUpApprovals from "./employeeSignUpApprovals/employeeSignUpApprovals";
import EmployeeChange from "./EmployeeChange";
import EmployeeSignUpApprovalsSearch from "./employeeSignUpApprovals/EmployeeSignUpApprovalsSearch";
import EmployeeChangeLogsSearch from "./employeeChangeLogs/EmployeeChangeLogsSearch";


function Employee() {
  return (
    <>
      <Route path="/employees" element={<EmployeeSearch/>} />
      <Route path="/employees/approval" element={<EmployeeSignUpApprovals/>} />
      <Route path="/employees/edit" element={<EmployeeChange/>} />
      <Route path="/members/approval/logs" element={<EmployeeSignUpApprovalsSearch/>} />
      <Route path="/members/logs" element={<EmployeeChangeLogsSearch/>} />
    </>
  );
}

export default Employee;
