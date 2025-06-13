import React, { useState } from 'react'
import { AuthorRequestDto } from '@/dtos/author/request/author.request.dto'
import { AuthorCreateRequestDto } from '@/dtos/author/request/author-create.request.dto';
import { createAuthor } from '@/apis/author/author';
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
  const onAddAuthor = () => {
    const {authorName, authorEmail} = form;

    if (!authorName || !authorEmail) {
      setMessage('모든 항목을 입력해주세요');
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

    // 팝업창(모달창) 열림
    onHandleModalStatus();

    alert("등록이 완료되었습니다."); // 메시지를 모달창 안으로 포함시킬까 고민중

    // authors 초기화
    setAuthors([]);
  }

  // 모달창 상태 변환 함수
  const onHandleModalStatus = () => {
    setModalStatus(!modalStatus);
  }

  return (
    <div>
      <NavLink
        to="/authors"
        key="/authors"
        style={({isActive}) => ({
          backgroundColor: isActive? 'blue' : 'lightgray',
          padding: '10px 20xp',
          margin: '10px 10px'
        })}>
        등록
      </NavLink>

      <NavLink
        to="/authors-else"
        key="/authors-else"
        style={({isActive}) => ({
          backgroundColor: isActive? 'blue' : 'lightgray',
          padding: '10px 20xp',
          margin: '10px 10px'
        })}>
        조회 / 수정 / 삭제
      </NavLink>
      {/* <button>등록</button>
      <button>조회 / 수정 / 삭제</button> */}

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

        {/* <button onClick={onHandleModalStatus}>모달창 열기</button> */}
        {/* {modalStatus && (
          <Modal title='모달 제목' setModal={onHandleModalStatus}>
            {authorList}
            <button onClick={onHandleModalStatus}>창 닫기</button>
          </Modal>
        )} */}
        {message && <p>{message}</p>}
    </div>
  )
}
export default CreateAuthor

