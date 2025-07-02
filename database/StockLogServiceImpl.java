package com.bookhub.bookhub_back.service.impl;

import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessage;
import com.bookhub.bookhub_back.common.enums.StockActionType;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.stock.response.StockLogDetailResponseDto;
import com.bookhub.bookhub_back.dto.stock.response.StockLogResponseDto;
import com.bookhub.bookhub_back.entity.Book;
import com.bookhub.bookhub_back.entity.Branch;
import com.bookhub.bookhub_back.entity.Employee;
import com.bookhub.bookhub_back.entity.StockLog;
import com.bookhub.bookhub_back.repository.BookRepository;
import com.bookhub.bookhub_back.repository.BranchRepository;
import com.bookhub.bookhub_back.repository.EmployeeRepository;
import com.bookhub.bookhub_back.repository.StockLogRepository;
import com.bookhub.bookhub_back.service.StockLogService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockLogServiceImpl implements StockLogService {

    //Repository 와 연결
    private final StockLogRepository stockLogRepository;
    private final BranchRepository branchRepository;
    private final BookRepository bookRepository;
    private final EmployeeRepository employeeRepository;

    //GetListResponseDto 메서드 추출
    private ResponseDto<List<StockLogResponseDto>> getListResponseDto(List<StockLog> stockLogs) {
        if (stockLogs.isEmpty()) {
            throw new EntityNotFoundException(ResponseCode.NO_EXIST_CONTENT+ ResponseMessage.NO_EXIST_CONTENT);
        }

        List<StockLogResponseDto> responseDtos = null;
        responseDtos = stockLogs.stream()
                .map(stockLog -> StockLogResponseDto.builder()
                        .stockLogId(stockLog.getLogId())
                        .type(String.valueOf(stockLog.getStockActionType()))
                        .employeeName(stockLog.getEmployeeId().getName())
                        .bookTitle(stockLog.getBookIsbn().getBookTitle())
                        .branchName(stockLog.getBranchId().getBranchName())
                        .amount(stockLog.getAmount())
                        .actionDate(stockLog.getActionDate())
                        .build())
                .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }


    //branch 의 로그 전체 조회
    @Override
    public ResponseDto<List<StockLogResponseDto>> getAllLogs(Long branchId) {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new EntityNotFoundException(ResponseCode.NO_EXIST_BRANCH));

        List<StockLog> stockLogs = stockLogRepository.findByBranchId(branch);
        return getListResponseDto(stockLogs);

    }

    //Id로 단건조회
    @Override
    public ResponseDto<StockLogDetailResponseDto> getLogById(Long stockLogId) {
        StockLog stockLog = stockLogRepository.findById(stockLogId)
                .orElseThrow(() -> new EntityNotFoundException(ResponseCode.NO_EXIST_ID));

        StockLogDetailResponseDto responseDto = null;

        responseDto = StockLogDetailResponseDto.builder()
                .stockLogId(stockLog.getLogId())
                .type(String.valueOf(stockLog.getStockActionType()))
                .employeeName(stockLog.getEmployeeId().getName())
                .bookTitle(stockLog.getBookIsbn().getBookTitle())
                .branchName(stockLog.getBranchId().getBranchName())
                .amount(stockLog.getAmount())
                .bookAmount(stockLog.getBookAmount())
                .actionDate(stockLog.getActionDate())
                .description(stockLog.getDescription())
                .build();

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDto);

    }

    //branch + 유형별 로그 전체조회
    @Override
    public ResponseDto<List<StockLogResponseDto>> getLogsByType(Long branchId, StockActionType type) {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new EntityNotFoundException(ResponseCode.NO_EXIST_BRANCH));

        List<StockLog> stockLogs = stockLogRepository.findByBranchIdAndStockActionType(branch,type);

        return getListResponseDto(stockLogs);

    }


    //branch + 시간별 로그 조회
    @Override
    public ResponseDto<List<StockLogResponseDto>> getLogsByTime(Long branchId, LocalDateTime start, LocalDateTime end) {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new EntityNotFoundException(ResponseCode.NO_EXIST_BRANCH));

        List<StockLog> stockLogs = stockLogRepository.findByTime(branch, start, end);

        return getListResponseDto(stockLogs);
    }

    //employeeId로 로그 전체 조회
    @Override
    public ResponseDto<List<StockLogResponseDto>> getLogsByEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new EntityNotFoundException(ResponseCode.NO_EXIST_ID));

        List<StockLog> stockLogs = stockLogRepository.findByEmployeeId(employee);
        return getListResponseDto(stockLogs);
    }

    //특정 책에 대한 로그 전체 조회
    @Override
    public ResponseDto<List<StockLogResponseDto>> getLogsByBook(Long branchId, String bookIsbn) {
        Book book = bookRepository.findByIsbn(bookIsbn)
                .orElseThrow(() -> new EntityNotFoundException(ResponseCode.NO_EXIST_ID));

        List<StockLog> stockLogs = stockLogRepository.findByBookIsbn(book);
        return getListResponseDto(stockLogs);
    }
}
