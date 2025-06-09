package com.bookhub.bookhub_back.dto.purchaseOrderApproval.response;

import com.bookhub.bookhub_back.common.enums.PurchaseOrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class PurchaseOrderApprovalResponseDto {
    private Long purchaseOrderApprovalId;
    private boolean isApproved;
    private LocalDateTime approvedDateAt;
    private String employeeName; // 승인한 담당자 이름
    private PurchaseOrderDetail poDetail;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class PurchaseOrderDetail {
        private String branchName;
        private String employeeName;
        private String isbn;
        private String bookTitle;
        private Long bookPrice;
        private int purchaseOrderAmount;
        private PurchaseOrderStatus purchaseOrderStatus;

    }

}
