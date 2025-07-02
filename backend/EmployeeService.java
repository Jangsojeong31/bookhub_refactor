package com.bookhub.bookhub_back.service;

import com.bookhub.bookhub_back.common.enums.Status;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.employee.request.EmployeeOrganizationUpdateRequestDto;
import com.bookhub.bookhub_back.dto.employee.request.EmployeeSignUpApprovalRequestDto;
import com.bookhub.bookhub_back.dto.employee.request.EmployeeStatusUpdateRequestDto;
import com.bookhub.bookhub_back.dto.employee.response.EmployeeListResponseDto;
import com.bookhub.bookhub_back.dto.employee.response.EmployeeResponseDto;
import com.bookhub.bookhub_back.dto.employee.response.EmployeeSignUpApprovalsResponseDto;
import jakarta.validation.Valid;

import java.util.List;

public interface EmployeeService {
    ResponseDto<List<EmployeeListResponseDto>> searchEmployee(String name, String branchName, String positionName, String authorityName, Status status);

    ResponseDto<List<EmployeeSignUpApprovalsResponseDto>> getPendingEmployee();

    ResponseDto<EmployeeResponseDto> getEmployeeById(Long employeeId);

    ResponseDto<EmployeeSignUpApprovalsResponseDto> updateApproval(Long id, @Valid EmployeeSignUpApprovalRequestDto dto, String loginId);

    ResponseDto<Void> updateOrganization(Long employeeId, EmployeeOrganizationUpdateRequestDto dto, String loginId);

    ResponseDto<Void> updateStatus(Long employeeId, @Valid EmployeeStatusUpdateRequestDto dto, String loginId);
}
