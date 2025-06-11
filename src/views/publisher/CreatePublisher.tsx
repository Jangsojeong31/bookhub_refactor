import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PublisherRequestDto } from '@/dtos/publisher/request/publisher.request.dto';
import { createPublisher } from '@/apis/publisher/publisher';

function CreatePublisher() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    publisherName: ""
  });

  const [message, setMessage] = useState('');

  //& === Handler === //
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

   const onPublisherCreateClick = async () => {
    const { publisherName } = form;

    const requestBody: PublisherRequestDto = {
      publisherName
    };

    const response = await createPublisher(requestBody);
    const { code, message } = response;

    if (!code) {
      // 실패 응답 반환의 경우
      setMessage(message);
      return;
    }

    alert("출판사 등록이 완료되었습니다.");
    navigate('/publisher');
  }

  return (
    <div>CreatePublisher</div>
  )
}

export default CreatePublisher