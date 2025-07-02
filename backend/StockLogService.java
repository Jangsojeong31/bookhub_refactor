package com.bookhub.bookhub_back.service;

import com.bookhub.bookhub_back.common.enums.StockActionType;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.stock.response.StockLogDetailResponseDto;
import com.bookhub.bookhub_back.dto.stock.response.StockLogResponseDto;

import java.time.LocalDateTime;
import java.util.List;

public interface StockLogService {
    ResponseDto<List<StockLogResponseDto>> getAllLogs(Long branchId);

    ResponseDto<StockLogDetailResponseDto> getLogById(Long stockLogId);

    ResponseDto<List<StockLogResponseDto>> getLogsByType(Long branchId, StockActionType type);

    ResponseDto<List<StockLogResponseDto>> getLogsByTime(Long branchId, LocalDateTime start, LocalDateTime end);

    ResponseDto<List<StockLogResponseDto>> getLogsByEmployee(Long employeeId);

    ResponseDto<List<StockLogResponseDto>> getLogsByBook(Long branchId, String bookIsbn);


}
