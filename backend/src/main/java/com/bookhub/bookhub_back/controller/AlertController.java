package com.bookhub.bookhub_back.controller;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.alert.request.AlertCreateRequestDto;
import com.bookhub.bookhub_back.dto.alert.request.AlertReadRequestDto;
import com.bookhub.bookhub_back.dto.alert.response.AlertResponseDto;
import com.bookhub.bookhub_back.provider.JwtProvider;
import com.bookhub.bookhub_back.service.AlertService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiMappingPattern.BASIC_API+ApiMappingPattern.COMMON_API+"/alerts")
@RequiredArgsConstructor
public class AlertController {

    private final AlertService alertService;

    // 알림 생성
    @PostMapping
    public ResponseEntity<ResponseDto<AlertResponseDto>> createAlert(@RequestBody AlertCreateRequestDto dto) {
        ResponseDto<AlertResponseDto> responseDto = alertService.createAlert(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/all/{employeeId}")
    public ResponseEntity<ResponseDto<List<AlertResponseDto>>> getAllAlert(
            @PathVariable Long employeeId,
            @RequestHeader("Authorization") String token
    ) {
        ResponseDto<List<AlertResponseDto>> responseDto = alertService.getAllAlert(employeeId, token);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @GetMapping("/unread/{employeeId}")
    public ResponseEntity<ResponseDto<List<AlertResponseDto>>> getUnreadAlert(
            @PathVariable Long employeeId,
            @RequestHeader("Authorization") String token
    ) {
        ResponseDto<List<AlertResponseDto>> responseDto = alertService.getUnreadAlert(employeeId, token);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PutMapping("/read")
    public ResponseEntity<ResponseDto<Void>> readAlert(@RequestBody AlertReadRequestDto dto) {
        ResponseDto<Void> responseDto = alertService.readAlert(dto);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
