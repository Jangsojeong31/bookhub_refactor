package com.bookhub.bookhub_back.service.impl;

import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessage;
import com.bookhub.bookhub_back.common.enums.BookLogType;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.book.response.BookLogResponseDto;
import com.bookhub.bookhub_back.entity.Book;
import com.bookhub.bookhub_back.entity.BookLog;
import com.bookhub.bookhub_back.entity.DiscountPolicy;
import com.bookhub.bookhub_back.entity.Employee;
import com.bookhub.bookhub_back.repository.BookLogRepository;
import com.bookhub.bookhub_back.repository.BookRepository;
import com.bookhub.bookhub_back.service.BookLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookLogServiceImpl implements BookLogService {

    private final BookLogRepository bookLogRepository;
    private final BookRepository bookRepository;

    @Override
    public ResponseDto<List<BookLogResponseDto>> getLogsByBook(String isbn) {
        List<BookLog> logs = bookLogRepository.findByBookIsbn_Isbn(isbn);
        List<BookLogResponseDto> result = logs.stream()
                .map(this::toDto)
                .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, result);
    }

    @Override
    public void logCreate(Book book, Employee employee) {
        saveAutoLog(book, employee, BookLogType.CREATE, null, null, null);
    }

    @Override
    public void logPriceChange(Book book, Long oldPrice, Employee employee) {
        saveAutoLog(book, employee, BookLogType.PRICE_CHANGE, oldPrice, null, null);
    }

    @Override
    public void logDiscountChange(Book book, Integer oldRate, DiscountPolicy policy, Employee employee) {
        saveAutoLog(book, employee, BookLogType.DISCOUNT_RATE, null, oldRate, policy);
    }

    @Override
    public void logHidden(Book book, Employee employee) {
        saveAutoLog(book, employee, BookLogType.HIDDEN, null, null, null);
    }

    @Override
    public void logStatusChange(Book book, Employee employee) {
        saveAutoLog(book, employee, BookLogType.STATUS_CHANGE, null, null, null);
    }

    private void saveAutoLog(Book book, Employee employee, BookLogType type,
                             Long prevPrice, Integer prevDiscount, DiscountPolicy policy) {

        BookLog log = BookLog.builder()
                .bookIsbn(book)
                .employeeId(employee)
                .bookLogType(type)
                .previousPrice(prevPrice)
                .previousDiscountRate(prevDiscount)
                .policyId(policy)
                .changedAt(LocalDate.now())
                .build();

        bookLogRepository.save(log);
    }

    private BookLogResponseDto toDto(BookLog log) {
        return BookLogResponseDto.builder()
                .bookLogId(log.getBookLogId())
                .bookIsbn(log.getBookIsbn().getIsbn())
                .bookTitle(log.getBookIsbn().getBookTitle())
                .employeeName(log.getEmployeeId().getName())
                .bookLogType(log.getBookLogType().name())
                .previousPrice(log.getPreviousPrice())
                .previousDiscountRate(log.getPreviousDiscountRate())
                .changedAt(log.getChangedAt())
                .build();
    }
}
