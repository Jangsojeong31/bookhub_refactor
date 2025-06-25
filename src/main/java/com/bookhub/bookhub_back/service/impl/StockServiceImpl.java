package com.bookhub.bookhub_back.service.impl;

import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessage;
import com.bookhub.bookhub_back.common.constants.ResponseMessageKorean;
import com.bookhub.bookhub_back.common.enums.AlertType;
import com.bookhub.bookhub_back.common.enums.StockActionType;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.alert.request.AlertCreateRequestDto;
import com.bookhub.bookhub_back.dto.stock.request.StockCreateRequestDto;
import com.bookhub.bookhub_back.dto.stock.request.StockUpdateRequestDto;
import com.bookhub.bookhub_back.dto.stock.response.StockCreateResponseDto;
import com.bookhub.bookhub_back.dto.stock.response.StockListResponseDto;
import com.bookhub.bookhub_back.dto.stock.response.StockUpdateResponseDto;
import com.bookhub.bookhub_back.entity.*;
import com.bookhub.bookhub_back.repository.*;
import com.bookhub.bookhub_back.service.AlertService;
import com.bookhub.bookhub_back.service.StockService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {
    private final StockRepository stockRepository;//재고
    private final StockLogRepository stockLogRepository;//재고 로그 입력
    private final AlertService alertService;//알림
    private final AuthorityRepository authorityRepository;//권한
    private final EmployeeRepository employeeRepository;//직원
    private final BookRepository bookRepository;//책
    private final BranchRepository branchRepository;//지점

    //재고 생성
    @Override
    public ResponseDto<StockCreateResponseDto> createStock(StockCreateRequestDto dto) {
        return null;
    }



    //재고 업데이트
    @Override
    public ResponseDto<StockUpdateResponseDto> updateStock(Long stockId, StockUpdateRequestDto dto) {

        StockActionType actionType = StockActionType.valueOf(dto.getType().toUpperCase());
        Long updatedAmount;

        Stock stock;

        if (stockId != null) {
            stock = stockRepository.findById(stockId)
                    .orElseThrow(() -> new IllegalArgumentException("해당 재고 ID가 존재하지 않습니다."));
        } else {
            // Book + Branch로 조회
            Book book = bookRepository.findById(dto.getBookIsbn())
                    .orElseThrow(() -> new IllegalArgumentException("도서가 존재하지 않습니다."));

            Branch branch = branchRepository.findById(dto.getBranchId())
                    .orElseThrow(() -> new IllegalArgumentException("지점이 존재하지 않습니다."));

            stock = stockRepository.findByBookIsbnAndBranchId(book, branch)
                    .orElseGet(() -> stockRepository.save(
                            Stock.builder()
                                    .bookIsbn(book)
                                    .branchId(branch)
                                    .bookAmount(0L)
                                    .build()
                    ));
        }

        switch (actionType) {
            case IN -> updatedAmount = stock.getBookAmount() + dto.getAmount();
            case OUT, LOSS -> {
                if (stock.getBookAmount() < dto.getAmount()) {
                    throw new IllegalArgumentException("재고 부족");
                }
                updatedAmount = stock.getBookAmount() - dto.getAmount();
            }
            default -> throw new IllegalArgumentException("잘못된 type");
        }

//        //만약 Book이랑 branch가 동시에 일치하는 Stock이 없을때
//        Stock stock = stockRepository.findByBookIsbnAndBranchId(dto.getBookIsbn(), dto.getBranchId())
//                .orElseGet(() -> {
//                    Stock newStock = Stock.builder()
//                            .bookIsbn(dto.getBookIsbn())
//                            .branchId(dto.getBranchId())
//                            .bookAmount(0L)
//                            .build();
//                    return stockRepository.save(newStock);
//                });

        stock.setBookAmount(updatedAmount);
        stockRepository.save(stock);

        StockUpdateResponseDto responseDto = StockUpdateResponseDto.builder()
                .stockId(stock.getStockId())
                .branchName(stock.getBranchId().getBranchName())
                .type(dto.getType())
                .bookTitle(stock.getBookIsbn().getBookTitle())
                .amount(dto.getAmount())
                .bookAmount(stock.getBookAmount())
                .build();

        StockLog log = StockLog.builder()
                .stockActionType(StockActionType.valueOf(dto.getType()))
                .employeeId(employeeRepository.findById(dto.getEmployeeId()).orElseThrow(()-> new IllegalArgumentException(ResponseMessageKorean.USER_NOT_FOUND)))
                .bookIsbn(bookRepository.findById(dto.getBookIsbn()).orElseThrow(()-> new IllegalArgumentException((ResponseMessageKorean.RESOURCE_NOT_FOUND))))
                .branchId(branchRepository.findById(dto.getBranchId()).orElseThrow(()-> new IllegalArgumentException((ResponseMessageKorean.RESOURCE_NOT_FOUND))))
                .amount(dto.getAmount())
                .bookAmount(updatedAmount)
                .description(dto.getDescription())
                .build();

        stockLogRepository.save(log);
        // 매니저에게 STOCK_LOW 알림
        if ((actionType == StockActionType.OUT || actionType == StockActionType.LOSS) && updatedAmount <= 5) {
            Authority managerAuthority = authorityRepository.findByAuthorityName("MANAGER")
                    .orElseThrow(() -> new IllegalArgumentException(ResponseMessageKorean.USER_NOT_FOUND));

            final Stock finalStock = stock;

            String alertType = (updatedAmount == 0) ? "STOCK_OUT" : "STOCK_LOW";
            String message = "[" + stock.getBookIsbn().getBookTitle() + "] 도서의 재고가 "
                    + (updatedAmount == 0 ? "모두 소진되었습니다." : "부족합니다 (남은 수량: " + updatedAmount + "권)");

            employeeRepository.findAll().stream()
                    .filter(emp -> emp.getAuthorityId().equals(managerAuthority) && emp.getBranchId().equals(finalStock.getBranchId()))
                    .forEach(manager -> {
                        AlertCreateRequestDto alertDto = AlertCreateRequestDto.builder()
                                .employeeId(manager.getEmployeeId())
                                .alertType(alertType)
                                .message(message)
                                .alertTargetTable("STOCKS")
                                .targetPk(stock.getStockId())
                                .targetIsbn(String.valueOf(stock.getBookIsbn()))
                                .build();
                        alertService.createAlert(alertDto);
                    });
        }

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDto);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseDto<List<StockListResponseDto>> searchByBookIsbn(String bookIsbn) {

        List<StockListResponseDto> responseDtos = null;
        List<Stock> stocks = stockRepository.findByBookIsbn_Isbn(bookIsbn);
        if (stocks.isEmpty()) {
            throw new EntityNotFoundException(ResponseCode.NO_EXIST_ID + bookIsbn);
        }

        responseDtos = stocks.stream()
                .map(stock -> StockListResponseDto.builder()
                        .branchName(stock.getBranchId().getBranchName())
                        .bookTitle(stock.getBookIsbn().getBookTitle())
                        .amount(stock.getBookAmount())
                        .build())
                .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseDto<List<StockListResponseDto>> searchByBookTitle(String bookTitle) {
        List<StockListResponseDto> responseDtos = null;
        List<Stock> stocks = stockRepository.findByBookIsbn_BookTitleContaining(bookTitle);

        if (bookTitle == null || bookTitle.trim().isEmpty()) {
            return ResponseDto.fail(ResponseCode.REQUIRED_FIELD_MISSING,ResponseMessage.REQUIRED_FIELD_MISSING);
        }

        responseDtos = stocks.stream()
                .map(stock -> StockListResponseDto.builder()
                        .branchName(stock.getBranchId().getBranchName())
                        .bookTitle(stock.getBookIsbn().getBookTitle())
                        .amount(stock.getBookAmount())
                        .build())
                .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);

    }

    @Override
    @Transactional(readOnly = true)
    public ResponseDto<List<StockListResponseDto>> searchByBranch(Long branchId) {
        List<StockListResponseDto> responseDtos = null;
        List<Stock> stocks = stockRepository.findByBranchId_BranchId(branchId);
        if (stocks.isEmpty()) {
            throw new EntityNotFoundException(ResponseCode.NO_EXIST_ID + branchId);
        }

        responseDtos = stocks.stream()
                .map(stock -> StockListResponseDto.builder()
                        .branchName(stock.getBranchId().getBranchName())
                        .bookTitle(stock.getBookIsbn().getBookTitle())
                        .amount(stock.getBookAmount())
                        .build())
                .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }


}
