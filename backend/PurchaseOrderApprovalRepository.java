package com.bookhub.bookhub_back.repository;

import com.bookhub.bookhub_back.entity.Employee;
import com.bookhub.bookhub_back.entity.PurchaseOrder;
import com.bookhub.bookhub_back.entity.PurchaseOrderApproval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PurchaseOrderApprovalRepository extends JpaRepository<PurchaseOrderApproval, Long> {
    List<PurchaseOrderApproval> findByEmployeeId(Employee employee);

    List<PurchaseOrderApproval> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);

    List<PurchaseOrderApproval> findByIsApproved(boolean isApproved);

    List<PurchaseOrderApproval> findByEmployeeIdAndIsApproved(Employee employee, boolean isApproved);
}
