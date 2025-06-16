import React, { useState } from 'react'
import { deleteAuthor, getAllAuthorsByName, updateAuthor } from '@/apis/author/author';
import { AuthorResponseDto } from '@/dtos/author/response/author.response.dto';
import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Modal from '@/apis/constants/Modal';

// & 기능: 이름으로 조회, 수정, 삭제

function ElseAuthor() {
  const [form, setForm] = useState({ authorName: "", authorEmail: "" });
  const [authorId, setAuthorId] = useState<number>(0);
  const [authors, setAuthors] = useState<AuthorResponseDto[]>([]);
  const [message, setMessage] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  const [cookies] = useCookies(["accessToken"]);
  
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }
  
  // * 이름으로 조회
  const onGetAllAuthorsByNameClick = async() => {
    const {authorName} = form;
    const token = cookies.accessToken;

    if(!token){
      alert('인증 토큰이 없습니다.')
      return
    }
    const response = await getAllAuthorsByName(authorName, token);
    const {code, message, data} = response; 

    if(!code) {
      setMessage(message);
      return;
    }

    if (Array.isArray(data)) {
      setAuthors(data);
    } else {
      setMessage("데이터 형식이 올바르지 않습니다.");
    }
  };

  // * 수정 모달창
  const openUpdateModal = (author: AuthorResponseDto) => {
    setAuthorId(author.authorId); 
    setForm({
      authorName: author.authorName,
      authorEmail: author.authorEmail
    });
    setModalStatus(true);
  }
  
  // * 수정
  const onUpdateAuthorClick = async (authorId: number) => {
    const dto = {
      authorName: form.authorName,
      authorEmail: form.authorEmail
    };
    const token = cookies.accessToken;

    if(!token){
      alert('인증 토큰이 없습니다.')
      return
    }
  
    const response = await updateAuthor(authorId, dto, token);
    const { code, message } = response;
  
    if (!code) {
      setMessage(message);
      return;
    }
  
    alert("수정되었습니다.");
    setModalStatus(false);
  };
  
  // * 삭제
  const onDeleteAuthorClick = async(authorId: number) => {
    const token = cookies.accessToken;

    if(!token){
      alert('인증 토큰이 없습니다.')
      return
    }

    const response = await deleteAuthor(authorId, token);
    const {code, message} = response;

    if(!code) {
      setMessage(message);
      return;
    }

    alert('삭제되었습니다.')

    const updatedAuthor = authors.filter(author => author.authorId !== authorId);
    setAuthors(updatedAuthor);
  }

  const authorList = authors.map((author) => {
  return (
    <tr key={author.authorId}>
      <td>{author.authorName}</td>
      <td>{author.authorEmail}</td>
      <button onClick={() => openUpdateModal(author)}>수정</button>
      <button onClick={() => onDeleteAuthorClick(author.authorId)}>삭제</button>
    </tr>
  )})

  const modalContent: React.ReactNode = (
  <>
    <h3>저자 수정 모달</h3>
      <input
        type="text"
        name="authorName"
        value={form.authorName}
        onChange={onInputChange}
        placeholder={form.authorName}
      />
      <input
        type="text"
        name="authorEmail"
        value={form.authorEmail}
        onChange={onInputChange}
        placeholder={form.authorEmail}
      />
      <button onClick={() => onUpdateAuthorClick(authorId)}>수정</button>
      {message && <p>{message}</p>}
  </>
);
  
  return (
    <div>
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
      </div>

    <h2>저자 조회</h2>
      <input 
        type='text'
        name='authorName'
        value={form.authorName}
        placeholder='조회할 저자 이름을 입력하세요'
        onChange={onInputChange}
        />
      <button onClick={onGetAllAuthorsByNameClick}>조회</button>
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

      {/* {modalStatus && 
      <div>
        <h3>저자 수정 모달</h3>
        <input
          type="text"
          name="authorName"
          value={form.authorName}
          onChange={onInputChange}
          placeholder={form.authorName}
        />
        <input
          type="text"
          name="authorEmail"
          value={form.authorEmail}
          onChange={onInputChange}
          placeholder={form.authorEmail}
        />
        <button onClick={() => onUpdateAuthorClick(authorId)}>수정</button>
        {message && <p>{message}</p>}
      </div>
      } */}

      {modalStatus &&
        <Modal 
          isOpen={modalStatus}
          onClose={() => setModalStatus(false)}
          children={modalContent}
        />
      }
    </div>
  )
}

export default ElseAuthor