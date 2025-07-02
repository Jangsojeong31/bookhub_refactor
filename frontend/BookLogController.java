package com.bookhub.bookhub_back.controller;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.book.response.BookLogResponseDto;
import com.bookhub.bookhub_back.service.BookLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiMappingPattern.BASIC_API + ApiMappingPattern.ADMIN_API + "/book-logs")
@RequiredArgsConstructor
public class BookLogController {
    private final BookLogService bookLogService;

    // 로그 목록 조회
    @GetMapping("/{isbn}")
    public ResponseEntity<ResponseDto<List<BookLogResponseDto>>> getLogsByBook(
            @PathVariable String isbn) {
        ResponseDto<List<BookLogResponseDto>> bookLog = bookLogService.getLogsByBook(isbn);
        return ResponseEntity.status(HttpStatus.OK).body(bookLog);
    }
}
