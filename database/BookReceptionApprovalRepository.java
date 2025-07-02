package com.bookhub.bookhub_back.repository;

import com.bookhub.bookhub_back.entity.BookReceptionApproval;
import com.bookhub.bookhub_back.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookReceptionApprovalRepository extends JpaRepository<BookReceptionApproval, Long> {
    // 지점 관리자의 수령 대기 리스트 조회
    @Query("""
    SELECT r FROM BookReceptionApproval r
    JOIN Employee e ON e.branchId.branchName = r.branchName
    WHERE e.loginId = :loginId
    AND r.isReceptionApproved = false
    """)
    List<BookReceptionApproval> findPendingByLoginId(@Param("loginId") String loginId);

    // 수령 확인(승인) 된 것들만 조회( 과거의 수령 확인 기록 조회용 - 지점 매니저들)
    @Query("""
    SELECT r FROM BookReceptionApproval r
    JOIN FETCH r.receptionEmployeeId e
    JOIN FETCH r.purchaseOrderApprovalId p
    JOIN Employee emp ON emp.branchId.branchName = r.branchName
    WHERE emp.loginId = :loginId
    AND r.isReceptionApproved = true
    """)
    List<BookReceptionApproval> findAllConfirmedByLoginId(@Param("loginId") String loginId);

    // ADMIN 전체(모든 지점의) 수령 확인 로그 조회(branchName 혹은 bookIsbn으로 필터링 가능)
    @Query("""
    SELECT r FROM BookReceptionApproval r
    JOIN FETCH r.receptionEmployeeId e
    JOIN FETCH r.purchaseOrderApprovalId p
    WHERE r.isReceptionApproved = true
    AND (:branchName IS NULL OR r.branchName LIKE %:branchName%)
    AND (:bookIsbn IS NULL OR r.bookIsbn LIKE %:bookIsbn%)
    """)
    List<BookReceptionApproval> findAllConfirmedLogsWithFilter(
            @Param("branchName") String branchName,
            @Param("bookIsbn") String bookIsbn);
}
