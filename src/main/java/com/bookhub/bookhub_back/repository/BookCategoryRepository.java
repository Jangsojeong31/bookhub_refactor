package com.bookhub.bookhub_back.repository;

import com.bookhub.bookhub_back.common.enums.CategoryType;
import com.bookhub.bookhub_back.entity.BookCategory;
import com.bookhub.bookhub_back.entity.DiscountPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {

    // 1. 활성 카테고리 조회
    @Query("SELECT bc FROM BookCategory bc WHERE bc.isActive = true")
    List<BookCategory> findActive();

    // 2. 대분류 조회
    @Query("SELECT bc FROM BookCategory bc WHERE bc.parentCategoryId IS NULL AND bc.isActive = true")
    List<BookCategory> findRootCategories();

    // 3. 특정 부모 ID의 하위 카테고리
    @Query("SELECT bc FROM BookCategory bc WHERE bc.parentCategoryId.categoryId = :parentId AND bc.isActive = true")
    List<BookCategory> findByParentId(@Param("parentId") Long parentId);

    // 4. 특정 타입과 레벨의 카테고리 조회
    @Query("SELECT bc FROM BookCategory bc WHERE bc.categoryType = :type AND bc.categoryLevel = :level AND bc.isActive = true")
    List<BookCategory> findByTypeAndLevel(@Param("type") CategoryType type, @Param("level") int level);

    // 5. 특정 이름의 활성 카테고리 조회
    @Query("SELECT bc FROM BookCategory bc WHERE bc.categoryName = :name AND bc.isActive = true")
    Optional<BookCategory> findActiveByName(@Param("name") String categoryName);

    // 6. 특정 이름의 카테고리 (활성/비활성 상태 모두) 조회
    Optional<BookCategory> findByCategoryName(String categoryName);

    // CategoryRepository.java
    @Query("""
    SELECT c.discountPolicyId FROM BookCategory c
    WHERE c.categoryId = :categoryId AND c.isActive = true
""")
    Optional<DiscountPolicy> findPolicyByCategoryId(@Param("categoryId") Long categoryId);

}