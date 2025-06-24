import { createBook } from '@/apis/book/book';
import { BookCreateRequestDto } from '@/dtos/book/request/book-create.request.dto';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import "./book.css"
import { CategoryTreeResponseDto } from '@/dtos/category/response/category-tree.response.dto';

interface CreateBookProps {
  onSuccess: () => Promise<void>;
}

function CreateBook({ onSuccess }: CreateBookProps) {
  const [cookies] = useCookies(["accessToken"]);

  const [isbn, setIsbn] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [categoryId, setCategoryId] = useState<number>();
  const [authorId, setAuthorId] = useState<number>();
  const [publisherId, setPublisherId] = useState<number>();
  const [bookPrice, setBookPrice] = useState<number>();
  const [publishedDate, setPublishedDate] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null); // 파일로 받도록 변경
  const [pageCount, setPageCount] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [policyId, setPolicyId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = cookies.accessToken;
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const dto: BookCreateRequestDto = {
      isbn,
      bookTitle,
      categoryId: categoryId!,
      authorId: authorId!,
      publisherId: publisherId!,
      bookPrice: bookPrice!,
      publishedDate,
      pageCount,
      language,
      description,
      policyId: policyId ?? undefined,
    };

    try {
      const res = await createBook(dto, token, coverFile);
      if (res.code !== "SU") throw new Error(res.message);

      alert("책 등록 성공!");
      window.location.reload();

      setIsbn("");
      setBookTitle("");
      setCategoryId(undefined);
      setAuthorId(undefined);
      setPublisherId(undefined);
      setBookPrice(undefined);
      setPublishedDate("");
      setCoverFile(null);
      setPageCount("");
      setLanguage("");
      setDescription("");
      setPolicyId(null);
    } catch (err) {
      console.error(err);
      alert("책 등록 실패");
      return;
    }
    try {
      await onSuccess(); 
    } catch (err) {
      console.error("onSuccess 에러:", err);
}
}
return (
  <form onSubmit={handleSubmit} className="create-category-form">
    <h2>📘책 등록</h2>
    <input
        type="text"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        placeholder="책 ISBN"
        className="create-book"
        required
      />
    <input
        type="text"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        placeholder="책 제목"
        className="create-book"
        required
      />
    <input
        type="number"
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        placeholder="카테고리ID"
        className="create-book"
        required
      />
    <input
        type="number"
        value={authorId}
        onChange={(e) => setAuthorId(Number(e.target.value))}
        placeholder="저자Id"
        className="create-book"
        required
      />
    <input
        type="number"
        value={publisherId}
        onChange={(e) => setPublisherId(Number(e.target.value))}
        placeholder="출판사Id"
        className="create-book"
        required
      />
    <input
        type="text"
        value={bookPrice}
        onChange={(e) => setBookPrice(Number(e.target.value))}
        placeholder="가격"
        className="create-book"
        required
      />
    <input
        type="date"
        value={publishedDate}
        onChange={(e) => setPublishedDate(e.target.value)}
        placeholder="출판일"
        className="create-book"
        required
      />
    <input
        type="file"
        onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
      />
    <input
        type="text"
        value={pageCount}
        onChange={(e) => setPageCount(e.target.value)}
        placeholder="총 페이지수"
        className="create-book"
        required
      />
    <input
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        placeholder="언어"
        className="create-book"
        required
      />
    <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="설명"
        className="create-book"
        required
      />


    <button type="submit" className="create-book-button">등록</button>  
    </form>
  );
}

export default CreateBook;