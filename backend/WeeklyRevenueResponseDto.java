package com.bookhub.bookhub_back.dto.statistics.response.revenue;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@Setter
public class WeeklyRevenueResponseDto {
    private Long branchId;
    private String branchName;
    private Integer weekIndex;      // 0부터 시작하는 주 번호
    private LocalDate weekStartDate;// 해당 주의 시작일
    private Long totalRevenue;      // 그 주의 매출 합계
}
