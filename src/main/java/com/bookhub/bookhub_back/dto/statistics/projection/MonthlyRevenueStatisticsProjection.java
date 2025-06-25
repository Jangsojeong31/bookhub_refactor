package com.bookhub.bookhub_back.dto.statistics.projection;

public interface MonthlyRevenueStatisticsProjection {
    Long getTotalRevenue();
    Integer getOrderMonth();
}
