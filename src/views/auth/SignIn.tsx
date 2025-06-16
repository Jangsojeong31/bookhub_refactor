import { signInRequest } from "@/apis/auth/auth";
import { SignInRequestDto } from "@/dtos/auth/request/sign-in.request.dto";
import { useEmployeeStore } from "@/stores/employee.store";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const setLogin = useEmployeeStore((store) => store.setLogin);

  const [form, setForm] = useState({
    loginId: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지

    const { loginId, password } = form;

    if (!loginId || !password) {
      setMessage("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    const responseBody: SignInRequestDto = { loginId, password };
    const response = await signInRequest(responseBody);
    const { code, message, data } = response;

    if (code != "SU" || !data) {
      setMessage("로그인에 실패하였습니다.");
      return;
    }

    const { token, exprTime } = data;
    if (typeof exprTime !== "number" || isNaN(exprTime)) {
      setMessage("서버에서 잘못된 만료시간을 받았습니다.");
      return;
    }

    const expireDate = new Date();
    expireDate.setMilliseconds(expireDate.getMilliseconds() + exprTime);

    setCookie("accessToken", token, {
      path: "/",
      expires: expireDate,
      sameSite: "strict",
    });

    setLogin();

    alert(message);
    navigate("/main");
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="loginId"
          value={form.loginId}
          placeholder="아이디"
          onChange={onInputChange}
        />
        <br />
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="비밀번호"
          onChange={onInputChange}
        />
        <br />
        <button type="submit">로그인</button>
      </form>
      <br />
      <p>
        <a href="/auth/sign-up">회원가입</a> |{" "}
        <a href="/auth/login-id-find/email">아이디 찾기</a> |{" "}
        <a href="/auth/password-change/email">비밀번호 변경</a>
      </p>

      {message && <p>{message}</p>}
    </div>
  );
}

export default SignIn;
