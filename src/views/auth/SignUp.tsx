/** @jsxImportSource @emotion/react */
import { checkLoginIdDuplicate, signUpRequest } from "@/apis/auth/auth";
import { GET_BRANCH_URL } from "@/apis/constants/khj.constants";
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

  const loginRegex = /^[A-Za-z][A-Za-z\d]{3,12}/;
  const [loginIdMessage, setLoginIdMessage] = useState("");

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%*?])[A-Za-z\d!@#$%*?]{8,16}$/;
  const [message, setMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");

  useEffect(() => {
    setLoginIdMessage("");
  }, [form.loginId]);

  useEffect(() => {
    setMessage("");
  }, [form]);

  useEffect(() => {
    setPasswordCheckMessage("");
  }, [form.password, form.confirmPassword]);

  useEffect(() => {
    fetch(`${GET_BRANCH_URL}?branchLocation=전체`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBranches(data.data);
      })
      .catch((e) => console.error(e));
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectBranchId = e.target.value;
    setForm({ ...form, branchId: Number(selectBranchId) });
  };

  const onPasswordBlur = async () => {
    if (form.password) {
      if (!passwordRegex.test(form.password)) {
        setPasswordCheckMessage(
          "8~16자 영문, 숫자, 특수문자 모두 포함되어야 합니다."
        );
        return;
      }
    }
    if (form.confirmPassword && form.password) {
      if (form.password !== form.confirmPassword) {
        setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
        return;
      } else {
        setPasswordCheckMessage("비밀번호가 일치합니다.");
        return;
      }
    }
  };

  const onCheckLoginIdBlur = async () => {
    if (!loginRegex.test(form.loginId)) {
      setLoginIdMessage("아이디는 4~12자의 영어와 숫자만 사용해야 합니다.");
      return;
    }

    const response = await checkLoginIdDuplicate(form.loginId);
    const { code, message } = response;

    if (code == "SU") {
      setLoginIdMessage(message);
      return;
    }
    setLoginIdMessage(message);
  };

  const onSignUpClick = async () => {
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
      !birthDate ||
      !branchId ||
      branchId === 0
    ) {
      setMessage("모든 항목을 입력해 주세요");
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

    if (code != "SU") {
      alert("회원가입에 실패");
      setMessage(message);
      return;
    } else {
      alert("회원가입을 성공하였습니다.");
      navigate("/auth/login");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input
        type="text"
        placeholder="아이디 (영문으로 시작, 4~12자 영문/숫자 조합)"
        name="loginId"
        value={form.loginId}
        onChange={onInputChange}
        onBlur={onCheckLoginIdBlur}
      />
      <br />
      {loginIdMessage && <p style={{ fontSize: "10px" }}>{loginIdMessage}</p>}
      <input
        type="password"
        placeholder="비밀번호 (8~16자 영문, 숫자, 특수문자 모두 포함)"
        name="password"
        value={form.password}
        onChange={onInputChange}
        onBlur={onPasswordBlur}
      />
      <br />
      <input
        type="password"
        placeholder="비밀번호 확인"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={onInputChange}
        onBlur={onPasswordBlur}
      />
      <br />
      {passwordCheckMessage && <p>{passwordCheckMessage}</p>}
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
          <option key={branch.branchId} value={branch.branchId}>{branch.branchName}</option>
        ))}
      </select>
      <br />
      {message && <p>{message}</p>}
      <button onClick={onSignUpClick}>회원가입</button>

    </div>
  );
}

export default SignUp;
