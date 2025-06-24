package com.bookhub.bookhub_back.service.impl;

import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessage;
import com.bookhub.bookhub_back.common.enums.CategoryType;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.category.request.CategoryCreateRequestDto;
import com.bookhub.bookhub_back.dto.category.request.CategoryUpdateRequestDto;
import com.bookhub.bookhub_back.dto.category.response.CategoryCreateResponseDto;
import com.bookhub.bookhub_back.dto.category.response.CategoryTreeResponseDto;
import com.bookhub.bookhub_back.dto.category.response.CategoryUpdateResponseDto;
import com.bookhub.bookhub_back.dto.policy.response.DiscountPolicyDetailResponseDto;
import com.bookhub.bookhub_back.entity.BookCategory;
import com.bookhub.bookhub_back.entity.DiscountPolicy;
import com.bookhub.bookhub_back.repository.BookCategoryRepository;
import com.bookhub.bookhub_back.repository.DiscountPolicyRepository;
import com.bookhub.bookhub_back.service.BookCategoryService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookCategoryServiceImpl implements BookCategoryService {
    private final BookCategoryRepository bookCategoryRepository;
    private final DiscountPolicyRepository discountPolicyRepository;
    private final BookCategoryRepository categoryRepository;

    // 1. 카테고리 생성
    @Override
    @Transactional
    public ResponseDto<CategoryCreateResponseDto> createCategory(CategoryCreateRequestDto dto) {
        BookCategory parent = null;
        CategoryCreateResponseDto responseDto;

        // 부모 카테고리가 있는 경우 조회
        if (dto.getParentCategoryId() != null) {
            parent = bookCategoryRepository.findById(dto.getParentCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("상위 카테고리가 존재하지 않습니다."));
        }

        BookCategory newCategory = BookCategory.builder()
                .categoryName(dto.getCategoryName())
                .categoryLevel(dto.getCategoryLevel())
                .categoryType(dto.getCategoryType())
                .isActive(true) // 기본값으로 활성 상태로 생성
                .parentCategoryId(parent)
                .build();

        BookCategory saved = bookCategoryRepository.save(newCategory);

        responseDto = CategoryCreateResponseDto.builder()
                .categoryId(saved.getCategoryId())
                .categoryName(saved.getCategoryName())
                .categoryLevel(saved.getCategoryLevel())
                .categoryType(saved.getCategoryType())
                .categoryOrder(saved.getCategoryOrder())
                .build();

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDto);
    }

    // 카테고리 수정
    @Override
    @Transactional
    public ResponseDto<CategoryUpdateResponseDto> updateCategory(Long categoryId, CategoryUpdateRequestDto dto) {
        BookCategory category = bookCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("카테고리가 존재하지 않습니다."));

        if (dto.getParentCategoryId() != null) {
            BookCategory parent = bookCategoryRepository.findById(dto.getParentCategoryId().getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("상위 카테고리가 존재하지 않습니다."));
            category.setParentCategoryId(parent);
        }
        if (dto.getCategoryName() != null) category.setCategoryName(dto.getCategoryName());
        if (dto.getCategoryLevel() != 0) category.setCategoryLevel(dto.getCategoryLevel());
        if (dto.getCategoryType() != null) category.setCategoryType(dto.getCategoryType());
        if (dto.getCategoryOrder() != 0) category.setCategoryOrder(dto.getCategoryOrder());
        if (dto.getIsActive() != null) category.setIsActive(dto.getIsActive());
        Long policyId = dto.getDiscountPolicyId();
        if (policyId != null && policyId > 0) {
            DiscountPolicy policy = discountPolicyRepository.findById(policyId)
                    .orElseThrow(() -> new EntityNotFoundException("할인 정책이 존재하지 않습니다."));
            category.setDiscountPolicyId(policy);
        } else {
            category.setDiscountPolicyId(null);
        }


        BookCategory updated = bookCategoryRepository.save(category);

        CategoryUpdateResponseDto responseDto = CategoryUpdateResponseDto.builder()
                .parentCategoryId(updated.getParentCategoryId() != null ? category.getParentCategoryId().getCategoryId() : null)
                .categoryName(updated.getCategoryName())
                .categoryLevel(updated.getCategoryLevel())
                .categoryType(updated.getCategoryType().toString())
                .categoryOrder(updated.getCategoryOrder())
                .isActive(updated.getIsActive())
                .discountPolicyId(updated.getDiscountPolicyId() != null ? category.getDiscountPolicyId().getPolicyId() : null)
                .build();

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDto);
    }

    // 카테고리 삭제(비활성화)
    @Override
    @Transactional
    public ResponseDto<Void> deleteCategory(Long categoryId) {
        BookCategory category = bookCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("카테고리가 존재하지 않습니다."));
        category.setIsActive(false);
        bookCategoryRepository.save(category);
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    // 트리 구조 조회
    @Override
    public ResponseDto<List<CategoryTreeResponseDto>> getCategoryTree(CategoryType type) {
        List<BookCategory> rootCategories = bookCategoryRepository.findByTypeAndLevel(type, 1);
        List<CategoryTreeResponseDto> result = rootCategories.stream()
                .map(this::buildTree)
                .collect(Collectors.toList());
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, result);
    }

    // 전체 활성화 카테고리 조회
    @Override
    public ResponseDto<List<CategoryTreeResponseDto>> getAllActiveCategories() {
        List<CategoryTreeResponseDto> result = bookCategoryRepository.findActive().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, result);
    }

    // 대분류 카테고리 목록 조회
    @Override
    public ResponseDto<List<CategoryTreeResponseDto>> getRootCategories() {
        List<CategoryTreeResponseDto> result = bookCategoryRepository.findRootCategories().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, result);
    }

    // 특정 부모 ID의 하위 카테고리 조회
    @Override
    public ResponseDto<List<CategoryTreeResponseDto>> getSubCategories(Long parentId) {
        List<CategoryTreeResponseDto> result = bookCategoryRepository.findByParentId(parentId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, result);
    }

    // 활성화된 카테고리 중 이름으로 조회
    @Override
    public ResponseDto<CategoryTreeResponseDto> getActiveByName(String name) {
        BookCategory category = bookCategoryRepository.findActiveByName(name)
                .orElseThrow(() -> new IllegalArgumentException("해당 이름의 카테고리가 존재하지 않습니다."));
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, buildTree(category));
    }
    
    // (활성/비활성 포함) 이름으로 카테고리 조회
    @Override
    public ResponseDto<CategoryTreeResponseDto> getCategoryByName(String name) {
        BookCategory category = bookCategoryRepository.findByCategoryName(name)
                .orElseThrow(() -> new IllegalArgumentException("해당 이름의 카테고리가 존재하지 않습니다."));
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, buildTree(category));
    }

    @Override
    @Transactional
    public ResponseDto<?> getPolicyByCategoryId(Long categoryId) {
        BookCategory category = bookCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리입니다."));

        DiscountPolicy policy = category.getDiscountPolicyId();

        // 정책이 없는 경우 null 응답
        if (policy == null) {
            return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, null);
        }

        DiscountPolicyDetailResponseDto dto = DiscountPolicyDetailResponseDto.builder()
                .policyTitle(policy.getPolicyTitle())
                .policyDescription(policy.getPolicyDescription())
                .policyType(policy.getPolicyType())
                .totalPriceAchieve(policy.getTotalPriceAchieve())
                .discountPercent(policy.getDiscountPercent())
                .startDate(policy.getStartDate())
                .endDate(policy.getEndDate())
                .build();

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, dto);
    }


    // 단건 엔티티를 트리 응답 DTO로 변환
    private CategoryTreeResponseDto toDto(BookCategory bc) {
        return CategoryTreeResponseDto.builder()
                .categoryId(bc.getCategoryId())
                .categoryName(bc.getCategoryName())
                .categoryLevel(bc.getCategoryLevel())
                .categoryType(bc.getCategoryType())
                .categoryOrder(bc.getCategoryOrder())
                .isActive(bc.getIsActive())
                .parentCategoryId(
                        bc.getParentCategoryId() != null
                                ? bc.getParentCategoryId().getCategoryId()
                                : null
                )
                .discountPolicyId(
                        bc.getDiscountPolicyId() != null
                                ? bc.getDiscountPolicyId().getPolicyId()
                                : null
                )
                .subCategories(new ArrayList<>())
                .build();
    }


    // 재귀적으로 하위 카테고리를 포함한 트리 구조로 변환
    private CategoryTreeResponseDto buildTree(BookCategory parent) {
        CategoryTreeResponseDto dto = toDto(parent);
        List<BookCategory> children = bookCategoryRepository.findByParentId(parent.getCategoryId());
        if (!children.isEmpty()) {
            List<CategoryTreeResponseDto> childDtos = children.stream()
                    .map(this::buildTree)
                    .collect(Collectors.toList());
            dto.setSubCategories(childDtos);
        }
        return dto;
    }
}