package com.bookhub.bookhub_back.dto.policy.request;

import com.bookhub.bookhub_back.common.enums.PolicyType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiscountPolicyUpdateRequestDto {
    private String policyDescription;
    private Integer totalPriceAchieve;
    private Integer discountPercent;
    private LocalDate startDate;
    private LocalDate endDate;
}
//Update 시에는 제목과 유형은 수정 불가
