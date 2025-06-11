import React, { useState } from 'react'
import { getAllAuthorsByName } from '@/apis/author/author';
import { AuthorResponseDto } from '@/dtos/author/response/author.response.dto';

// 전체 조회
// 이름으로 조회
// 수정(모달창) 및 삭제 
function ElseAuthor() {
  const [form, setForm] = useState({
      authorName: ""
  })
  const [authors, setAuthors] = useState<AuthorResponseDto[]>([]);
  const [message, setMessage] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }

  // // 전체 조회 기능
  // const onGetAllAuthorsClick = async() => {

  //   const response = await getAllAuthors();
  //   const {code, message, data} = response; // data: AuthorResponseDto[]

  //   if(!code) {
  //     setMessage(message);
  //     return;
  //   }

  //   if (Array.isArray(data)) {
  //     setAuthors(data);
  //   } else {
  //     setMessage("데이터 형식이 올바르지 않습니다.");
  //   }
  // }
  
  // 이름으로 조회
  const onGetAllAuthorsByNameClick = async() => {
    const {authorName} = form;
    const response = await getAllAuthorsByName(authorName);
    const {code, message, data} = response; // data: AuthorResponseDto[]

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

  // 수정
  const onUpdateAuthorClick = async() => {
    const {authorName} = form;
    const response = await getAllAuthorsByName(authorName);
    const {code, message, data} = response; // data: AuthorResponseDto[]

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
  
  // 삭제
  const onDeleteAuthorClick = async() => {
    const {authorName} = form;
    const response = await getAllAuthorsByName(authorName);
    const {code, message, data} = response; // data: AuthorResponseDto[]

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

  const authorList = authors.map((author, index) => {
  return (
    <tr key={index}>
      <td>{author.authorName}</td>
      <td>{author.authorEmail}</td>
      <td><button onClick={onUpdateAuthorClick}>수정</button></td>
      <td><button onClick={onDeleteAuthorClick}>삭제</button></td>
    </tr>
  )})
  
  return (
    <div>
      {/* <button onClick={onGetAllAuthorsClick}>전체조회</button> */}
      <input 
        name='authorName'
        value={form.authorName}
        placeholder='저자 이름을 검색하세요'
        onChange={onInputChange}
      />
      <button onClick={onGetAllAuthorsByNameClick}>조회</button>
      {authorList}
    </div>
  )
}

export default ElseAuthor