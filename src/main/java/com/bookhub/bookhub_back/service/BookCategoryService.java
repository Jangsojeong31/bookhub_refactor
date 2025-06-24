package com.bookhub.bookhub_back.service;

import com.bookhub.bookhub_back.common.enums.CategoryType;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.category.request.CategoryCreateRequestDto;
import com.bookhub.bookhub_back.dto.category.request.CategoryUpdateRequestDto;
import com.bookhub.bookhub_back.dto.category.response.CategoryCreateResponseDto;
import com.bookhub.bookhub_back.dto.category.response.CategoryTreeResponseDto;
import com.bookhub.bookhub_back.dto.category.response.CategoryUpdateResponseDto;
import com.bookhub.bookhub_back.dto.policy.response.DiscountPolicyDetailResponseDto;

import java.util.List;

public interface BookCategoryService {
    ResponseDto<CategoryCreateResponseDto> createCategory(CategoryCreateRequestDto dto);

    ResponseDto<CategoryUpdateResponseDto> updateCategory(Long categoryId, CategoryUpdateRequestDto dto);

    ResponseDto<Void> deleteCategory(Long categoryId);

    ResponseDto<List<CategoryTreeResponseDto>> getCategoryTree(CategoryType type);

    ResponseDto<List<CategoryTreeResponseDto>> getAllActiveCategories();

    ResponseDto<List<CategoryTreeResponseDto>> getRootCategories();

    ResponseDto<List<CategoryTreeResponseDto>> getSubCategories(Long parentId);

    ResponseDto<CategoryTreeResponseDto> getCategoryByName(String name);

    ResponseDto<CategoryTreeResponseDto> getActiveByName(String name);

    ResponseDto<?> getPolicyByCategoryId(Long categoryId);



}
