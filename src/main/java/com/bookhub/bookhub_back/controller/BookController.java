package com.bookhub.bookhub_back.controller;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.book.request.BookCreateRequestDto;
import com.bookhub.bookhub_back.dto.book.request.BookUpdateRequestDto;
import com.bookhub.bookhub_back.dto.book.response.BookResponseDto;
import com.bookhub.bookhub_back.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(ApiMappingPattern.BASIC_API)
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @PostMapping(ApiMappingPattern.ADMIN_API + "/books")
    public ResponseEntity<ResponseDto<BookResponseDto>> createBook(
            @RequestHeader("Authorization") String token,
            @RequestPart("dto") BookCreateRequestDto dto,
            @RequestPart(value = "coverImageFile", required = false) MultipartFile coverImageFile) throws Exception{

        ResponseDto<BookResponseDto> book = bookService.createBook(dto, token, coverImageFile);
        return ResponseEntity.status(HttpStatus.CREATED).body(book);
    }

    // 2. 책 수정
    @PutMapping(ApiMappingPattern.ADMIN_API + "/books/{isbn}")
    public ResponseDto<BookResponseDto> updateBook(
            @PathVariable String isbn,
            @RequestHeader("Authorization") String token,
            @RequestPart BookUpdateRequestDto dto,
            @RequestPart(value = "file", required = false) MultipartFile newCoverImageFile) throws Exception{
        return bookService.updateBook(isbn, dto, token, newCoverImageFile);
    }

    // 3. 책 hidden 처리
    @PutMapping(ApiMappingPattern.ADMIN_API + "/books/hidden/{isbn}")
    public ResponseDto<Void> hideBook(
            @PathVariable String isbn,
            @RequestHeader("Authorization") String token) {
        return bookService.hideBook(isbn, token);
    }

    // 4. 책 통합 검색
    @GetMapping(ApiMappingPattern.COMMON_API + "/books/search")
    public ResponseDto<List<BookResponseDto>> searchBook(
            @RequestParam String keyword) {
        return bookService.searchBook(keyword);
    }

}
