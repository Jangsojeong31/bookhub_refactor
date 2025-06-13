import React from "react";
import { Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import LoginIdFindEmail from "./LoginIdFindEmail";
import LoginIdGet from "./LoginIdGet";
import PasswordChangeSendEmail from "./PasswordChangeSendEmail";
import PasswordChange from "./passwordChange";


function Auth() {
  return (
    <>
      <Route path="/auth/login" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/auth/login-id-found/email" element={<LoginIdFindEmail />} />
      <Route path="/auth/login-id-found" element={<LoginIdGet />} />
      <Route path="/auth/password-change" element={<PasswordChange/>} />
      <Route path="/auth/password-change/email" element={<PasswordChangeSendEmail />} />
    </>
  );
}

export default Auth;
