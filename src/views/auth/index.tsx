import React from "react";
import { Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import LoginIdFindEmail from "./loginIdFindEmail";
import LoginIdGet from "./loginIdGet";
import PasswordChange from "./passwordChange";
import PasswordChangeSendEmail from "./PasswordChangeSendEmail";



function Auth() {
  return (
    <>
      <Route path="/auth/login" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/auth/login-id-find/email" element={<LoginIdFindEmail />} />
      <Route path="/auth/login-id-find" element={<LoginIdGet />} />
      <Route path="/auth/password-change" element={<PasswordChange/>} />
      <Route path="/auth/password-change/email" element={<PasswordChangeSendEmail />} />
    </>
  );
}

export default Auth;
