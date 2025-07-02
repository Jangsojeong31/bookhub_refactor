package com.bookhub.bookhub_back.service;

import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.book.request.BookCreateRequestDto;
import com.bookhub.bookhub_back.dto.book.request.BookUpdateRequestDto;
import com.bookhub.bookhub_back.dto.book.response.BookResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BookService {
    ResponseDto<BookResponseDto> createBook(BookCreateRequestDto dto, String token, MultipartFile coverImageFile) throws Exception;
    ResponseDto<BookResponseDto> updateBook(String isbn, BookUpdateRequestDto dto, String token, MultipartFile newCoverImageFile) throws Exception;
    ResponseDto<List<BookResponseDto>> searchBook(String keyword);
    ResponseDto<Void> hideBook(String isbn, String token);
}
