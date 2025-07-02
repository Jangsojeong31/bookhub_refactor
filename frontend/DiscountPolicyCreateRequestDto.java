package com.bookhub.bookhub_back.dto.policy.request;

import com.bookhub.bookhub_back.common.enums.PolicyType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiscountPolicyCreateRequestDto {
    @NotBlank
    private String policyTitle;
    private String policyDescription;
    @NotNull
    private PolicyType policyType;
    private Integer totalPriceAchieve;
    @NotNull
    private Integer discountPercent;
    private LocalDate startDate;
    private LocalDate endDate;
}
