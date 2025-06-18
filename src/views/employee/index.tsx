import React from "react";
import { Route } from "react-router-dom";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeSignUpApprovals from "./employeeSignUpApprovals/employeeSignUpApprovals";
import EmployeeChange from "./employeeChangeLogs/EmployeeChange";


function Employee() {
  return (
    <>
      <Route path="/employees" element={<EmployeeSearch/>} />
      <Route path="/employees/approval" element={<EmployeeSignUpApprovals/>} />
      <Route path="/employees/edit" element={<EmployeeChange/>} />
    </>
  );
}

export default Employee;
