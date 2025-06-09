package com.bookhub.bookhub_back.dto.stock.response;


import com.bookhub.bookhub_back.common.enums.StockActionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StockLogDetailResponseDto {
    private Long stockLogId;
    private StockActionType type;
    private String employeeName;
    private String bookTitle;
    private String branchName;
    private Long amount;
    private Long bookAmount;
    private LocalDateTime actionDate;
    private String description;
}
