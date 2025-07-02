package com.bookhub.bookhub_back.dto.employee.response;

import com.bookhub.bookhub_back.common.enums.IsApproved;
import com.bookhub.bookhub_back.common.enums.Status;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeResponseDto {
    private Long employeeId;
    private Long employeeNumber;
    private String employeeName;
    private Long branchId;
    private String branchName;
    private Long positionId;
    private String positionName;
    private Long authorityId;
    private String authorityName;
    private String email;
    private String phoneNumber;
    private LocalDate birthDate;
    private Status status;
    private IsApproved isApproved;
    private LocalDateTime createdAt;
}
