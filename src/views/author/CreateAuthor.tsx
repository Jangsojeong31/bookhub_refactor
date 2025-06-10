import React, { useState } from 'react'
import { AuthorRequestDto } from '@/dtos/author/request/author.request.dto'
import { AuthorCreateRequestDto } from '@/dtos/author/request/author-create.request.dto';
import { createAuthor } from '@/apis/author/author';


// 여러건 동시 등록
function CreateAuthor() {

  const [form, setForm] = useState({
    authorName: "",
    authorEmail: ""
  })

  const [message, setMessage] = useState('');

  const authors: AuthorRequestDto[] = [];

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }
  
  // 저자 추가
  const onAddAuthor = () => {
    const {authorName, authorEmail} = form;

    if (!authorName || !authorEmail) {
      setMessage('모든 항목을 입력해주세요');
      return;
    }

    authors.push({authorName, authorEmail});
  }

  // 저자 리스트 등록
  const onCreateAuthorClick = async() => {

    const requestBody: AuthorCreateRequestDto = {authors}

    // const response = await createAuthor(requestBody);
    // const {code, message} = response;

    // if(!code) {
    //   setMessage(message);
    //   return;
    // }
    // 팝업창으로 등록된 저자 리스트 보여지도록

    setMessage("등록이 완료되었습니다.");
  }

  return (
    <div>
      <h2>저자 등록</h2>
      <input 
        type="text"
        placeholder='저자 이름'
        name='authorName'
        value={form.authorName}
        onChange={onInputChange}
        />
      <input 
        type="text"
        placeholder='저자 이메일'
        name='authorEmail'
        value={form.authorEmail}
        onChange={onInputChange}
        />
        <button onClick={onAddAuthor}>추가</button>
        <button onClick={onCreateAuthorClick}>등록</button>
        {message && <p>{message}</p>}
    </div>
  )
}

export default CreateAuthor

