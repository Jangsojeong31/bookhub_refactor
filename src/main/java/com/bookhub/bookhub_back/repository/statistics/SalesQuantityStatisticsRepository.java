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
            SELECT b.book_isbn AS isbn,
                   b.book_title AS bookTitle,
                   a.author_name AS authorName,
                   p.publisher_name AS publisherName,
                   bc.category_name AS categoryName,
                   b.cover_url AS coverUrl,
                   SUM(cod.amount) AS totalSales
                         FROM customer_orders_detail cod
                         JOIN books b ON cod.book_isbn = b.book_isbn
                         JOIN authors a ON b.author_id = a.author_id
                         JOIN publishers p ON b.publisher_id = p.publisher_id
                         JOIN book_categories bc ON b.category_id = bc.category_id
                         GROUP BY b.book_isbn
                         ORDER BY totalSales DESC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      LIMIT 100;
        """, nativeQuery = true)
    List<BestSellerProjection> findTop100BestSellers();

    // 기간별 베스트셀러 (100위까지)
    @Query(value = """
            SELECT b.book_isbn AS isbn, 
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
                         WHERE co.customer_order_date_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
                         GROUP BY b.book_isbn
                         ORDER BY totalSales DESC
                         LIMIT 100;
        """, nativeQuery = true)
    List<BestSellerProjection> findWeeklyBestSellers();

    @Query(value = """
            SELECT b.book_isbn AS isbn, 
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
                         WHERE co.customer_order_date_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
                         GROUP BY b.book_isbn
                         ORDER BY totalSales DESC
                         LIMIT 100;
        """, nativeQuery = true)
    List<BestSellerProjection> findMonthlyBestSellers();

    @Query(value = """
            SELECT b.book_isbn AS isbn, 
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
                         WHERE co.customer_order_date_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
                         GROUP BY b.book_isbn
                         ORDER BY totalSales DESC
                         LIMIT 100;
        """, nativeQuery = true)
    List<BestSellerProjection> findYearlyBestSellers();

    // 카테고리별 베스트셀러 (일주일간, 20위까지)
    @Query(value = """
            SELECT b.book_isbn AS isbn, 
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
                 WHERE co.customer_order_date_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
                     AND ( bc.category_id = :categoryId OR bc.parent_category_id = :categoryId )
                 GROUP BY b.book_isbn
                 ORDER BY totalSales DESC
                 LIMIT 20;
        """, nativeQuery = true)
    List<BestSellerProjection> findBestSellersByCategory(@Param("categoryId") Long categoryId);

    // 판매 수량 차트
    // 기간별
    // 1) Daily (15일간)
    @Query(value = """
            SELECT co.customer_order_date_at AS orderDate, 
                   SUM(cod.amount) AS totalSales
                 FROM customer_orders_detail cod
                 JOIN customer_orders co ON cod.customer_order_id = co.customer_order_id
                 JOIN books b ON cod.book_isbn = b.book_isbn
                 WHERE co.customer_order_date_at >= DATE_SUB(NOW(), INTERVAL 15 DAY)
                 GROUP BY co.customer_order_date_at
                 ORDER BY co.customer_order_date_at ASC;
        """, nativeQuery = true)
    List<SalesQuantityStatisticsProjection> findDailySalesQuantity();

    // 2) weekly
    @Query(value = """
            SELECT co.customer_order_date_at AS orderDate, 
                   SUM(cod.amount) AS totalSales
                 FROM customer_orders_detail cod
                 JOIN customer_orders co ON cod.customer_order_id = co.customer_order_id
                 JOIN books b ON cod.book_isbn = b.book_isbn
                 WHERE co.customer_order_date_at >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
                    AND co.customer_order_date_at <  DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
                 GROUP BY co.customer_order_date_at
                 ORDER BY co.customer_order_date_at ASC;
        """, nativeQuery = true)
    List<SalesQuantityStatisticsProjection> findWeeklySalesQuantity();

    // 3) monthly
    @Query(value = """
            SELECT MONTH(co.customer_order_date_at) AS orderMonth, 
                   SUM(cod.amount) AS totalSales
                         FROM customer_orders_detail cod
                         JOIN customer_orders co ON cod.customer_order_id = co.customer_order_id
                         WHERE YEAR(co.customer_order_date_at) = :year
                         GROUP BY MONTH(co.customer_order_date_at)
                         ORDER BY MONTH(co.customer_order_date_at) ASC;
        """, nativeQuery = true)
    List<SalesQuantityStatisticsProjection> findMonthlySalesQuantity(@Param("year") int year);


    // 할인항목별
    @Query(value = """
            SELECT dp.policy_title AS policyTitle, 
                   COALESCE(SUM(cod.amount), 0) AS totalSales
                 FROM discount_policies dp
                 LEFT JOIN 
                     customer_orders co 
                      ON dp.policy_id = co.applied_policy_id
                      AND YEAR(co.customer_order_date_at) = :year
                      AND QUARTER(co.customer_order_date_at) = :quarter        
                 LEFT JOIN
                      customer_orders_detail cod
                      ON cod.customer_order_id = co.customer_order_id
                 GROUP BY dp.policy_title
                 ORDER BY totalSales DESC;
        """, nativeQuery = true)
    List<SalesQuantityStatisticsProjection> findSalesQuantityByDiscountPolicy(@Param("year") int year, @Param("quarter") int quarter);

    // 지점별
    @Query(value = """
        SELECT br.branch_name AS branchName,
               COALESCE(SUM(co.customer_order_total_amount), 0) AS totalSales
            FROM branches br
            LEFT JOIN customer_orders co
              ON co.branch_id = br.branch_id
              AND YEAR(co.customer_order_date_at) = :year
              AND MONTH(co.customer_order_date_at) = :month
            GROUP BY br.branch_name
            ORDER BY totalSales DESC
    """, nativeQuery = true)
    List<SalesQuantityStatisticsProjection> findSalesQuantityByBranch(@Param("year") int year, @Param("month") int month);

    // 카테고리별
    @Query(value = """
            SELECT
                  bc_top.category_type,
                  bc_top.category_id AS categoryId,
                  bc_top.category_name AS categoryName,
                  COALESCE(SUM(
                          CASE
                          WHEN co.customer_order_date_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
                          THEN cod.amount
                          ELSE 0
                          END
                        ), 0) AS totalSales
                FROM book_categories bc_top
                LEFT JOIN book_categories bc_leaf
                    ON bc_leaf.parent_category_id = bc_top.category_id
                LEFT JOIN books b
                    ON b.category_id = bc_leaf.category_id     
                LEFT JOIN customer_orders_detail cod
                    ON cod.book_isbn = b.book_isbn
                LEFT JOIN customer_orders co
                    ON co.customer_order_id = cod.customer_order_id    
                WHERE bc_top.parent_category_id IS NULL
                   
                GROUP BY bc_top.category_type, bc_top.category_id, bc_top.category_name
                ORDER BY bc_top.category_type, totalSales DESC;
        """, nativeQuery = true)
    List<CategorySalesQuantityProjection> findSalesQuantityByCategory();
}
