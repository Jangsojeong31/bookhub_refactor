package com.bookhub.bookhub_back.dto.employee.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeUpdateRequestDto {
    private String phoneNumber;
    private LocalDate birthDate;
    private Long branchId;
}
