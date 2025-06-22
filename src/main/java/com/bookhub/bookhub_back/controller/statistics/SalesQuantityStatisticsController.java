package com.bookhub.bookhub_back.controller.statistics;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.statistics.projection.BestSellerProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.CategorySalesQuantityProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.SalesQuantityStatisticsProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.YearlySalesQuantityProjection;
import com.bookhub.bookhub_back.service.statistics.SalesQuantityStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//판매 수량별 통계 컨트롤러
@RestController
@RequestMapping(ApiMappingPattern.BASIC_API)
@RequiredArgsConstructor
public class SalesQuantityStatisticsController {
    private final SalesQuantityStatisticsService salesQuantityStatisticsService;
    private final String BEST_SELLER_API = ApiMappingPattern.MANAGER_API + ("/statistics/sales-quantity/bestseller");
    private final String SALES_QUANTITY_API = ApiMappingPattern.ADMIN_API + ("/statistics/sales-quantity");

    // 총합 베스트셀러
    @GetMapping(BEST_SELLER_API)
    public ResponseEntity<ResponseDto<List<BestSellerProjection>>> getTop100BestSellers() {
        ResponseDto<List<BestSellerProjection>> response = salesQuantityStatisticsService.getTop100BestSellers();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 기간별 베스트 셀러 -- 일주일, 한달, 일년
    // 일주일
    @GetMapping(BEST_SELLER_API + ("/weekly"))
    public ResponseEntity<ResponseDto<List<BestSellerProjection>>> getWeeklyBestSellers() {
        ResponseDto<List<BestSellerProjection>> response = salesQuantityStatisticsService.getWeeklyBestSellers();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 한달
    @GetMapping(BEST_SELLER_API + ("/monthly"))
    public ResponseEntity<ResponseDto<List<BestSellerProjection>>> getMonthlyBestSellers() {
        ResponseDto<List<BestSellerProjection>> response = salesQuantityStatisticsService.getMonthlyBestSellers();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 일년
    @GetMapping(BEST_SELLER_API + ("/yearly"))
    public ResponseEntity<ResponseDto<List<BestSellerProjection>>> getYearlyBestSellers() {
        ResponseDto<List<BestSellerProjection>> response = salesQuantityStatisticsService.getYearlyBestSellers();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 카테고리별 (일주일간)
    @GetMapping(BEST_SELLER_API + ("/category/{categoryId}"))
    public ResponseEntity<ResponseDto<List<BestSellerProjection>>> getBestSellersByCategory(
            @PathVariable Long categoryId
    ) {
        ResponseDto<List<BestSellerProjection>> response = salesQuantityStatisticsService.getBestSellersByCategory(categoryId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 밀리언셀러 (100만부 이상 판매)

    /* 아래는 차트로 표현 - 판매 수량 반환 */
    // 기간별
    // 1) Daily
    @GetMapping(SALES_QUANTITY_API + ("/daily"))
    public ResponseEntity<ResponseDto<List<SalesQuantityStatisticsProjection>>> getDailySalesQuantity() {
        ResponseDto<List<SalesQuantityStatisticsProjection>> response = salesQuantityStatisticsService.getDailySalesQuantity();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 2) weekly
    @GetMapping(SALES_QUANTITY_API + ("/weekly"))
    public ResponseEntity<ResponseDto<List<SalesQuantityStatisticsProjection>>> getWeeklySalesQuantity() {
        ResponseDto<List<SalesQuantityStatisticsProjection>> response = salesQuantityStatisticsService.getWeeklySalesQuantity();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 3) monthly
    @GetMapping(SALES_QUANTITY_API + ("/monthly"))
    public ResponseEntity<ResponseDto<List<SalesQuantityStatisticsProjection>>> getMonthlySalesQuantity(
            @RequestParam int year
    ) {
        ResponseDto<List<SalesQuantityStatisticsProjection>> response = salesQuantityStatisticsService.getMonthlySalesQuantity(year);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 카테고리별 (일주일간)
    @GetMapping(SALES_QUANTITY_API + ("/category"))
    public ResponseEntity<ResponseDto<List<CategorySalesQuantityProjection>>> getSalesQuantityByCategory() {
        ResponseDto<List<CategorySalesQuantityProjection>> response = salesQuantityStatisticsService.getSalesQuantityByCategory();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 할인항목별 (일주일간)
    @GetMapping(SALES_QUANTITY_API + ("/discount-policy"))
    public ResponseEntity<ResponseDto<List<SalesQuantityStatisticsProjection>>> getSalesQuantityByDiscountPolicy(
            @RequestParam int year,
            @RequestParam int quarter
    ) {
        ResponseDto<List<SalesQuantityStatisticsProjection>> response = salesQuantityStatisticsService.getSalesQuantityByDiscountPolicy(year, quarter);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 지점별
    @GetMapping(SALES_QUANTITY_API + ("/branch"))
    public ResponseEntity<ResponseDto<List<SalesQuantityStatisticsProjection>>> getSalesQuantityByBranch(
            @RequestParam int year,
            @RequestParam int month
    ) {
        ResponseDto<List<SalesQuantityStatisticsProjection>> response = salesQuantityStatisticsService.getSalesQuantityByBranch(year, month);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
