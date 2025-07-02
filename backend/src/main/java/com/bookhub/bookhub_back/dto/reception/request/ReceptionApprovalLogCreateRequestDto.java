package com.bookhub.bookhub_back.dto.reception.request;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReceptionApprovalLogCreateRequestDto {
    private Long employeeId;
    private Long branchId;
    private Long purchaseOrderApprovalId;
}
