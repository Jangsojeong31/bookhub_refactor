import React, { useState } from "react";
import { CategoryTreeResponseDto } from "@/dtos/category/response/category-tree.response.dto";

interface CategoryTreeProps {
  categories: CategoryTreeResponseDto[];
  onSelect: (category: CategoryTreeResponseDto) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({ categories, onSelect }) => {
  const [expanded, setExpanded] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="category-container">
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
