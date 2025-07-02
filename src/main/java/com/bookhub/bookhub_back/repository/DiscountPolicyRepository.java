package com.bookhub.bookhub_back.repository;

import com.bookhub.bookhub_back.common.enums.PolicyType;
import com.bookhub.bookhub_back.entity.DiscountPolicy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface DiscountPolicyRepository extends JpaRepository< DiscountPolicy,Long> {

    //기간 설정하여 할인정책 검색
    @Query("SELECT p FROM DiscountPolicy p WHERE p.startDate <= :end AND p.endDate >= :start")
    List<DiscountPolicy> getPoliciesByTime(@Param("start") LocalDateTime start,
                                           @Param("end") LocalDateTime end);

    Page<DiscountPolicy> findAll(Specification<DiscountPolicy> spec, Pageable pageable);

    @Query("""
    SELECT p 
      FROM DiscountPolicy p
     WHERE (:keyword IS NULL OR p.policyTitle LIKE CONCAT('%', :keyword, '%'))
       AND (:type    IS NULL OR p.policyType  = :type)
       AND (:start   IS NULL OR p.startDate   >= :start)
       AND (:end     IS NULL OR p.endDate     <= :end)
    ORDER BY p.policyId DESC
    """)
    Page<DiscountPolicy> findFiltered(
            @Param("keyword") String keyword,
            @Param("type")    PolicyType type,
            @Param("start")   LocalDate start,
            @Param("end")     LocalDate end,
            Pageable pageable   );
}
