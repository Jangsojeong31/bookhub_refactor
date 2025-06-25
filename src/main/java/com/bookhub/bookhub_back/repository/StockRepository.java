package com.bookhub.bookhub_back.repository;

import com.bookhub.bookhub_back.entity.Book;
import com.bookhub.bookhub_back.entity.Branch;
import com.bookhub.bookhub_back.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
    List<Stock> findByBookIsbn_Isbn(String bookIsbn); // ISBN으로 검색

    List<Stock> findByBookIsbn_BookTitleContaining(String keyword); // 제목 부분 검색


    Optional<Stock> findByBookIsbnAndBranchId(Book bookIsbn, Branch branchId);

    List<Stock> findByBranchId_BranchId(Long branchId);
}
