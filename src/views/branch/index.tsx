import React from "react";
import { Route } from "react-router-dom";
import BranchSearch from "./BranchSearch";


function Branch() {
  return (
    <>
      <Route path="/branches" element={<BranchSearch />} />
    </>
  );
}

export default Branch;
