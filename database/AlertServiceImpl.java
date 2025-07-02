package com.bookhub.bookhub_back.service.impl;

import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessageKorean;
import com.bookhub.bookhub_back.common.enums.AlertTargetTable;
import com.bookhub.bookhub_back.common.enums.AlertType;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.alert.request.AlertCreateRequestDto;
import com.bookhub.bookhub_back.dto.alert.request.AlertReadRequestDto;
import com.bookhub.bookhub_back.dto.alert.response.AlertResponseDto;
import com.bookhub.bookhub_back.entity.Alert;
import com.bookhub.bookhub_back.entity.Employee;
import com.bookhub.bookhub_back.provider.JwtProvider;
import com.bookhub.bookhub_back.repository.AlertRepository;
import com.bookhub.bookhub_back.repository.EmployeeRepository;
import com.bookhub.bookhub_back.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlertServiceImpl implements AlertService {
    private final AlertRepository alertRepository;
    private final EmployeeRepository employeeRepository;
    private final JwtProvider jwtProvider;

    @Override
    public ResponseDto<AlertResponseDto> createAlert(AlertCreateRequestDto dto) {
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new IllegalArgumentException(ResponseCode.USER_NOT_FOUND));

        Alert alert = Alert.builder()
                .employeeId(employee)
                .alertType(AlertType.valueOf(dto.getAlertType()))
                .message(dto.getMessage())
                .alertTargetTable(AlertTargetTable.valueOf(dto.getAlertTargetTable()))
                .targetPk(dto.getTargetPk())
                .targetIsbn(dto.getTargetIsbn())
                .isRead(false)
                .createdAt(LocalDate.now())
                .build();
        Alert newAlert = alertRepository.save(alert);

        AlertResponseDto responseDto = AlertResponseDto.builder()
                .alertId(newAlert.getAlertId())
                .alertType(newAlert.getAlertType().name())
                .message(newAlert.getMessage())
                .alertTargetTable(newAlert.getAlertTargetTable().name())
                .targetPk(newAlert.getTargetPk())
                .targetIsbn(newAlert.getTargetIsbn())
                .isRead(newAlert.getIsRead())
                .createdAt(newAlert.getCreatedAt())
                .build();

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, responseDto);
    }

    @Override
    public ResponseDto<List<AlertResponseDto>> getAllAlert(Long employeeId, String token) {
        // 1. JWT에서 username 추출
        String tokenUsername = jwtProvider.getUsernameFromJwt(jwtProvider.removeBearer(token));

        // 2. employeeId로 DB 조회
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalArgumentException(ResponseCode.NO_EXIST_USER_ID));

        // 3. 해당 employee의 username과 비교
        if (!employee.getLoginId().equals(tokenUsername)) {
            return ResponseDto.fail(ResponseCode.NO_PERMISSION, "본인의 알림만 조회할 수 있습니다.");
        }

        List<Alert> alerts = alertRepository.findByEmployeeId_EmployeeIdOrderByCreatedAtDesc(employeeId);

        List<AlertResponseDto> result = alerts.stream()
                .map(alert -> AlertResponseDto.builder()
                        .alertId(alert.getAlertId())
                        .alertType(alert.getAlertType().name())
                        .message(alert.getMessage())
                        .alertTargetTable(alert.getAlertTargetTable().name())
                        .targetPk(alert.getTargetPk())
                        .targetIsbn(alert.getTargetIsbn())
                        .isRead(alert.getIsRead())
                        .createdAt(alert.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, result);
    }

    @Override
    public ResponseDto<List<AlertResponseDto>> getUnreadAlert(Long employeeId, String token) {
        // 1. JWT에서 username 추출
        String tokenUsername = jwtProvider.getUsernameFromJwt(jwtProvider.removeBearer(token));

        // 2. employeeId로 DB 조회
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalArgumentException(ResponseCode.NO_EXIST_USER_ID));

        // 3. 해당 employee의 username과 비교
        if (!employee.getLoginId().equals(tokenUsername)) {
            return ResponseDto.fail(ResponseCode.NO_PERMISSION, "본인의 알림만 조회할 수 있습니다.");
        }

        List<Alert> alerts = alertRepository.findByEmployeeId_EmployeeIdAndIsReadFalseOrderByCreatedAtDesc(employeeId);

        List<AlertResponseDto> result = alerts.stream()
                .map(alert -> AlertResponseDto.builder()
                        .alertId(alert.getAlertId())
                        .alertType(alert.getAlertType().name())
                        .message(alert.getMessage())
                        .alertTargetTable(alert.getAlertTargetTable().name())
                        .targetPk(alert.getTargetPk())
                        .targetIsbn(alert.getTargetIsbn())
                        .isRead(alert.getIsRead())
                        .createdAt(alert.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, result);
    }

    @Override
    public ResponseDto<Void> readAlert(AlertReadRequestDto dto) {

        List<Alert> alerts = alertRepository.findAllById(dto.getAlertIds());

        alerts.forEach(alert -> alert.setIsRead(true));
        alertRepository.saveAll(alerts);

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS) ;
    }

}

