import React, { useState } from "react";
import { CategoryTreeResponseDto } from "@/dtos/category/response/category-tree.response.dto";
import { getCategoryTree } from "@/apis/category/category";
import { useCookies } from "react-cookie";

interface CategoryTreeProps {
  categories: CategoryTreeResponseDto[];
  onSelect: (category: CategoryTreeResponseDto) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({ onSelect }) => {
  const [categoryType, setCategoryType] = useState<"DOMESTIC" | "FOREIGN" | null>(null);
  const [categories, setCategories] = useState<CategoryTreeResponseDto[]>([]);
  const [expanded, setExpanded] = useState<number[]>([]);
  const [cookies] = useCookies(["accessToken"]);

  const fetchCategories = async (type: "DOMESTIC" | "FOREIGN") => {
    const token = cookies.accessToken;
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const res = await getCategoryTree(type, token);
    if (res.code === "SU") {
      setCategories(res.data ?? []);
      setCategoryType(type);
      setExpanded([]); // 초기화
    } else {
      alert("카테고리 조회 실패");
    }
  };

  const toggleExpand = (id: number) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  if (!categoryType) {
    return (
      <div className="category-container">
        <h2>📚 전체 도서 카테고리</h2>
        <button onClick={() => fetchCategories("DOMESTIC")}>국내 도서</button>
        <button onClick={() => fetchCategories("FOREIGN")}>해외 도서</button>
      </div>
    );
  }

  return (
    <div className="category-container">
      <button onClick={() => setCategoryType(null)}>← 뒤로 가기</button>
      <h2>📚 전체 도서 카테고리</h2>
      {categories.map((cat) => (
        <div key={cat.categoryId}>
          <div
            className="category"
            onClick={() => {
              toggleExpand(cat.categoryId);
              onSelect(cat);
            }}
          >
            ▶ {cat.categoryName}
          </div>
          {expanded.includes(cat.categoryId) && cat.subCategories && (
            <div className="subcategory-list">
              {cat.subCategories.map((sub) => (
                <div
                  key={sub.categoryId}
                  className="subcategory-item"
                  onClick={() => onSelect(sub)}
                >
                  {sub.categoryName}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryTree;
