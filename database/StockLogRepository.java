package com.bookhub.bookhub_back.repository;

import com.bookhub.bookhub_back.common.enums.StockActionType;
import com.bookhub.bookhub_back.entity.Book;
import com.bookhub.bookhub_back.entity.Branch;
import com.bookhub.bookhub_back.entity.Employee;
import com.bookhub.bookhub_back.entity.StockLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StockLogRepository extends JpaRepository<StockLog, Long> {
    List<StockLog> findByBranchId(Branch branchId);

    List<StockLog> findByBranchIdAndStockActionType(Branch branchId, StockActionType type);

    @Query("SELECT s FROM StockLog s WHERE s.branchId = :branch AND s.actionDate BETWEEN :start AND :end")
    List<StockLog> findByTime(@Param("branch") Branch branch,
                              @Param("start") LocalDateTime start,
                              @Param("end") LocalDateTime end);

    List<StockLog> findByEmployeeId(Employee employeeId);

    List<StockLog> findByBookIsbn(Book bookIsbn);
}
