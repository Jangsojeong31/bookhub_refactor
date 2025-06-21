package com.bookhub.bookhub_back.dto.statistics.projection;

public interface TimeStockChartProjection {
    String getBranchName();
    Long getMonth();
    Long getInAmount();
    Long getLossAmount();
}
