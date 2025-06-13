import React from "react";
import { Route } from "react-router-dom";
import Branch from "./Branch";

function index() {
  return (
    <>
      <Route path="/auth/branches" element={<Branch />} />
    </>
  );
}

export default index;
