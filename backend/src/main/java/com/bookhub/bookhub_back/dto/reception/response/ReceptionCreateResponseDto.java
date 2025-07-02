package com.bookhub.bookhub_back.dto.reception.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReceptionCreateResponseDto {
    private Long bookReceptionApprovalId;
    private String branchName;
    private String bookIsbn;
    private String bookTitle;
    private int purchaseOrderAmount;
}
