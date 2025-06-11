/** @jsxImportSource @emotion/react */
import { signUpRequest } from "@/apis/auth/auth";
import { SignUpRequestDto } from "@/dtos/auth/request/sign-up.request.dto";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Branch {
  branchId: number;
  branchName: string;
  branchLocation: string;
}

function SignUp() {
  const navigate = useNavigate();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [form, setForm] = useState({
    loginId: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    branchId: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/auth/branches?branchLocation=전체`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBranches(data.data);
      })
      .catch((e) => console.error(e));
  }, []);

  const [message, setMessage] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectBrancId = e.target.value;
    setForm({ ...form, branchId: Number(selectBrancId) });
  };

  const onSignUpclick = async () => {
    const {
      loginId,
      password,
      confirmPassword,
      name,
      email,
      phoneNumber,
      birthDate,
      branchId,
    } = form;

    if (
      !loginId ||
      !password ||
      !confirmPassword ||
      !name ||
      !email ||
      !phoneNumber ||
      !birthDate
    ) {
      setMessage("모든 항목을 입력해 주세요");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!branchId || branchId === 0) {
      setMessage("지점을 선택해 주세요");
      return;
    }

    const requestBody: SignUpRequestDto = {
      loginId,
      password,
      confirmPassword,
      name,
      email,
      phoneNumber,
      birthDate,
      branchId,
    };

    const response = await signUpRequest(requestBody);
    const { code, message } = response;

    if (code !== "SU") {
      alert("회원가입 실패: " + message);
      return;
    } else {
      alert("회원가입을 성공: " + message);
      navigate("/auth");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input
        type="text"
        placeholder="아이디"
        name="loginId"
        value={form.loginId}
        onChange={onInputChange}
      />
      <br />
      <input
        type="password"
        placeholder="비밀번호"
        name="password"
        value={form.password}
        onChange={onInputChange}
      />
      <br />
      <input
        type="password"
        placeholder="비밀번호 확인"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={onInputChange}
      />
      <br />
      <input
        type="text"
        placeholder="이름"
        name="name"
        value={form.name}
        onChange={onInputChange}
      />
      <br />
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
      <input
        type="date"
        placeholder="생년월일"
        name="birthDate"
        value={form.birthDate}
        onChange={onInputChange}
      />
      <br />
      <select value={form.branchId} onChange={onSelectChange}>
        <option value={0}>지점을 선택하세요</option>
        {branches.map((branch) => (
          <option value={branch.branchId}>{branch.branchName}</option>
        ))}
      </select>
      <button onClick={onSignUpclick}>회원가입</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignUp;
