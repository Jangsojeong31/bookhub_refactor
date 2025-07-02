package com.bookhub.bookhub_back.dto.statistics.projection;

public interface YearlySalesQuantityProjection {
    Integer getOrderYear();
    Long getTotalSales();
}
