package com.bookhub.bookhub_back.service.statistics;

import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.statistics.projection.BestSellerProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.CategorySalesQuantityProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.SalesQuantityStatisticsProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.YearlySalesQuantityProjection;

import java.util.List;

public interface SalesQuantityStatisticsService {
    ResponseDto<List<BestSellerProjection>> getTop100BestSellers();

    ResponseDto<List<BestSellerProjection>> getWeeklyBestSellers();

    ResponseDto<List<BestSellerProjection>> getMonthlyBestSellers();

    ResponseDto<List<BestSellerProjection>> getYearlyBestSellers();

    ResponseDto<List<BestSellerProjection>> getBestSellersByCategory(Long categoryId);

    ResponseDto<List<CategorySalesQuantityProjection>> getSalesQuantityByCategory();

    ResponseDto<List<SalesQuantityStatisticsProjection>> getSalesQuantityByDiscountPolicy(int year, int quarter);

    ResponseDto<List<SalesQuantityStatisticsProjection>> getSalesQuantityByBranch(int year, int month);

    ResponseDto<List<SalesQuantityStatisticsProjection>> getDailySalesQuantity();

    ResponseDto<List<SalesQuantityStatisticsProjection>> getWeeklySalesQuantity();


    ResponseDto<List<SalesQuantityStatisticsProjection>> getMonthlySalesQuantity(int year);
}
