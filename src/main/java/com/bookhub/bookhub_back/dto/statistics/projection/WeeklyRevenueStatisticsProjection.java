package com.bookhub.bookhub_back.dto.statistics.projection;

import java.time.LocalDate;

public interface WeeklyRevenueStatisticsProjection {
    Long getTotalRevenue();
    LocalDate getOrderDate();
}
