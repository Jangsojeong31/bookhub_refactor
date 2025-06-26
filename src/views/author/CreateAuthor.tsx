/** @jsxImportSource @emotion/react */
import * as style from "@/styles/style";
import React, { useState } from "react";
import { AuthorRequestDto } from "@/dtos/author/request/author.request.dto";
import { AuthorCreateRequestDto } from "@/dtos/author/request/author-create.request.dto";
import { checkDuplicateAuthorEmail, createAuthor } from "@/apis/author/author";
import { useCookies } from "react-cookie";
import ElseAuthor from "./ElseAuthor";

// 여러건 동시 등록
function CreateAuthor() {
  const [form, setForm] = useState({
    authorName: "",
    authorEmail: "",
  });
  const [authors, setAuthors] = useState<AuthorRequestDto[]>([]);
  const [message, setMessage] = useState("");
  const [cookies] = useCookies(["accessToken"]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 추가 버튼 클릭 -> 리스트에 추가됨
  const onAddAuthor = async () => {
    const { authorName, authorEmail } = form;
    const token = cookies.accessToken;

    if (!authorName || !authorEmail) {
      setMessage("모든 항목을 입력해주세요");
      return;
    }

    // authorEmail 중복 확인
    const response = await checkDuplicateAuthorEmail(authorEmail, token);
    const { code } = response;
    if (code === "IV") {
      setMessage("중복된 이메일입니다.");
      setForm({
        authorName: `${authorName}`,
        authorEmail: "",
      });
      return;
    }

    const isDuplicateEmail = (
      authors: AuthorRequestDto[],
      authorEmail: string
    ) => {
      return authors.some((author) => author.authorEmail === authorEmail);
    };

    if (isDuplicateEmail(authors, authorEmail)) {
      setMessage("중복된 이메일입니다.");
      setForm({
        authorName: `${authorName}`,
        authorEmail: "",
      });
      return;
    }

    const newAuthor: AuthorRequestDto = { authorName, authorEmail };
    setAuthors([...authors, newAuthor]);

    setForm({ authorName: "", authorEmail: "" });

    setMessage("");
  };

  // 저자 리스트 (노출용)
  const authorList = authors.map((author, index) => {
    return (
      <tr key={index}>
        <td>{author.authorName}</td>
        <td>{author.authorEmail}</td>
      </tr>
    );
  });

  // 등록 버튼 클릭 -> 저자 리스트 등록(저장)
  const onCreateAuthorClick = async () => {
    if (authors.length === 0) {
      setMessage("등록하실 저자를 입력 후 추가 버튼을 눌러주세요.");
      return;
    }

    const requestBody: AuthorCreateRequestDto = { authors };
    const token = cookies.accessToken;

    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    try {
      const response = await createAuthor(requestBody, token);
      const { code, message } = response;

      if (code != "SU") {
        setMessage(message);
        return;
      }

      setMessage("등록이 완료되었습니다.");
      setAuthors([]);
    } catch (error) {
      console.error(error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: 1.5,
          padding: "20px",
        }}
      >
        <h2>저자 등록</h2>
        <button onClick={onCreateAuthorClick} css={style.createButton}>
          등록
        </button>
        {message && <p>{message}</p>}

        <table
          style={{
            width: "100%",
            margin: "16px auto",
            borderCollapse: "collapse",
            backgroundColor: "white",
          }}
        >
          <thead>
            <tr>
              <th>저자 이름</th>
              <th>저자 이메일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  padding: "0",
                  height: "48px",
                }}
              >
                <input
                  type="text"
                  placeholder="등록하실 저자 이름을 입력하세요."
                  name="authorName"
                  value={form.authorName}
                  onChange={onInputChange}
                  style={{
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                    padding: "4px 8px",
                    border: "1px solid transparent",
                  }}
                />
              </td>
              <td
                style={{
                  padding: "0",
                  height: "48px",
                }}
              >
                <input
                  type="email"
                  placeholder="등록하실 저자 이메일을 입력하세요."
                  name="authorEmail"
                  value={form.authorEmail}
                  onChange={onInputChange}
                  style={{
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                    padding: "4px 8px",
                    border: "1px solid transparent",
                  }}
                />
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "0",
                  height: "48px",
                  width: 30,
                }}
              >
                <button
                  onClick={onAddAuthor}
                  style={{
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                    padding: "4px 8px",
                    border: "1px solid transparent",
                  }}
                >
                  추가
                </button>
              </td>
            </tr>
            {authorList}
          </tbody>
        </table>
      </div>
      <div
        style={{ width: 1, backgroundColor: "#ccc", height: 1000, margin: 30 }}
      ></div>
      <div
        style={{
          flex: 2,
          padding: "20px",
        }}
      >
        <ElseAuthor />
      </div>
    </div>
  );
}
export default CreateAuthor;
