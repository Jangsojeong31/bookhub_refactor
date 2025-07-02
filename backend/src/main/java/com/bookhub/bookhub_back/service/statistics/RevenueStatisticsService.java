package com.bookhub.bookhub_back.service.statistics;

import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.statistics.projection.MonthlyRevenueStatisticsProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.WeeklyRevenueStatisticsProjection;
import com.bookhub.bookhub_back.dto.statistics.response.revenue.BranchRevenueResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.revenue.MonthlyRevenueResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.revenue.WeekdayRevenueResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.revenue.WeeklyRevenueResponseDto;

import java.time.LocalDate;
import java.util.List;

public interface RevenueStatisticsService {
    ResponseDto<List<WeekdayRevenueResponseDto>> getWeekdayRevenue(int year, int quarter);

    ResponseDto<List<MonthlyRevenueStatisticsProjection>> getMonthlyRevenue(int year);

    ResponseDto<List<WeeklyRevenueStatisticsProjection>> getWeeklyRevenue(int year, int month);

    ResponseDto<List<BranchRevenueResponseDto>> getBranchRevenue(LocalDate startDate, LocalDate endDate);
}
