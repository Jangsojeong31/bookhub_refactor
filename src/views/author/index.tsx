import React from "react";
import { Route } from "react-router-dom";
import CreateAuthor from "./CreateAuthor";
import ElseAuthor from "./ElseAuthor";
import RequireAuth from "@/components/auth/RequireAuth";

function Author() {
  return (
    <>
      <Route
        path="/author/create"
        element={
          <RequireAuth allowedRoles={["ADMIN"]}>
            <CreateAuthor />
          </RequireAuth>
        }
      />
      <Route path="/author/else" element={<ElseAuthor />} />
    </>
  );
}

export default Author;
