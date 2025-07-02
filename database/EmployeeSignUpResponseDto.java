package com.bookhub.bookhub_back.dto.employee.response;

import com.bookhub.bookhub_back.common.enums.IsApproved;
import com.bookhub.bookhub_back.common.enums.Status;
import com.bookhub.bookhub_back.entity.Authority;
import com.bookhub.bookhub_back.entity.Position;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeSignUpResponseDto {
    private Long employeeId;
    private String branchName;
    private Position positionId;
    private Authority authorityId;
    private Long employeeNumber;
    private String loginId;
    private String password;
    private String name;
    private String phoneNumber;
    private LocalDate birthDate;
    private String email;
    private IsApproved isApproved = IsApproved.PENDING;
    private Status status = Status.EMPLOYED;
}