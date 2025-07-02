package com.bookhub.bookhub_back.dto.statistics.response.revenue;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
public class BranchRevenueResponseDto {
    private Long branchId;
    private String branchName;
    private String categoryName;
    private Long totalRevenue;

}
