package com.bookhub.bookhub_back.repository;

import com.bookhub.bookhub_back.entity.CustomerOrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerOrderDetailRepository extends JpaRepository<CustomerOrderDetail,Long> {
}
