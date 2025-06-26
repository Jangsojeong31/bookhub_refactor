import { Routes, Route, useNavigate } from 'react-router-dom';
import CreateBook from './CreateBook';
import UpdateBook from './UpdateBook';
import SearchBook from './SearchBook';
import BookLogs from './book-logs/BookLogs';

function Book() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="create" element={<CreateBook onSuccess={async () => navigate("/books/search")} />} />
      <Route path="edit" element={<UpdateBook />} />
      <Route path="search" element={<SearchBook />} />
      <Route path="booklogs" element={<BookLogs />} />
    </Routes>
  );
}
export default Book;
