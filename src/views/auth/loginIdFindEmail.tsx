import { loginIdFindSendEmailRequest } from "@/apis/auth/auth";
import { LoginIdFindSendEmailRequestDto } from "@/dtos/auth/request/login-id-find-email.request.dto";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginIdFindEmail() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
    return;
  },[form])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onEmailSendClick = async () => {
    const { email, phoneNumber } = form;

    if (!email || !phoneNumber) {
      setMessage("모든 항목을 입력하세요");
      return;
    }

    const requestBody: LoginIdFindSendEmailRequestDto = { email, phoneNumber };
    const response = await loginIdFindSendEmailRequest(requestBody);
    const { code, message } = response;

    if (code != "SU") {
      setMessage("이메일 전송 실패: " + message);
    } else{
      alert("이메일 전송 성공");
      navigate("/auth/login")
    }
  };

  return (
    <div>
      <h1>아이디 찾기</h1>
      <input
        type="email"
        placeholder="이메일"
        name="email"
        value={form.email}
        onChange={onInputChange}
      />
      <br />
      <input
        type="tel"
        placeholder="전화번호"
        name="phoneNumber"
        value={form.phoneNumber}
        onChange={onInputChange}
      />
      <br />
      <button onClick={onEmailSendClick}>이메일 전송</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginIdFindEmail;
