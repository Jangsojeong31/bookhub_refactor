package com.bookhub.bookhub_back.repository.statistics;


import com.bookhub.bookhub_back.dto.statistics.projection.MonthlyRevenueStatisticsProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.WeeklyRevenueStatisticsProjection;
import com.bookhub.bookhub_back.dto.statistics.response.revenue.BranchRevenueResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.revenue.MonthlyRevenueResponseDto;
import com.bookhub.bookhub_back.entity.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RevenueStatisticsRepository extends JpaRepository<CustomerOrder, Long> {

    // (네이티브 쿼리 유지해도 되지만, 필요하다면 JPQL로 바꿀 수도 있습니다)
    @Query(value =
            "SELECT " +
                    "  CASE DAYOFWEEK(co.customer_order_date_at) " +
                    "    WHEN 1 THEN '일' WHEN 2 THEN '월' WHEN 3 THEN '화' WHEN 4 THEN '수' " +
                    "    WHEN 5 THEN '목' WHEN 6 THEN '금' WHEN 7 THEN '토' END AS weekday, " +
                    "  COALESCE(SUM(co.customer_order_total_price), 0) AS total " +
                    "FROM customer_orders co " +
                    "WHERE YEAR(co.customer_order_date_at) = :year " +
                    "  AND MONTH(co.customer_order_date_at) BETWEEN :startMonth AND :endMonth " +
                    "GROUP BY weekday " +
                    "ORDER BY FIELD(weekday, '월','화','수','목','금','토','일')",
            nativeQuery = true)
    List<Object[]> findRevenueGroupedByWeekday(
            int year,
            int startMonth,
            int endMonth
    );

    // 월간 매출 집계 (순수 JPQL)
    @Query(value = """
        SELECT
        MONTH(co.customer_order_date_at) AS orderMonth,
        SUM(co.customer_order_total_price) AS totalRevenue
        FROM customer_orders co
        LEFT JOIN refund_orders r
        ON r.order_id = co.customer_order_id
        WHERE YEAR(co.customer_order_date_at) = :year
        AND r.order_id IS NULL
        GROUP BY MONTH(co.customer_order_date_at)
        ORDER BY MONTH(co.customer_order_date_at) ASC;
        """, nativeQuery = true)
    List<MonthlyRevenueStatisticsProjection> findMonthlySales(
            @Param("year") int year
    );

    // 지점·카테고리별 매출 집계 (JPQL)
    @Query("""
        SELECT new com.bookhub.bookhub_back.dto.statistics.response.revenue.BranchRevenueResponseDto(
            b.branchId,
            b.branchName,
            cat.categoryName,
            SUM(d.price * d.amount)
        )
        FROM CustomerOrder o
        JOIN o.branchId b
        JOIN o.customerOrderDetails d
        JOIN d.book bk
        JOIN bk.categoryId cat
        WHERE FUNCTION('DATE', o.createdAt) BETWEEN :startDate AND :endDate
        GROUP BY b.branchId, b.branchName, cat.categoryName
        ORDER BY b.branchId
        """)
    List<BranchRevenueResponseDto> findByBranchByDate(
            @Param("startDate") LocalDate startDate,
            @Param("endDate")   LocalDate endDate
    );

    // 주차별 매출 조회용 메서드명 기반 쿼리
    List<CustomerOrder> findByCreatedAtBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    @Query(value = """
        SELECT
            DATE(co.customer_order_date_at) AS orderDate,
            SUM(co.customer_order_total_price) AS totalRevenue
        FROM customer_orders co
        LEFT JOIN refund_orders r
            ON r.order_id = co.customer_order_id
        WHERE YEAR(co.customer_order_date_at) = :year
            AND MONTH(co.customer_order_date_at) = :month
            AND r.order_id IS NULL
        GROUP BY DATE(co.customer_order_date_at)
        ORDER BY orderDate ASC;
""", nativeQuery = true)
    List<WeeklyRevenueStatisticsProjection> findWeeklySales(@Param("year") int year, @Param("month") int month);
}


//@Repository
//public interface RevenueStatisticsRepository extends JpaRepository<CustomerOrder,Long> {


////
//    @Query(value =
//            "SELECT " +
//                    "  CASE DAYOFWEEK(co.customer_order_date_at) " +
//                    "    WHEN 1 THEN '일' WHEN 2 THEN '월' WHEN 3 THEN '화' WHEN 4 THEN '수' " +
//                    "    WHEN 5 THEN '목' WHEN 6 THEN '금' WHEN 7 THEN '토' END AS weekday, " +
//                    "  COALESCE(SUM(co.customer_order_total_price), 0) AS total " +
//                    "FROM customer_orders co " +
//                    "WHERE YEAR(co.customer_order_date_at) = :year " +
//                    "  AND MONTH(co.customer_order_date_at) BETWEEN :startMonth AND :endMonth " +
//                    "GROUP BY " +
//                    "  CASE DAYOFWEEK(co.customer_order_date_at) " +
//                    "    WHEN 1 THEN '일' WHEN 2 THEN '월' WHEN 3 THEN '화' WHEN 4 THEN '수' " +
//                    "    WHEN 5 THEN '목' WHEN 6 THEN '금' WHEN 7 THEN '토' END " +
//                    "ORDER BY FIELD(weekday, '월','화','수','목','금','토','일')",
//            nativeQuery = true)
//    List<Object[]> findRevenueGroupedByWeekday(int year, int startMonth, int endMonth);
////월간 총 매출 금액 (1월~12월 : x축)
//    //현재 월을 기분으로 이전 1년간의 데이터를 조회할 수 있다. (만약 현재가 2025.6/6일이면 2024.6.1부터 2025.5.31까지의 데이터 조회 가능)
//
//    @Query(value = """
//      SELECT
//  DATE_FORMAT(co.customer_order_date_at, '%Y-%m') AS month,
//  SUM(co.customer_order_total_price)         AS total_revenue
//FROM customer_orders AS co
//WHERE co.customer_order_date_at >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 YEAR), '%Y-%m-01')
//  AND co.customer_order_date_at <  DATE_FORMAT(CURDATE(),             '%Y-%m-01')
//GROUP BY month
//ORDER BY month;
//""",nativeQuery = true)
//    List<MonthlyRevenueResponseDto> findMonthlySales(LocalDate startDate, LocalDate endDate);
//
//    @Query(value = """
//        SELECT new com.bookhub.bookhub_back.dto.statistics.response.revenue.BranchRevenueResponseDto(
//          b.branchId,
//          b.branchName,
//          cat.categoryName,
//          SUM(d.price * d.amount)
//        )
//        FROM CustomerOrder o
//        JOIN o.branchId b
//        JOIN o.customerOrderDetails d
//        JOIN d.book bk
//        JOIN bk.categoryId cat
//        WHERE FUNCTION('DATE', o.createdAt)
//              BETWEEN :startDate AND :endDate
//        GROUP BY b.branchId, b.branchName, cat.categoryName
//        ORDER BY b.branchId
//        """,nativeQuery = true)
//    List<BranchRevenueResponseDto> findByBranchByDate(@Param("startDate") LocalDate startDate,
//                                                      @Param("endDate")   LocalDate endDate);
//
//    List<CustomerOrder> findByCreatedAtBetween(LocalDateTime localDateTime, LocalDateTime localDateTime1);
//}
