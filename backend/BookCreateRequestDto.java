package com.bookhub.bookhub_back.dto.book.request;

import com.bookhub.bookhub_back.entity.DiscountPolicy;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookCreateRequestDto {
    private String isbn;
    private Long categoryId;
    private Long authorId;
    private Long publisherId;
    private String bookTitle;
    private Long bookPrice;
    private LocalDate publishedDate;
    private String coverUrl;
    private String pageCount;
    private String language;
    private String description;
    private Long policyId;
}
