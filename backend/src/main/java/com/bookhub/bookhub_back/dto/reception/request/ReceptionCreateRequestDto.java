package com.bookhub.bookhub_back.dto.reception.request;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReceptionCreateRequestDto {
    private Long branchId;
    private Long purchaseOrderApprovalId;
}
