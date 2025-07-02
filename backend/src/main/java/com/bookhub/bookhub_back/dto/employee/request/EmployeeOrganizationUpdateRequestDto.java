package com.bookhub.bookhub_back.dto.employee.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeOrganizationUpdateRequestDto {
    private Long branchId;
    private Long positionId;
    private Long authorityId;
}
