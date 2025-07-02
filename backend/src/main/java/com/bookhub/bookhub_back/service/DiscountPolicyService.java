package com.bookhub.bookhub_back.service;

import com.bookhub.bookhub_back.common.enums.PolicyType;
import com.bookhub.bookhub_back.dto.PageResponseDto;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.policy.request.DiscountPolicyCreateRequestDto;
import com.bookhub.bookhub_back.dto.policy.request.DiscountPolicyUpdateRequestDto;
import com.bookhub.bookhub_back.dto.policy.response.DiscountPolicyDetailResponseDto;
import com.bookhub.bookhub_back.dto.policy.response.DiscountPolicyListResponseDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface DiscountPolicyService {
    ResponseDto<Void> createPolicy(@Valid DiscountPolicyCreateRequestDto dto);

    ResponseDto<Void> updatePolicy(Long policyId, @Valid DiscountPolicyUpdateRequestDto dto);
//
//    ResponseDto<List<DiscountPolicyListResponseDto>> getAllPolicies(int page, int size);

    ResponseDto<DiscountPolicyDetailResponseDto> getPolicyById(Long policyId);

//    ResponseDto<List<DiscountPolicyListResponseDto>> searchPoliciesByTitle(String keyword);
//
//    ResponseDto<List<DiscountPolicyListResponseDto>> getPoliciesByType(PolicyType type);
//
//    ResponseDto<List<DiscountPolicyListResponseDto>> getPoliciesByTime(LocalDateTime start, LocalDateTime end);

    ResponseDto<Void> deletePolicy(Long policyId);

//
//    ResponseDto<?> searchPoliciesByTitleContaining(String keyword);
//
//    ResponseDto<?> getPoliciesByTitleContaining(String keyword);

    ResponseDto<PageResponseDto<DiscountPolicyListResponseDto>> getFilteredPolicies(@Min(0) int page, @Min(1) int size, String keyword, PolicyType type, LocalDate start, LocalDate end);
}
