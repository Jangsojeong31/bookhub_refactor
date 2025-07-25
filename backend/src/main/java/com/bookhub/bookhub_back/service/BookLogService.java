package com.bookhub.bookhub_back.service;

import com.bookhub.bookhub_back.common.enums.BookStatus;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.book.request.BookLogCreateRequestDto;
import com.bookhub.bookhub_back.dto.book.response.BookLogResponseDto;
import com.bookhub.bookhub_back.entity.Book;
import com.bookhub.bookhub_back.entity.DiscountPolicy;
import com.bookhub.bookhub_back.entity.Employee;

import java.util.List;

public interface BookLogService {

    // 로그 목록 조회
    ResponseDto<List<BookLogResponseDto>> getLogsByBook(String bookIsbn);
    // 내부 자동 호출용
    void logCreate(Book book, Employee employee);
    void logPriceChange(Book book, Long oldPrice, Employee employee);
    void logDiscountChange(Book book, Integer oldRate, DiscountPolicy policy, Employee employee);
    void logHidden(Book book, Employee employee);
    void logStatusChange(Book savedBook, Employee employee);
}
