package com.bookhub.bookhub_back.repository;

import com.bookhub.bookhub_back.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByEmployeeId_EmployeeIdOrderByCreatedAtDesc(Long employeeId);
    List<Alert> findByEmployeeId_EmployeeIdAndIsReadFalseOrderByCreatedAtDesc(Long employeeId);

}
