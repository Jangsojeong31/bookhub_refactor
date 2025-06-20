import { useState } from "react";
import { searchBook } from "@/apis/book/book";
import { BookResponseDto } from "@/dtos/book/response/book-response.dto";
import { useCookies } from "react-cookie";
import "./book.css";

function SearchBook() {
  const [cookies] = useCookies(["accessToken"]);
  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState<BookResponseDto[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handleSearch = async () => {
    const token = cookies.accessToken;
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const res = await searchBook(keyword, token);
      if (res.code !== "SU") throw new Error(res.message);
      setBooks(res.data || []);
      setCurrentPage(0); // 검색 시 첫 페이지로 초기화
    } catch (error) {
      alert("도서 검색 실패");
      console.error(error);
    }
  };

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const goPrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const goNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const booksToDisplay = books.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      <div className="topBar">
        <h2>📚 도서 통합 검색</h2>
        <input
          className="book-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <button type="button" className="button" onClick={handleSearch}>
          검색
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>표지</th>
              <th>Isbn</th>
              <th>제목</th>
              <th>저자</th>
              <th>카테고리</th>
              <th>출판사</th>
              <th>가격</th>
              <th>출판일</th>
              <th>페이지 수</th>
              <th>언어</th>
              <th>판매상태</th>
            </tr>
          </thead>
          <tbody>
            {booksToDisplay.map((book) => (
              <tr key={book.isbn}>
                <td>
                  {book.coverUrl ? (
                    <img
                      src={`http://localhost:8080${encodeURI(book.coverUrl)}`}
                      alt="cover"
                      width={90}
                      height={120}
                    />
                  ) : (
                    "없음"
                  )}
                </td>
                <td>{book.isbn}</td>
                <td>{book.bookTitle}</td>
                <td>{book.authorName}</td>
                <td>{book.categoryName}</td>
                <td>{book.publisherName}</td>
                <td>{book.bookPrice.toLocaleString()}원</td>
                <td>{new Date(book.publishedDate).toISOString().slice(0, 10)}</td>
                <td>{book.pageCount}</td>
                <td>{book.language}</td>
                <td>{book.bookStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {books.length > 0 && (
        <div className="footer">
          <button className="pageBtn" onClick={goPrev} disabled={currentPage === 0}>
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i).map((i) => (
            <button
              key={i}
              className={`pageBtn${i === currentPage ? " current" : ""}`}
              onClick={() => goToPage(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="pageBtn"
            onClick={goNext}
            disabled={currentPage >= totalPages - 1}
          >
            {">"}
          </button>
          <span className="pageText">
            {totalPages > 0 ? `${currentPage + 1} / ${totalPages}` : "0 / 0"}
          </span>
        </div>
      )}
    </div>
  );
}

export default SearchBook;
