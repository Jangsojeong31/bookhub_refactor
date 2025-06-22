package com.bookhub.bookhub_back.service.statistics.Impl;

import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessage;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.statistics.projection.BestSellerProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.CategorySalesQuantityProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.SalesQuantityStatisticsProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.YearlySalesQuantityProjection;
import com.bookhub.bookhub_back.repository.statistics.SalesQuantityStatisticsRepository;
import com.bookhub.bookhub_back.service.statistics.SalesQuantityStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SalesQuantityStatisticsServiceImpl implements SalesQuantityStatisticsService {
    private final SalesQuantityStatisticsRepository salesQuantityStatisticsRepository;

    @Override
    public ResponseDto<List<BestSellerProjection>> getTop100BestSellers() {
        List<BestSellerProjection> responseDtos = salesQuantityStatisticsRepository.findTop100BestSellers();
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }

    @Override
    public ResponseDto<List<BestSellerProjection>> getWeeklyBestSellers() {
        List<BestSellerProjection> responseDtos = salesQuantityStatisticsRepository.findWeeklyBestSellers();
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }

    @Override
    public ResponseDto<List<BestSellerProjection>> getMonthlyBestSellers() {
        List<BestSellerProjection> responseDtos = salesQuantityStatisticsRepository.findMonthlyBestSellers();
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }

    @Override
    public ResponseDto<List<BestSellerProjection>> getYearlyBestSellers() {
        List<BestSellerProjection> responseDtos = salesQuantityStatisticsRepository.findYearlyBestSellers();
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }

    @Override
    public ResponseDto<List<BestSellerProjection>> getBestSellersByCategory(Long categoryId) {
        List<BestSellerProjection> responseDtos = salesQuantityStatisticsRepository.findBestSellersByCategory(categoryId);
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }

    @Override
    public ResponseDto<List<CategorySalesQuantityProjection>> getSalesQuantityByCategory() {
        List<CategorySalesQuantityProjection> responseDtos = salesQuantityStatisticsRepository.findSalesQuantityByCategory();
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }

    @Override
    public ResponseDto<List<SalesQuantityStatisticsProjection>> getSalesQuantityByDiscountPolicy(int year, int quarter) {
        List<SalesQuantityStatisticsProjection> responseDtos = salesQuantityStatisticsRepository.findSalesQuantityByDiscountPolicy(year, quarter);
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }

    @Override
    public ResponseDto<List<SalesQuantityStatisticsProjection>> getSalesQuantityByBranch(int year, int month) {
        List<SalesQuantityStatisticsProjection> responseDtos = salesQuantityStatisticsRepository.findSalesQuantityByBranch(year, month);
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }

    @Override
    public ResponseDto<List<SalesQuantityStatisticsProjection>> getDailySalesQuantity() {
        List<SalesQuantityStatisticsProjection> responseDtos = salesQuantityStatisticsRepository.findDailySalesQuantity();
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }

    @Override
    public ResponseDto<List<SalesQuantityStatisticsProjection>> getWeeklySalesQuantity() {
        List<SalesQuantityStatisticsProjection> responseDtos = salesQuantityStatisticsRepository.findWeeklySalesQuantity();
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }

    @Override
    public ResponseDto<List<SalesQuantityStatisticsProjection>> getMonthlySalesQuantity(int year) {
        List<SalesQuantityStatisticsProjection> responseDtos = salesQuantityStatisticsRepository.findMonthlySalesQuantity(year);
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }


}
