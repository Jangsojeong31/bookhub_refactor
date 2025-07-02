package com.bookhub.bookhub_back.repository;

import com.bookhub.bookhub_back.entity.RefundOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefundOrderRepository extends JpaRepository<RefundOrder, Long> {
}
