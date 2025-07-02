package com.bookhub.bookhub_back.controller;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.common.enums.CategoryType;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.category.request.CategoryCreateRequestDto;
import com.bookhub.bookhub_back.dto.category.request.CategoryUpdateRequestDto;
import com.bookhub.bookhub_back.dto.category.response.CategoryCreateResponseDto;
import com.bookhub.bookhub_back.dto.category.response.CategoryTreeResponseDto;
import com.bookhub.bookhub_back.dto.category.response.CategoryUpdateResponseDto;
import com.bookhub.bookhub_back.service.BookCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiMappingPattern.BASIC_API)
@RequiredArgsConstructor
public class BookCategoryController {
    private final BookCategoryService bookCategoryService;

    // 1) 카테고리 생성
    @PostMapping(ApiMappingPattern.ADMIN_API + "/categories")
    public ResponseEntity<ResponseDto<CategoryCreateResponseDto>> createCategory(
            @Valid @RequestBody CategoryCreateRequestDto dto) {
        ResponseDto<CategoryCreateResponseDto> category = bookCategoryService.createCategory(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(category);
    }

    // 2) 카테고리 수정
    @PutMapping(ApiMappingPattern.ADMIN_API + "/categories/{categoryId}")
    public ResponseDto<CategoryUpdateResponseDto> updateCategory(
            @PathVariable Long categoryId,
            @RequestBody CategoryUpdateRequestDto dto) {
        return bookCategoryService.updateCategory(categoryId, dto);
    }

    // 3) 카테고리 삭제(비활성화)
    @DeleteMapping(ApiMappingPattern.ADMIN_API + "/categories/{categoryId}")
    public ResponseDto<Void> deleteCategory(@PathVariable Long categoryId) {
        return bookCategoryService.deleteCategory(categoryId);
    }

    // 4) 트리형 카테고리 조회
    @GetMapping(ApiMappingPattern.ADMIN_API + "/categories/tree")
    public ResponseDto<List<CategoryTreeResponseDto>> getCategoryTree(@RequestParam CategoryType type) {
        return bookCategoryService.getCategoryTree(type);
    }

    // 5) 활성 카테고리 전체 조회
    @GetMapping(ApiMappingPattern.ADMIN_API + "/categories/active")
    public ResponseDto<List<CategoryTreeResponseDto>> getAllActiveCategories() {
        return bookCategoryService.getAllActiveCategories();
    }

    // 6) 대분류 카테고리 조회
    @GetMapping(ApiMappingPattern.ADMIN_API + "/categories/roots")
    public ResponseDto<List<CategoryTreeResponseDto>> getRootCategories() {
        return bookCategoryService.getRootCategories();
    }

    // 7) 특정 부모 ID 하위 카테고리 조회
    @GetMapping(ApiMappingPattern.ADMIN_API + "/categories/subcategories/{parentId}")
    public ResponseDto<List<CategoryTreeResponseDto>> getSubCategories(@PathVariable Long parentId) {
        return bookCategoryService.getSubCategories(parentId);
    }

    // 카테고리 ID로 연결된 할인정책 조회
    @GetMapping(ApiMappingPattern.COMMON_API + "/categories/{categoryId}/policy")
    public ResponseDto<?> getPolicyByCategory(@PathVariable("categoryId") Long categoryId) {
        return bookCategoryService.getPolicyByCategoryId(categoryId);
    }
}
