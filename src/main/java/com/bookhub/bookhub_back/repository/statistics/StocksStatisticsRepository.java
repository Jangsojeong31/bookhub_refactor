package com.bookhub.bookhub_back.repository.statistics;

import com.bookhub.bookhub_back.common.enums.StockActionType;
import com.bookhub.bookhub_back.dto.statistics.projection.CategoryStockProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.TimeStockChartProjection;
import com.bookhub.bookhub_back.entity.StockLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StocksStatisticsRepository extends JpaRepository<StockLog, Long> {
    @Query("""
            SELECT SUM(sl.amount)
            FROM StockLog sl
            WHERE sl.branchId.id = :branchId
            AND sl.stockActionType = :type
            AND FUNCTION('YEAR', sl.actionDate) = :year
            AND FUNCTION('MONTH', sl.actionDate) = :month
        """)
    Long sumAmountByBranchAndType(
        @Param("branchId") Long branchId,
        @Param("type") StockActionType type,
        @Param("year") int year,
        @Param("month") int month
    );

    @Query("""
            SELECT s.branchId.branchName AS branchName,
                   MONTH(s.actionDate) AS month,
                   SUM(CASE WHEN s.stockActionType = 'IN' THEN s.amount ELSE 0 END) AS inAmount,
                   SUM(CASE WHEN s.stockActionType = 'LOSS' THEN s.amount ELSE 0 END) AS lossAmount
            FROM StockLog s
            WHERE YEAR(s.actionDate) = :year
            GROUP BY s.branchId.branchName, MONTH(s.actionDate)
            ORDER BY s.branchId.branchName, MONTH(s.actionDate)
        """)
    List<TimeStockChartProjection> findTimeStockStatisticsByYear(@Param("year") Long year);


    @Query("""
            SELECT c.categoryName AS categoryName, SUM(sl.bookAmount) AS totalAmount
            FROM Stock sl
            JOIN sl.bookIsbn b
            JOIN b.categoryId c
            WHERE sl.branchId.branchName = :branchName
            GROUP BY c.categoryName
            ORDER BY SUM(sl.bookAmount) DESC
        """)
    List<CategoryStockProjection> findCategoryStockByBranch(@Param("branchName") String branchName);
}