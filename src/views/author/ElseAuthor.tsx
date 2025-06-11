import React, { useState } from 'react'
import { deleteAuthor, getAllAuthorsByName, updateAuthor } from '@/apis/author/author';
import { AuthorResponseDto } from '@/dtos/author/response/author.response.dto';

// & 기능: 이름으로 조회, 수정, 삭제

function ElseAuthor() {
  const [form, setForm] = useState({ authorName: "", authorEmail: "" });
  const [authorId, setAuthorId] = useState<number>(0);
  const [authors, setAuthors] = useState<AuthorResponseDto[]>([]);
  const [message, setMessage] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }
  
  // * 이름으로 조회
  const onGetAllAuthorsByNameClick = async() => {
    const {authorName} = form;
    const response = await getAllAuthorsByName(authorName);
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
  
    const response = await updateAuthor(authorId, dto);
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
    const response = await deleteAuthor(authorId);
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
  
  return (
    <div>
      <div>
        <button>등록</button>
        <button>조회 / 수정 / 삭제</button>
      </div>

      <input 
        type='text'
        name='authorName'
        value={form.authorName}
        placeholder='조회할 저자 이름을 입력하세요'
        onChange={onInputChange}
        />
      <button onClick={onGetAllAuthorsByNameClick}>조회</button>
      <table>
        <tr>
          <th>저자 이름</th>
          <th>저자 이메일</th>
        </tr>
        {authorList}
      </table>

      {modalStatus && 
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
      }
    </div>
  )
}

export default ElseAuthor