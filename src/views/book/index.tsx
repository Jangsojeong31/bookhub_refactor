import { Route } from "react-router-dom";
import CreateBook from "./CreateBook";
import UpdateBook from "./UpdateBook";
import SearchBook from "./SearchBook";
import BookLogs from "./book-logs/BookLogs";
import RequireAuth from "@/components/auth/RequireAuth";


function Book() {
  const navigate = useNavigate();
  return (
    <>
      <Route
        path="/books/create"
        element={
          <RequireAuth allowedRoles={["ADMIN"]}>
            <CreateBook
              onSuccess={function (): Promise<void> {
                throw new Error("Function not implemented.");
              }}
            />
          </RequireAuth>
        }
      />
      <Route
        path="/books/edit"
        element={
          <RequireAuth allowedRoles={["ADMIN"]}>
            <UpdateBook />
          </RequireAuth>
        }
      />
      <Route path="/books/search" element={<SearchBook />} />
      <Route
        path="/booklogs"
        element={
          <RequireAuth allowedRoles={["ADMIN"]}>
            <BookLogs />
          </RequireAuth>
        }
      />
    </>
  );
}
export default Book;
