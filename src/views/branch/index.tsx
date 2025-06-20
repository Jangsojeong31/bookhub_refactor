import React from "react";
import { Route } from "react-router-dom";
import BranchSearch from "./BranchSearch";
import CreateBranch from "./CreateBranch";


function Branch() {
  return (
    <>
      <Route path="/branches" element={<BranchSearch />} />
      <Route path="/branches/manage" element={<CreateBranch />} />
    </>
  );
}

export default Branch;
