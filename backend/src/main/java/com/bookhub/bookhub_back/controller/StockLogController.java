package com.bookhub.bookhub_back.controller;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.enums.StockActionType;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.stock.response.StockListResponseDto;
import com.bookhub.bookhub_back.dto.stock.response.StockLogDetailResponseDto;
import com.bookhub.bookhub_back.dto.stock.response.StockLogResponseDto;
import com.bookhub.bookhub_back.dto.stock.response.StockUpdateResponseDto;
import com.bookhub.bookhub_back.service.StockLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(ApiMappingPattern.BASIC_API + ApiMappingPattern.ADMIN_API + "/stock-logs")
@RequiredArgsConstructor
public class StockLogController {
    private final StockLogService stockLogService;

    //branch 의 로그 전체 조회
    @GetMapping("/branch/{branchId}")
    public ResponseEntity<ResponseDto<List<StockLogResponseDto>>> getAllLogs(
            @PathVariable Long branchId){
        ResponseDto<List<StockLogResponseDto>> stockLogs = stockLogService.getAllLogs(branchId);
        return ResponseEntity.status(HttpStatus.OK).body(stockLogs);
    }

    //로그 단건 조회
    @GetMapping("/{stockLogId}")
    public ResponseEntity<ResponseDto<StockLogDetailResponseDto>> getLogById(
            @PathVariable Long stockLogId){
        ResponseDto<StockLogDetailResponseDto> stockLog = stockLogService.getLogById(stockLogId);
        return ResponseEntity.status(HttpStatus.OK).body(stockLog);

    }

    //branch + 유형별 로그 전체조회
    @GetMapping("/branch/{branchId}/type")
    public ResponseEntity<ResponseDto<List<StockLogResponseDto>>> getLogsByType(
            @PathVariable Long branchId,
            @RequestParam StockActionType type){
        ResponseDto<List<StockLogResponseDto>> stockLogs = stockLogService.getLogsByType(branchId, type);
        return ResponseEntity.status(HttpStatus.OK).body(stockLogs);
    }

    //branch + 시간별 로그 조회
    @GetMapping("/branch/{branchId}/date")
    public ResponseEntity<ResponseDto<List<StockLogResponseDto>>> getLogsByTime(
            @PathVariable Long branchId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end){
        ResponseDto<List<StockLogResponseDto>> stockLogs = stockLogService.getLogsByTime(branchId, start, end);
        return ResponseEntity.status(HttpStatus.OK).body(stockLogs);
    }

    //employeeId로 로그 전체 조회
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<ResponseDto<List<StockLogResponseDto>>> getLogsByEmployee(
            @PathVariable Long employeeId){
        ResponseDto<List<StockLogResponseDto>> stockLogs = stockLogService.getLogsByEmployee(employeeId);
        return ResponseEntity.status(HttpStatus.OK).body(stockLogs);
    }

    //특정 책에 대한 로그 전체 조회
    @GetMapping("branch/{branchId}/book")
    public ResponseEntity<ResponseDto<List<StockLogResponseDto>>> getLogsByBook(
            @PathVariable Long branchId,
            @RequestParam String bookIsbn){
        ResponseDto<List<StockLogResponseDto>> stockLogs = stockLogService.getLogsByBook(branchId, bookIsbn);
        return ResponseEntity.status(HttpStatus.OK).body(stockLogs);
    }
}
