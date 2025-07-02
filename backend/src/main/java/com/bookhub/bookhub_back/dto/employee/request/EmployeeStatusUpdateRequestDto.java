package com.bookhub.bookhub_back.dto.employee.request;

import com.bookhub.bookhub_back.common.enums.ExitReason;
import com.bookhub.bookhub_back.common.enums.Status;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeStatusUpdateRequestDto {
    @NotNull
    private Status status;

    private ExitReason exitReason;
}
