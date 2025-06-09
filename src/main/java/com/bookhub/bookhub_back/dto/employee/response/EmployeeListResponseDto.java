package com.bookhub.bookhub_back.dto.employee.response;

import com.bookhub.bookhub_back.common.enums.Status;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeListResponseDto {
    private Long EmployeeNumber;
    private String EmployeeName;
    private String branchName;
    private String positionName;
    private String authorityName;
    private Status status;
}
