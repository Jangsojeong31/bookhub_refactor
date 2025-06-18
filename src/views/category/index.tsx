import { Route } from "react-router-dom";
import CategoryMain from "./CategoryMain";

function Category() {
  return (
    <>
      <Route path="/categories" element={<CategoryMain />} />
    </>
  );
}

export default Category;
