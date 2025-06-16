import React from "react";
import { Route } from "react-router-dom";
import EmployeeSearch from "./EmployeeSearch";

function Employee() {
  return (
    <>
      <Route path="/employees" element={<EmployeeSearch/>} />
    </>
  );
}

export default Employee;
