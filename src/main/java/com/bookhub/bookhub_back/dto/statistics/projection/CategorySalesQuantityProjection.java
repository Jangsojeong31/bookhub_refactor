package com.bookhub.bookhub_back.dto.statistics.projection;

public interface CategorySalesQuantityProjection {
    Long getTotalSales();
    String getCategoryType();
    Long getCategoryId();
    String getCategoryName();

}
