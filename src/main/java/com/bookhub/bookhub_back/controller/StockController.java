package com.bookhub.bookhub_back.controller;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.stock.request.StockCreateRequestDto;
import com.bookhub.bookhub_back.dto.stock.request.StockUpdateRequestDto;
import com.bookhub.bookhub_back.dto.stock.response.StockCreateResponseDto;
import com.bookhub.bookhub_back.dto.stock.response.StockListResponseDto;
import com.bookhub.bookhub_back.dto.stock.response.StockUpdateResponseDto;
import com.bookhub.bookhub_back.service.StockService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiMappingPattern.BASIC_API+ApiMappingPattern.MANAGER_API+"/stocks")
@RequiredArgsConstructor
public class StockController {

    //서비스랑 연결
    private final StockService stockService;

    @PostMapping
    public ResponseEntity<ResponseDto<StockCreateResponseDto>> createStock(
            @Valid@RequestBody StockCreateRequestDto dto
    ){
        ResponseDto<StockCreateResponseDto> responsedto = stockService.createStock(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responsedto);
    }

    //책 재고 손실 시 수량 변경(Update)
    @PutMapping("/{stockId}")
    public ResponseEntity<ResponseDto<StockUpdateResponseDto>> updateStock(
            @PathVariable Long stockId,
            @Valid @RequestBody StockUpdateRequestDto dto){
        ResponseDto<StockUpdateResponseDto> responseDto = stockService.updateStock(stockId,dto);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }


    //책 기준 전체 조회(bookIsbn 으로 검색)
    @GetMapping("/search/book/{bookIsbn}")
    public ResponseEntity<ResponseDto<List<StockListResponseDto>>> searchByBookIsbn(
            @PathVariable String bookIsbn){
        ResponseDto<List<StockListResponseDto>> responseDtos = stockService.searchByBookIsbn(bookIsbn);
        return ResponseEntity.status(HttpStatus.OK).body(responseDtos);
    }

    //책 기준 전체 조회(bookTitle 으로 검색)
    @GetMapping("/search/title")
    public ResponseEntity<ResponseDto<List<StockListResponseDto>>> searchByTitle(
            @RequestParam String bookTitle){
        ResponseDto<List<StockListResponseDto>> responseDtos = stockService.searchByBookTitle(bookTitle);
        return ResponseEntity.status(HttpStatus.OK).body(responseDtos);
    }

    //지점 기준 전체 조회
    @GetMapping("/search/{branchId}")
    public ResponseEntity<ResponseDto<List<StockListResponseDto>>> searchByBranch(
            @PathVariable Long branchId){
        ResponseDto<List<StockListResponseDto>> responseDtos = stockService.searchByBranch(branchId);
        return ResponseEntity.status(HttpStatus.OK).body(responseDtos);
    }



}
