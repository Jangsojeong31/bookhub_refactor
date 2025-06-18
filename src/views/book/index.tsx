import { Route } from 'react-router-dom'
import CreateBook from './CreateBook'
import UpdateBook from './UpdateBook'
import SearchBook from './SearchBook'
import BookLogs from './book-logs/BookLogs'

function Book() {
  return (
    <>
      <Route path="/books/create" element={<CreateBook onSuccess={function (): Promise<void> {
        throw new Error('Function not implemented.')
      } } />} />
      <Route path="/books/edit" element={<UpdateBook />} />
      <Route path="/books/search" element={<SearchBook />} />
      <Route path="/booklogs" element={<BookLogs />} />
    </>
  )
}

export default Book