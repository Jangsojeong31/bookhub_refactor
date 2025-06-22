package com.bookhub.bookhub_back.repository;

import com.bookhub.bookhub_back.common.enums.ExitReason;
import com.bookhub.bookhub_back.common.enums.PurchaseOrderStatus;
import com.bookhub.bookhub_back.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {

    List<PurchaseOrder> findByEmployeeId(Employee employee);
    List<PurchaseOrder> findByBookIsbn(Book bookIsbn);
    List<PurchaseOrder> findByPurchaseOrderStatus(PurchaseOrderStatus purchaseOrderStatus);

    List<PurchaseOrder> findByEmployeeIdAndBookIsbn(Employee employee, Book book);
    List<PurchaseOrder> findByEmployeeIdAndPurchaseOrderStatus(Employee employee, PurchaseOrderStatus purchaseOrderStatus);
    List<PurchaseOrder> findByBookIsbnAndPurchaseOrderStatus(Book book, PurchaseOrderStatus purchaseOrderStatus);

    List<PurchaseOrder> findByEmployeeIdAndBookIsbnAndPurchaseOrderStatus(Employee employee, Book book, PurchaseOrderStatus purchaseOrderStatus);
}