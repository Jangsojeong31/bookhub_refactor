import { useState } from "react";
import "./CreateCategory.css";
import { CategoryCreateRequestDto } from "@/dtos/category/request/category-create.request.dto";
import { createCategory } from "@/apis/category/category";
import { CategoryTreeResponseDto } from "@/dtos/category/response/category-tree.response.dto";

interface CreateCategoryProps {
  parentCategories: CategoryTreeResponseDto[];
  onSuccess: () => Promise<void>;
}

function CreateCategory({ parentCategories, onSuccess }: CreateCategoryProps) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState<"DOMESTIC" | "FOREIGN">("DOMESTIC");
  const [categoryLevel, setCategoryLevel] = useState<1 | 2>(1);
  const [parentCategoryId, setParentCategoryId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dto: CategoryCreateRequestDto = {
      categoryName,
      categoryType,
      categoryLevel,
      parentCategoryId: categoryLevel === 2 ? parentCategoryId ?? undefined : undefined,
    };

    try {
      await createCategory(dto);
      alert("카테고리 등록 성공!");
      setCategoryName("");
      setCategoryType("DOMESTIC");
      setCategoryLevel(1);
      setParentCategoryId(null);
      await onSuccess(); // ✅ 상위 컴포넌트에서 fetchCategories 실행
    } catch (err) {
      alert("카테고리 등록 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-category-form">
      <h2 className="create-category-title">📁 카테고리 등록</h2>

      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="카테고리 이름"
        className="create-category-input"
        required
      />

      <select
        value={categoryType}
        onChange={(e) => setCategoryType(e.target.value as "DOMESTIC" | "FOREIGN")}
        className="create-category-select"
      >
        <option value="DOMESTIC">국내도서</option>
        <option value="FOREIGN">해외도서</option>
      </select>

      <div className="create-category-radio-group">
        <label>
          <input
            type="radio"
            name="categoryLevel"
            value={1}
            checked={categoryLevel === 1}
            onChange={() => setCategoryLevel(1)}
          />
          대분류
        </label>
        <label>
          <input
            type="radio"
            name="categoryLevel"
            value={2}
            checked={categoryLevel === 2}
            onChange={() => setCategoryLevel(2)}
          />
          소분류
        </label>
      </div>

      {categoryLevel === 2 && (
        <select
          value={parentCategoryId ?? ""}
          onChange={(e) => setParentCategoryId(Number(e.target.value))}
          className="create-category-select"
          required
        >
          <option value="">대분류 선택</option>
          {parentCategories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      )}

      <button type="submit" className="create-category-button">등록</button>
    </form>
  );
}

export default CreateCategory;
