package com.bookhub.bookhub_back.dto.employee.request;

import com.bookhub.bookhub_back.common.enums.IsApproved;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeSignUpApprovalRequestDto {
    @NotNull
    private IsApproved isApproved;

    private String deniedReason;
}
