package com.bookhub.bookhub_back.dto.employee.response;

import com.bookhub.bookhub_back.common.enums.ExitReason;
import com.bookhub.bookhub_back.common.enums.Status;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeExitLogListResponseDto {
    private Long exitId;
    private Long employeeNumber;
    private String employeeName;
    private String branchName;
    private String positionName;
    private Status status;
    private ExitReason exitReason;
    private Long authorizerNumber;
    private String authorizerName;
    private LocalDateTime updatedAt;
}
