package com.bookhub.bookhub_back.service.impl;
import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessage;
import com.bookhub.bookhub_back.common.enums.BookStatus;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.book.request.BookCreateRequestDto;
import com.bookhub.bookhub_back.dto.book.request.BookUpdateRequestDto;
import com.bookhub.bookhub_back.dto.book.response.BookResponseDto;
import com.bookhub.bookhub_back.entity.Book;
import com.bookhub.bookhub_back.entity.BookCategory;
import com.bookhub.bookhub_back.entity.DiscountPolicy;
import com.bookhub.bookhub_back.entity.Employee;
import com.bookhub.bookhub_back.provider.JwtProvider;
import com.bookhub.bookhub_back.repository.*;
import com.bookhub.bookhub_back.service.BookLogService;
import com.bookhub.bookhub_back.service.BookService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final BookCategoryRepository bookCategoryRepository;
    private final AuthorRepository authorRepository;
    private final PublisherRepository publisherRepository;
    private final DiscountPolicyRepository discountPolicyRepository;
    private final BookCategoryRepository categoryRepository;
    private final BookLogService bookLogService;
    private final EmployeeRepository employeeRepository;
    private final JwtProvider jwtProvider;

    @Value("${file.upload-dir}")
    private String uploadDir;


    @Override
    @Transactional
    public ResponseDto<BookResponseDto> createBook(BookCreateRequestDto dto, String token, MultipartFile coverImageFile) throws IOException{

        String loginId = jwtProvider.getUsernameFromJwt(jwtProvider.removeBearer(token));
        Employee employee = employeeRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException(ResponseCode.NO_EXIST_USER_ID));

        Book book = Book.builder()
                .isbn(dto.getIsbn())
                .categoryId(bookCategoryRepository.findById(dto.getCategoryId()).orElseThrow(()-> new IllegalArgumentException("존재하지 않는 카테고리입니다.")))
                .authorId(authorRepository.findById(dto.getAuthorId()).orElseThrow(()-> new IllegalArgumentException("존재하지 않는 작가입니다..")))
                .publisherId(publisherRepository.findById(dto.getPublisherId()).orElseThrow(()-> new IllegalArgumentException("존재하지 않는 출판사 입니다.")))
                .bookTitle(dto.getBookTitle())
                .bookPrice(dto.getBookPrice())
                .publishedDate(dto.getPublishedDate())
                .coverUrl(null)
                .pageCount(dto.getPageCount())
                .language(dto.getLanguage())
                .description(dto.getDescription())
                .bookStatus(BookStatus.ACTIVE)
                .policyId(dto.getPolicyId() != null
                        ? discountPolicyRepository.findById(dto.getPolicyId()).orElseThrow(()-> new IllegalArgumentException("존재하지 않는 할인 정책입니다."))
                        : null
                )
                .build();
        Book savedBook = bookRepository.save(book);

        if (coverImageFile != null && !coverImageFile.isEmpty()) {
            String coverUrl = saveCoverImageFile(coverImageFile);
            savedBook.setCoverUrl(coverUrl);
        }

        bookLogService.logCreate(savedBook, employee);
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, toDto(savedBook));
    }

    @Override
    public ResponseDto<BookResponseDto> updateBook(String isbn, BookUpdateRequestDto dto, String token, MultipartFile coverImageFile) throws IOException {

        String loginId = jwtProvider.getUsernameFromJwt(jwtProvider.removeBearer(token));
        Employee employee = employeeRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException(ResponseCode.NO_EXIST_USER_ID));

        Book book = bookRepository.findById(dto.getIsbn())
                .orElseThrow(() -> new IllegalArgumentException("해당 ISBN의 책이 존재하지 않습니다."));

        Long oldPrice = book.getBookPrice();
        DiscountPolicy oldPolicy = book.getPolicyId();
        BookStatus oldStatus = book.getBookStatus();
        Integer oldRate = oldPolicy != null ? oldPolicy.getDiscountPercent() : null;

        book.setBookPrice(dto.getBookPrice());
        if (dto.getCategoryId() != null) {
            BookCategory newCategory = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리입니다."));
            book.setCategoryId(newCategory);
        }
        book.setDescription(dto.getDescription());

        BookStatus newStatus = dto.getBookStatus() != null
                ? BookStatus.valueOf(dto.getBookStatus().toUpperCase())
                : oldStatus;
        book.setBookStatus(newStatus);

        if (dto.getPolicyId() != null && dto.getPolicyId() > 0) {
            DiscountPolicy newPolicy = discountPolicyRepository.findById(dto.getPolicyId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 할인 정책입니다."));
            book.setPolicyId(newPolicy);
        } else {
            book.setPolicyId(null);
        }


        // 이미지 업데이트
        if (coverImageFile != null && !coverImageFile.isEmpty()) {
            String coverUrl = saveCoverImageFile(coverImageFile);
            book.setCoverUrl(coverUrl);
        }

        Book savedBook = bookRepository.save(book);

        // 로그 기록
        if (!oldPrice.equals(dto.getBookPrice())) {
            bookLogService.logPriceChange(savedBook, oldPrice, employee);
        }

        DiscountPolicy newPolicy = savedBook.getPolicyId();
        Integer newRate = newPolicy != null ? newPolicy.getDiscountPercent() : null;
        if ((oldRate != null && !oldRate.equals(newRate)) || (oldRate == null && newRate != null)) {
            bookLogService.logDiscountChange(savedBook, oldRate != null ? oldRate : 0, newPolicy, employee);
        }

        if (!oldStatus.equals(newStatus)) {
            bookLogService.logStatusChange(savedBook, employee);
        }

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, toDto(savedBook));
    }



    @Override
    public ResponseDto<List<BookResponseDto>> searchBook(String keyword) {
        List<Book> books = bookRepository.searchAllByKeyword(keyword);

        List<BookResponseDto> result = books.stream()
                .map(this::toDto)
                .toList();

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, result);
    }

    @Override
    public ResponseDto<Void> hideBook(String isbn, String token) {
        // 1. 로그인한 사용자 정보 추출
        String loginId = jwtProvider.getUsernameFromJwt(jwtProvider.removeBearer(token));
        Employee employee = employeeRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException(ResponseCode.NO_EXIST_USER_ID));


        Book book = bookRepository.findById(isbn).orElseThrow(()-> new IllegalArgumentException("삭제할 책을 찾을 수 없습니다."));

        // 상태를 HIDDEN으로 변경
        book.setBookStatus(BookStatus.HIDDEN);
        bookRepository.save(book);

        // hidden 로그 생성
        bookLogService.logHidden(book, employee);

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }


    private BookResponseDto toDto(Book book) {
        return BookResponseDto.builder()
                .isbn(book.getIsbn())
                .bookTitle(book.getBookTitle())
                .categoryId(book.getCategoryId().getCategoryId())
                .categoryName(book.getCategoryId().getCategoryName())
                .authorName(book.getAuthorId().getAuthorName())
                .publisherName(book.getPublisherId().getPublisherName())
                .bookPrice(book.getBookPrice())
                .publishedDate(book.getPublishedDate())
                .coverUrl(book.getCoverUrl())
                .pageCount(book.getPageCount())
                .language(book.getLanguage())
                .description(book.getDescription())
                .bookStatus(book.getBookStatus().name())
                .policyId(
                        book.getPolicyId() != null
                                ? book.getPolicyId().getPolicyId()
                                : null
                )
                .build();
    }
    // 실제 파일 저장 및 메타데이터 기록
    private String saveCoverImageFile(MultipartFile file) throws IOException {
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String originalName = file.getOriginalFilename();
        String uuid = UUID.randomUUID() + "_" + originalName;
        file.transferTo(new File(uploadDir + "/" + uuid));

        return "/files/" + uuid;
    }
}
