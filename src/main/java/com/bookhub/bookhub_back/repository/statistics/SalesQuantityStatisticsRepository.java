package com.bookhub.bookhub_back.repository.statistics;

import com.bookhub.bookhub_back.dto.statistics.projection.BestSellerProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.CategorySalesQuantityProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.SalesQuantityStatisticsProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.YearlySalesQuantityProjection;
import com.bookhub.bookhub_back.entity.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalesQuantityStatisticsRepository extends JpaRepository<CustomerOrder, Long> {
    // 총합 베스트 셀러 (100위까지)
    @Query(value = """
        SELECT 
            b.book_isbn AS isbn,
            b.book_title AS bookTitle,
            a.author_name AS authorName,
            p.publisher_name AS publisherName,
            bc.category_name AS categoryName,
            b.cover_url AS coverUrl,
            SUM(cod.amount) AS totalSales
        FROM customer_orders_detail cod
        JOIN customer_orders co ON cod.customer_order_id = co.customer_order_id
        JOIN books b ON cod.book_isbn = b.book_isbn
        JOIN authors a ON b.author_id = a.author_id
        JOIN publishers p ON b.publisher_id = p.publisher_id
        JOIN book_categories bc ON b.category_id = bc.category_id
        LEFT JOIN refund_orders r
            ON r.order_id = co.customer_order_id
        WHERE r.order_id IS NULL
        GROUP BY b.book_isbn, b.book_title, a.author_name,
            p.publisher_name, bc.category_name, b.cover_url
        ORDER BY totalSales DESC                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    LIMIT 100;
        """, nativeQuery = true)
    List<BestSellerProjection> findTop100BestSellers();

    // 기간별 베스트셀러 (100위까지)
    // 주간
    @Query(value = """
        SELECT
            b.book_isbn AS isbn, 
            b.book_title AS bookTitle,
            a.author_name AS authorName, 
            p.publisher_name AS publisherName, 
            bc.category_name AS categoryName, 
            b.cover_url AS coverUrl,
            SUM(cod.amount) AS totalSales
        FROM customer_orders_detail cod
        JOIN customer_orders co ON cod.customer_order_id = co.customer_order_id
        JOIN books b ON cod.book_isbn = b.book_isbn
        JOIN authors a ON b.author_id = a.author_id
        JOIN publishers p ON b.publisher_id = p.publisher_id
        JOIN book_categories bc ON b.category_id = bc.category_id
        LEFT JOIN refund_orders r
            ON r.order_id = co.customer_order_id
        WHERE co.customer_order_date_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
            AND r.order_id IS NULL
        GROUP BY b.book_isbn, b.book_title, a.author_name,
            p.publisher_name, bc.category_name, b.cover_url
        ORDER BY totalSales DESC
        LIMIT 100;
        """, nativeQuery = true)
    List<BestSellerProjection> findWeeklyBestSellers();

    // 월간
    @Query(value = """
        SELECT 
            b.book_isbn AS isbn, 
            b.book_title AS bookTitle,
            a.author_name AS authorName, 
            p.publisher_name AS publisherName, 
            bc.category_name AS categoryName, 
            b.cover_url AS coverUrl,
            SUM(cod.amount) AS totalSales
        FROM customer_orders_detail cod
        JOIN customer_orders co ON cod.customer_order_id = co.customer_order_id
        JOIN books b ON cod.book_isbn = b.book_isbn
        JOIN authors a ON b.author_id = a.author_id
        JOIN publishers p ON b.publisher_id = p.publisher_id
        JOIN book_categories bc ON b.category_id = bc.category_id
        LEFT JOIN refund_orders r
            ON r.order_id = co.customer_order_id
        WHERE co.customer_order_date_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
             AND r.order_id IS NULL
        GROUP BY b.book_isbn, b.book_title, a.author_name,  
            p.publisher_name, bc.category_name, b.cover_url
        ORDER BY totalSales DESC
        LIMIT 100;
        """, nativeQuery = true)
    List<BestSellerProjection> findMonthlyBestSellers();

    // 연간
    @Query(value = """
        SELECT 
            b.book_isbn AS isbn, 
            b.book_title AS bookTitle,
            a.author_name AS authorName, 
            p.publisher_name AS publisherName, 
            bc.category_name AS categoryName, 
            b.cover_url AS coverUrl,
            SUM(cod.amount) AS totalSales
        FROM customer_orders_detail cod
        JOIN customer_orders co ON cod.customer_order_id = co.customer_order_id
        JOIN books b ON cod.book_isbn = b.book_isbn
        JOIN authors a ON b.author_id = a.author_id
        JOIN publishers p ON b.publisher_id = p.publisher_id
        JOIN book_categories bc ON b.category_id = bc.category_id
        LEFT JOIN refund_orders r
            ON r.order_id = co.customer_order_id
        WHERE co.customer_order_date_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
        AND r.order_id IS NULL
        GROUP BY b.book_isbn, b.book_title, a.author_name,
            p.publisher_name, bc.category_name, b.cover_url
        ORDER BY totalSales DESC
        LIMIT 100;
        """, nativeQuery = true)
    List<BestSellerProjection> findYearlyBestSellers();

    // 카테고리별 베스트셀러 (일주일간, 20위까지)
    @Query(value = """
        SELECT 
            b.book_isbn AS isbn, 
            b.book_title AS bookTitle,
            a.author_name AS authorName, 
            p.publisher_name AS publisherName, 
            bc.category_name AS categoryName, 
            b.cover_url AS coverUrl,
            SUM(cod.amount) AS totalSales
        FROM customer_orders_detail cod
        JOIN customer_orders co ON cod.customer_order_id = co.customer_order_id
        JOIN books b ON cod.book_isbn = b.book_isbn
        JOIN authors a ON b.author_id = a.author_id
        JOIN publishers p ON b.publisher_id = p.publisher_id
        JOIN book_categories bc ON b.category_id = bc.category_id
        LEFT JOIN refund_orders r
            ON r.order_id = co.customer_order_id
        WHERE co.customer_order_date_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
            AND ( bc.category_id = :categoryId OR bc.parent_category_id = :categoryId )
            AND r.order_id IS NULL
        GROUP BY b.book_isbn, b.book_title, a.author_name,
            p.publisher_name, bc.category_name, b.cover_url
        ORDER BY totalSales DESC
        LIMIT 20;
        """, nativeQuery = true)
    List<BestSellerProjection> findBestSellersByCategory(@Param("categoryId") Long categoryId);

    // 판매 수량 차트
    // 기간별
    // 1) Daily (15일간)
    @Query(value = """
        SELECT 
            DATE(co.customer_order_date_at) AS orderDate, 
            SUM(cod.amount) AS totalSales
        FROM customer_orders_detail cod
        JOIN customer_orders co ON cod.customer_order_id = co.customer_order_id
        JOIN books b ON cod.book_isbn = b.book_isbn
        LEFT JOIN refund_orders r
            ON r.order_id = co.customer_order_id
        WHERE co.customer_order_date_at >= DATE_SUB(NOW(), INTERVAL 15 DAY)
            AND r.order_id IS NULL
        GROUP BY DATE(co.customer_order_date_at)
        ORDER BY orderDate ASC;
        """, nativeQuery = true)
    List<SalesQuantityStatisticsProjection> findDailySalesQuantity();

    // 2) weekly
    @Query(value = """
        SELECT 
            DATE(co.customer_order_date_at) AS orderDate, 
            SUM(cod.amount) AS totalSales
        FROM customer_orders_detail cod
        JOIN customer_orders co ON cod.customer_order_id = co.customer_order_id
        JOIN books b ON cod.book_isbn = b.book_isbn
        LEFT JOIN refund_orders r
            ON r.order_id = co.customer_order_id
        WHERE co.customer_order_date_at >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
            AND co.customer_order_date_at <  DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
            AND r.order_id IS NULL
        GROUP BY DATE(co.customer_order_date_at)
        ORDER BY orderDate ASC;
        """, nativeQuery = true)
    List<SalesQuantityStatisticsProjection> findWeeklySalesQuantity();

    // 3) monthly
    @Query(value = """
        SELECT 
            MONTH(co.customer_order_date_at) AS orderMonth, 
            SUM(cod.amount) AS totalSales
        FROM customer_orders_detail cod
        JOIN customer_orders co 
            ON cod.customer_order_id = co.customer_order_id
        LEFT JOIN refund_orders r
            ON r.order_id = co.customer_order_id
        WHERE YEAR(co.customer_order_date_at) = :year
            AND r.order_id IS NULL
        GROUP BY MONTH(co.customer_order_date_at)
        ORDER BY MONTH(co.customer_order_date_at) ASC;
        """, nativeQuery = true)
    List<SalesQuantityStatisticsProjection> findMonthlySalesQuantity(@Param("year") int year);


    // 할인항목별
    @Query(value = """
        SELECT 
            dp.policy_title AS policyTitle, 
            COALESCE(SUM(cod.amount), 0) AS totalSales
        FROM discount_policies dp
        LEFT JOIN customer_orders co 
            ON dp.policy_id = co.applied_policy_id
            AND YEAR(co.customer_order_date_at) = :year
            AND QUARTER(co.customer_order_date_at) = :quarter        
            AND NOT EXISTS (
                SELECT 1
                FROM refund_orders r
                WHERE r.order_id = co.customer_order_id
                )
        LEFT JOIN customer_orders_detail cod
            ON cod.customer_order_id = co.customer_order_id
        GROUP BY dp.policy_title
        ORDER BY totalSales DESC;
        """, nativeQuery = true)
    List<SalesQuantityStatisticsProjection> findSalesQuantityByDiscountPolicy(@Param("year") int year, @Param("quarter") int quarter);

    // 지점별
    @Query(value = """
        SELECT 
            br.branch_name AS branchName,
            COALESCE(SUM(co.customer_order_total_amount), 0) AS totalSales
        FROM branches br
        LEFT JOIN customer_orders co
            ON co.branch_id = br.branch_id
            AND YEAR(co.customer_order_date_at) = :year
            AND MONTH(co.customer_order_date_at) = :month
            AND NOT EXISTS (
                SELECT 1
                FROM refund_orders r
                WHERE r.order_id = co.customer_order_id
                )
        GROUP BY br.branch_name
        ORDER BY totalSales DESC
    """, nativeQuery = true)
    List<SalesQuantityStatisticsProjection> findSalesQuantityByBranch(@Param("year") int year, @Param("month") int month);

    // 카테고리별
    @Query(value = """
            SELECT
                 COALESCE(bc_parent.category_type, bc_leaf.category_type) AS category_type,
                 COALESCE(bc_parent.category_id, bc_leaf.category_id) AS categoryId,
                 COALESCE(bc_parent.category_name, bc_leaf.category_name) AS categoryName,
                 COALESCE(SUM(cod.amount), 0) AS totalSales
             FROM books b
             JOIN book_categories bc_leaf ON b.category_id = bc_leaf.category_id
             LEFT JOIN book_categories bc_parent ON bc_leaf.parent_category_id = bc_parent.category_id
             JOIN customer_orders_detail cod ON cod.book_isbn = b.book_isbn
             JOIN customer_orders co ON co.customer_order_id = cod.customer_order_id
             LEFT JOIN refund_orders r ON r.order_id = co.customer_order_id
             WHERE co.customer_order_date_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
               AND r.order_id IS NULL
             GROUP BY
                 COALESCE(bc_parent.category_type, bc_leaf.category_type),
                 COALESCE(bc_parent.category_id, bc_leaf.category_id),
                 COALESCE(bc_parent.category_name, bc_leaf.category_name)
             ORDER BY totalSales DESC;
        """, nativeQuery = true)
    List<CategorySalesQuantityProjection> findSalesQuantityByCategory();
}
