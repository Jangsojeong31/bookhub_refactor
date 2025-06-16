import React, { useState } from 'react'
import { AuthorRequestDto } from '@/dtos/author/request/author.request.dto'
import { AuthorCreateRequestDto } from '@/dtos/author/request/author-create.request.dto';
import { checkDuplicateAuthorEmail, createAuthor } from '@/apis/author/author';
import Modal from '../../apis/constants/Modal';
import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// 여러건 동시 등록
function CreateAuthor() {
  const [form, setForm] = useState({
    authorName: "",
    authorEmail: ""
  })
  const [authors, setAuthors] = useState<AuthorRequestDto[]>([]);
  const [message, setMessage] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  const [cookies] = useCookies(["accessToken"]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }
  
  // 추가 버튼 클릭 -> 리스트에 추가됨
  const onAddAuthor = async() => {
    const {authorName, authorEmail} = form;
    const token = cookies.accessToken;

    if (!authorName || !authorEmail) {
      setMessage('모든 항목을 입력해주세요');
      return;
    }

    // authorEmail 중복 확인
    const response = await checkDuplicateAuthorEmail(authorEmail, token);
    const { code } = response;
    if(code === "IV") {
      setMessage('중복된 이메일입니다.');
      setForm({
        authorName: `${authorName}`,
        authorEmail: ""
      })
      return;
    }

    const newAuthor: AuthorRequestDto = {authorName, authorEmail};
    setAuthors([...authors,  newAuthor]);

    setForm({ authorName: "",authorEmail: "" });

    setMessage('');
  }

  // 저자 리스트 (노출용)
  const authorList = authors.map((author, index) => {
    return (
      <tr key={index}>
        <td>{author.authorName}</td>
        <td>{author.authorEmail}</td>
      </tr>
    )
  })

  // 등록 버튼 클릭 -> 저자 리스트 등록(저장)
  const onCreateAuthorClick = async() => {
    if(authors.length === 0) {
      setMessage('등록하실 저자를 입력하세요.')
      return;
    }

    const requestBody: AuthorCreateRequestDto = {authors};
    const token = cookies.accessToken;

    if(!token){
      alert('인증 토큰이 없습니다.')
      return
    }

    const response = await createAuthor(requestBody, token);
    const {code, message} = response;

    if(!code) {
      setMessage(message);
      return;
    }

    setModalStatus(true);
    setMessage("등록이 완료되었습니다.")
  }

  const modalContent: React.ReactNode = (
    <>
      <h3>등록된 작가</h3>
      <table>
          <thead>
            <tr>
              <th>저자 이름</th>
              <th>저자 이메일</th>
            </tr>
          </thead>
          <tbody>
            {authorList}
          </tbody>
        </table>  
      {message && <p>{message}</p>}
    </>
  );

  return (
    <div>
      <NavLink
        to="/author/create"
        key="/author/create"
        style={({isActive}) => ({
          backgroundColor: isActive? 'blue' : 'lightgray',
          padding: '10px 20xp',
          margin: '10px 10px'
        })}>
        등록
      </NavLink>

      <NavLink
        to="/author/else"
        key="/author/else"
        style={({isActive}) => ({
          backgroundColor: isActive? 'blue' : 'lightgray',
          padding: '10px 20xp',
          margin: '10px 10px'
        })}>
        조회 / 수정 / 삭제
      </NavLink>

      <h2>저자 등록</h2>
      <input 
        type="text"
        placeholder='저자 이름'
        name='authorName'
        value={form.authorName}
        onChange={onInputChange}
        />
      <input 
        type="email"
        placeholder='저자 이메일'
        name='authorEmail'
        value={form.authorEmail}
        onChange={onInputChange}
        />
      <button onClick={onAddAuthor}>추가</button>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>저자 이름</th>
            <th>저자 이메일</th>
          </tr>
        </thead>
        <tbody>
          {authorList}
        </tbody>
      </table>
      <button onClick={onCreateAuthorClick}>등록</button>
        
      {modalStatus &&
      <Modal 
        isOpen={modalStatus}
        onClose={() => {
          setModalStatus(false);
          setAuthors([])
          setMessage("");
        }}
        children={modalContent}
      />
      }
    </div>
  )
}
export default CreateAuthor

