package com.bookhub.bookhub_back.dto.statistics.response.revenue;

import lombok.*;

@Getter
@AllArgsConstructor
@Setter
public class MonthlyRevenueResponseDto {
    private final Integer month;
    private final Long totalSales;
}
