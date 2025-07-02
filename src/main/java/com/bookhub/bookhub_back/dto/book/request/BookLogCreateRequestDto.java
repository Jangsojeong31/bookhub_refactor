package com.bookhub.bookhub_back.dto.book.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookLogCreateRequestDto {
    private String bookIsbn;
    private String bookLogType;
    private int previousPrice;
    private int previousDiscountRate;
    private Long employeeId;
    private Long policyId;
    private LocalDateTime changedAt;
}
