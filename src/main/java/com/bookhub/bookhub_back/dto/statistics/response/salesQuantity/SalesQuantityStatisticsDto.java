package com.bookhub.bookhub_back.dto.statistics.response.salesQuantity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SalesQuantityStatisticsDto {
    Long totalSales;
    LocalDate orderDate;
    Integer orderMonth;
    String categoryName;
    String policyTitle;
    String branchName;
}
