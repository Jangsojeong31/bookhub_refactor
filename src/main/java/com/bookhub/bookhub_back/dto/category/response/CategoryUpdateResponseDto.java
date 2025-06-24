package com.bookhub.bookhub_back.dto.category.response;

import com.bookhub.bookhub_back.common.enums.CategoryType;
import com.bookhub.bookhub_back.entity.BookCategory;
import com.bookhub.bookhub_back.entity.DiscountPolicy;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryUpdateResponseDto {
    private Long parentCategoryId;
    private String categoryName;
    private int categoryLevel;
    private String categoryType;
    private int categoryOrder;
    private boolean isActive;
    private Long discountPolicyId;
}
