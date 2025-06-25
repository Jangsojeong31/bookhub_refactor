package com.bookhub.bookhub_back.service.impl;

import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessageKorean;
import com.bookhub.bookhub_back.common.enums.AlertType;
import com.bookhub.bookhub_back.common.enums.ChangeType;
import com.bookhub.bookhub_back.common.enums.IsApproved;
import com.bookhub.bookhub_back.common.enums.Status;
import com.bookhub.bookhub_back.common.util.DateUtils;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.alert.request.AlertCreateRequestDto;
import com.bookhub.bookhub_back.dto.employee.request.EmployeeOrganizationUpdateRequestDto;
import com.bookhub.bookhub_back.dto.employee.request.EmployeeSignUpApprovalRequestDto;
import com.bookhub.bookhub_back.dto.employee.request.EmployeeStatusUpdateRequestDto;
import com.bookhub.bookhub_back.dto.employee.response.EmployeeListResponseDto;
import com.bookhub.bookhub_back.dto.employee.response.EmployeeResponseDto;
import com.bookhub.bookhub_back.dto.employee.response.EmployeeSignUpApprovalsResponseDto;
import com.bookhub.bookhub_back.entity.Employee;
import com.bookhub.bookhub_back.entity.EmployeeChangeLog;
import com.bookhub.bookhub_back.entity.EmployeeExitLog;
import com.bookhub.bookhub_back.entity.EmployeeSignUpApproval;
import com.bookhub.bookhub_back.repository.*;
import com.bookhub.bookhub_back.service.AlertService;
import com.bookhub.bookhub_back.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final EmployeeSignUpApprovalRepository employeeSignUpApprovalRepository;
    private final BranchRepository branchRepository;
    private final PositionRepository positionRepository;
    private final AuthorityRepository authorityRepository;
    private final EmployeeChangeLogRepository employeeChangeLogRepository;
    private final EmployeeExitLogRepository employeeExitLogRepository;
    private final AlertRepository alertRepository;
    private final AlertService alertService;

    @Override
    @Transactional(readOnly = true)
    public ResponseDto<List<EmployeeListResponseDto>>
    searchEmployee(
        String name,
        String branchName,
        String positionName,
        String authorityName,
        Status status
    ) {
        List<Employee> employees = null;
        List<EmployeeListResponseDto> responseDtos = null;

        employees = employeeRepository.searchEmployees(name, branchName, positionName, authorityName, status);


        responseDtos = employees.stream()
            .filter(employee -> IsApproved.APPROVED == employee.getIsApproved())
            .map(employee -> EmployeeListResponseDto.builder()
                .employeeId(employee.getEmployeeId())
                .employeeNumber(employee.getEmployeeNumber())
                .employeeName(employee.getName())
                .branchName(employee.getBranchId().getBranchName())
                .positionName(employee.getPositionId().getPositionName())
                .authorityName(employee.getAuthorityId().getAuthorityName())
                .status(employee.getStatus())
                .build())
            .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, responseDtos);
    }

    @Override
    public ResponseDto<List<EmployeeSignUpApprovalsResponseDto>> getPendingEmployee() {
        List<EmployeeSignUpApproval> employees = null;
        List<EmployeeSignUpApprovalsResponseDto> responseDtos = null;

        employees = employeeSignUpApprovalRepository.findAll();

        responseDtos = employees.stream()
            .filter(employee -> employee.getIsApproved() == IsApproved.PENDING)
            .map(employee -> EmployeeSignUpApprovalsResponseDto.builder()
                .approvalId(employee.getApprovalId())
                .employeeId(employee.getEmployeeId().getEmployeeId())
                .employeeNumber(employee.getEmployeeId().getEmployeeNumber())
                .employeeName(employee.getEmployeeId().getName())
                .branchName(employee.getEmployeeId().getBranchId().getBranchName())
                .email(employee.getEmployeeId().getEmail())
                .phoneNumber(employee.getEmployeeId().getPhoneNumber())
                .appliedAt(DateUtils.format(employee.getEmployeeId().getCreatedAt()))
                .isApproved(employee.getIsApproved())
                .build())
            .collect(Collectors.toList());


        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, responseDtos);
    }

    @Override
    public ResponseDto<EmployeeResponseDto> getEmployeeById(Long employeeId) {
        EmployeeResponseDto responseDto = null;
        Employee employee = null;

        employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new IllegalArgumentException("직원을 찾을 수 없습니다."));

        responseDto = EmployeeResponseDto.builder()
            .employeeId(employee.getEmployeeId())
            .employeeNumber(employee.getEmployeeNumber())
            .employeeName(employee.getName())
            .branchId(employee.getBranchId().getBranchId())
            .branchName(employee.getBranchId().getBranchName())
            .positionId(employee.getPositionId().getPositionId())
            .positionName(employee.getPositionId().getPositionName())
            .authorityId(employee.getAuthorityId().getAuthorityId())
            .authorityName(employee.getAuthorityId().getAuthorityName())
            .email(employee.getEmail())
            .phoneNumber(employee.getPhoneNumber())
            .birthDate(employee.getBirthDate())
            .status(employee.getStatus())
            .createdAt(employee.getCreatedAt())
            .build();

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, responseDto);
    }

    @Override
    @Transactional
    public ResponseDto<EmployeeSignUpApprovalsResponseDto> updateApproval(Long EmployeeId, EmployeeSignUpApprovalRequestDto dto, String loginId) {
        EmployeeListResponseDto responseDto = null;
        EmployeeSignUpApproval employeeSignUpApproval = null;
        Employee employee = null;

        employee = employeeRepository.findById(EmployeeId)
            .filter(emp -> emp.getIsApproved() == IsApproved.PENDING)
            .orElseThrow(() -> new IllegalArgumentException("회원가입 승인 대기중인 사원이 아닙니다."));

        employeeSignUpApproval = employeeSignUpApprovalRepository.findAllByEmployeeIdAndIsApproved(employee, IsApproved.PENDING)
            .orElseThrow(() -> new IllegalArgumentException("회원가입 승인 대기 상태인 사원이 없습니다."));

        Employee authorizerEmployee = employeeRepository.findByLoginId(loginId)
            .orElseThrow(() -> new IllegalArgumentException("관리자를 찾을 수 없습니다."));


        if (dto.getIsApproved().equals(IsApproved.APPROVED) && dto.getDeniedReason().isBlank()) {
            employee.setIsApproved(dto.getIsApproved());
            employeeSignUpApproval.setAuthorizerId(authorizerEmployee);
            employeeSignUpApproval.setIsApproved(dto.getIsApproved());
        } else if (dto.getIsApproved().equals(IsApproved.DENIED) && !dto.getDeniedReason().isBlank()) {
            employee.setIsApproved(dto.getIsApproved());
            employeeSignUpApproval.setAuthorizerId(authorizerEmployee);
            employeeSignUpApproval.setIsApproved(dto.getIsApproved());
            employeeSignUpApproval.setDeniedReason(dto.getDeniedReason());
        } else {
            throw new IllegalArgumentException();
        }

        employeeRepository.save(employee);
        employeeSignUpApprovalRepository.save(employeeSignUpApproval);

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, null);
    }

    @Override
    @Transactional
    public ResponseDto<Void> updateOrganization(Long employeeId, EmployeeOrganizationUpdateRequestDto dto, String loginId) {
        Employee employee = null;
        Employee authorizer = null;

        employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new IllegalArgumentException("직원 정보를 찾을 수 없습니다."));

        authorizer = employeeRepository.findByLoginId(loginId)
            .orElseThrow(() -> new IllegalArgumentException("직원 정보를 찾을 수 없습니다."));

        Long preBranchId = employee.getBranchId().getBranchId();
        Long prePositionId = employee.getPositionId().getPositionId();
        Long preAuthorityId = employee.getAuthorityId().getAuthorityId();

        if (dto.getBranchId() != null && !dto.getBranchId().equals(preBranchId)) {
            employee.setBranchId(branchRepository.findById(dto.getBranchId())
                .orElseThrow(() -> new IllegalArgumentException("지점 정보가 정확하지 않습니다.")));

            EmployeeChangeLog employeeChangeLog = EmployeeChangeLog.builder()
                .employeeId(employee)
                .authorizerId(authorizer)
                .changeType(ChangeType.BRANCH_CHANGE)
                .previousBranchId(branchRepository.findById(preBranchId)
                    .orElseThrow(() -> new IllegalArgumentException("지점 정보가 정확하지 않습니다.")))
                .build();

            employeeChangeLogRepository.save(employeeChangeLog);

            alertService.createAlert(AlertCreateRequestDto.builder()
                    .employeeId(employee.getEmployeeId())
                    .alertType(String.valueOf(AlertType.CHANGE_BRANCH_SUCCESS))
                    .alertTargetTable("EMPLOYEES")
                    .targetPk(employee.getEmployeeId())
                    .message("지점이 [" + employee.getBranchId().getBranchName() + "]로 변경되었습니다.")
                    .build()
            );
        }

        if (dto.getPositionId() != null && !dto.getPositionId().equals(prePositionId)) {
            employee.setPositionId(positionRepository.findById(dto.getPositionId())
                .orElseThrow(() -> new IllegalArgumentException("직급 정보가 정확하지 않습니다.")));

            EmployeeChangeLog employeeChangeLog = EmployeeChangeLog.builder()
                .employeeId(employee)
                .authorizerId(authorizer)
                .changeType(ChangeType.POSITION_CHANGE)
                .previousPositionId(positionRepository.findById(prePositionId)
                    .orElseThrow(() -> new IllegalArgumentException("직급 정보가 정확하지 않습니다.")))
                .build();

            employeeChangeLogRepository.save(employeeChangeLog);

            alertService.createAlert(AlertCreateRequestDto.builder()
                    .employeeId(employee.getEmployeeId())
                    .alertType(String.valueOf(AlertType.CHANGE_POSITION_SUCCESS))
                    .alertTargetTable("EMPLOYEES")
                    .targetPk(employee.getEmployeeId())
                    .message("직급이 [" + employee.getPositionId().getPositionName() + "]로 변경되었습니다.")
                    .build()
            );
        }

        if (dto.getAuthorityId() != null && !dto.getAuthorityId().equals(preAuthorityId)) {
            employee.setAuthorityId(authorityRepository.findById(dto.getAuthorityId())
                .orElseThrow(() -> new IllegalArgumentException("권한 정보가 정확하지 않습니다.")));

            EmployeeChangeLog employeeChangeLog = EmployeeChangeLog.builder()
                .employeeId(employee)
                .authorizerId(authorizer)
                .changeType(ChangeType.AUTHORITY_CHANGE)
                .previousAuthorityId(authorityRepository.findById(preAuthorityId)
                    .orElseThrow(() -> new IllegalArgumentException("권한 정보가 정확하지 않습니다.")))
                .build();

            employeeChangeLogRepository.save(employeeChangeLog);

            alertService.createAlert(AlertCreateRequestDto.builder()
                    .employeeId(employee.getEmployeeId())
                    .alertType(String.valueOf(AlertType.CHANGE_PERMISSION_SUCCESS))
                    .alertTargetTable("EMPLOYEES")
                    .targetPk(employee.getEmployeeId())
                    .message("권한이 [" + employee.getAuthorityId().getAuthorityName() + "]로 변경되었습니다.")
                    .build()
            );
        }

        employeeRepository.save(employee);

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS);
    }

    @Override
    public ResponseDto<Void> updateStatus(Long employeeId, EmployeeStatusUpdateRequestDto dto, String loginId) {
        Employee employee = null;
        Employee authorizer = null;

        employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new IllegalArgumentException("사원이 존재하지 않습니다."));

        authorizer = employeeRepository.findByLoginId(loginId)
            .orElseThrow(() -> new IllegalArgumentException("관리자가 존재하지 않습니다."));

        Status status = employee.getStatus();

        if (status == Status.EXITED) {
            throw new IllegalArgumentException("이미 퇴사 처리되었습니다.");
        }

        if (status != null && !status.equals(dto.getStatus())) {
            employee.setStatus(dto.getStatus());
            EmployeeExitLog employeeExitLog = EmployeeExitLog.builder()
                .employeeId(employee)
                .appliedAt(employee.getCreatedAt())
                .authorizerId(authorizer)
                .exitReason(dto.getExitReason())
                .build();
            employeeExitLogRepository.save(employeeExitLog);
        }

        employeeRepository.save(employee);

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS);
    }
}
