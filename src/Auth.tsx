import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./views/auth/SignUp";

function Auth() {
  return (
    <>
    <Routes>
      <Route>
        <Route path="/auth/sign-up" element={<SignUp />} />
      </Route>
    </Routes>
    </>
  );
}

export default Auth;
