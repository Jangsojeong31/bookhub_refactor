package com.bookhub.bookhub_back.service;

import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.alert.request.AlertCreateRequestDto;
import com.bookhub.bookhub_back.dto.alert.request.AlertReadRequestDto;
import com.bookhub.bookhub_back.dto.alert.response.AlertResponseDto;
import com.bookhub.bookhub_back.dto.book.request.BookCreateRequestDto;
import com.bookhub.bookhub_back.dto.book.response.BookResponseDto;

import java.util.List;

public interface AlertService {
    // 알림 생성
    ResponseDto<AlertResponseDto> createAlert(AlertCreateRequestDto dto);
    // 전체 알림 조회
    ResponseDto<List<AlertResponseDto>> getAllAlert(Long employeeId, String token);
    // 읽지 않은 알림 조회
    ResponseDto<List<AlertResponseDto>> getUnreadAlert(Long employeeId, String token);
    // 여러 알림 읽음 처리
    ResponseDto<Void> readAlert(AlertReadRequestDto dto);
}
