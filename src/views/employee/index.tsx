import React from "react";
import { Route } from "react-router-dom";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeSignUpApprovals from "./employeeSignUpApprovals/employeeSignUpApprovals";


function Employee() {
  return (
    <>
      <Route path="/employees" element={<EmployeeSearch/>} />
      <Route path="/employees/approval" element={<EmployeeSignUpApprovals/>} />
    </>
  );
}

export default Employee;
