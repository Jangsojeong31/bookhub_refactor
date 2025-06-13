import { useEffect, useState } from "react";
import { CategoryTreeResponseDto } from "@/dtos/category/response/category-tree.response.dto";
import { getCategoryTree } from "@/apis/category/category";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";
import CategoryTree from "./CategoryTree";

type Mode = "create" | "read" | "update" | "delete";

function Category() {
  const [categories, setCategories] = useState<CategoryTreeResponseDto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryTreeResponseDto | null>(null);
  const [mode, setMode] = useState<Mode>("create");

  const fetchCategories = async () => {
    const res = await getCategoryTree();
    console.log("카테고리 응답 성공 유무 확인: ", res);
    if (res.code === "SU") {
      setCategories(res.data ?? []);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSelectCategory = (category: CategoryTreeResponseDto) => {
    setSelectedCategory(category);
  };

  const handleSuccess = () => {
    fetchCategories();
    setSelectedCategory(null);
  };

  const topLevelCategories = categories.filter((cat) => cat.categoryLevel === 1);

  return (
    <div>
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <button onClick={() => setMode("create")}>등록</button>
        <button onClick={() => setMode("read")}>전체 조회</button>
        <button onClick={() => setMode("update")}>수정</button>
        <button onClick={() => setMode("delete")}>삭제</button>
      </div>

      <div style={{ display: "flex", gap: "32px" }}>
        {(mode === "read" || mode === "update" || mode === "delete") && (
          <div style={{ flex: 1 }}>
            <CategoryTree categories={categories} onSelect={handleSelectCategory} />
          </div>
        )}

        <div style={{ flex: 1 }}>
          {mode === "create" && (
            <CreateCategory parentCategories={topLevelCategories} onSuccess={fetchCategories} />
          )}

          {mode === "update" && selectedCategory && (
            <UpdateCategory
              category={selectedCategory}
              onSuccess={handleSuccess}
              mode="update"
            />
          )}

          {mode === "delete" && selectedCategory && (
            <UpdateCategory
              category={selectedCategory}
              onSuccess={handleSuccess}
              mode="delete"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
