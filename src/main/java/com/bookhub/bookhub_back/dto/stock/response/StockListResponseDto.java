package com.bookhub.bookhub_back.dto.stock.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StockListResponseDto {
    private Long stockId;
    private Long branchId;
    private String bookIsbn;
    private String branchName;
    private String bookTitle;
    private Long amount;
}
