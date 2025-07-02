package com.bookhub.bookhub_back.controller;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.common.enums.PolicyType;
import com.bookhub.bookhub_back.dto.PageResponseDto;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.policy.response.DiscountPolicyDetailResponseDto;
import com.bookhub.bookhub_back.dto.policy.response.DiscountPolicyListResponseDto;
import com.bookhub.bookhub_back.service.DiscountPolicyService;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequestMapping(ApiMappingPattern.BASIC_API + ApiMappingPattern.COMMON_API + "/policies")
@RequiredArgsConstructor
public class DiscountPolicyController {
    private final DiscountPolicyService discountPolicyService;

    @GetMapping
    public ResponseEntity<ResponseDto<PageResponseDto<DiscountPolicyListResponseDto>>> getPolicies(
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "10") @Min(1) int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) PolicyType type,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate start,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate end
    ) {
        // service 레이어에서 keyword/type/start/end 를 조합해 동적 쿼리 처리하도록 구현
        ResponseDto<PageResponseDto<DiscountPolicyListResponseDto>> response =
                discountPolicyService.getFilteredPolicies(page, size, keyword, type, start, end);
        return ResponseEntity.ok(response);
    }

    //2) 할인 정책 단건 조회
    @GetMapping("/{policyId}")
    public ResponseEntity<ResponseDto<DiscountPolicyDetailResponseDto>> getPolicyById(
            @PathVariable Long policyId){
        ResponseDto<DiscountPolicyDetailResponseDto> policy = discountPolicyService.getPolicyById(policyId);
        return ResponseEntity.status(HttpStatus.OK).body(policy);
    }


}



//package com.bookhub.bookhub_back.controller;
//
//import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
//import com.bookhub.bookhub_back.common.enums.PolicyType;
//import com.bookhub.bookhub_back.dto.PageResponseDto;
//import com.bookhub.bookhub_back.dto.ResponseDto;
//import com.bookhub.bookhub_back.dto.policy.request.DiscountPolicyCreateRequestDto;
//import com.bookhub.bookhub_back.dto.policy.request.DiscountPolicyUpdateRequestDto;
//import com.bookhub.bookhub_back.dto.policy.response.DiscountPolicyDetailResponseDto;
//import com.bookhub.bookhub_back.dto.policy.response.DiscountPolicyListResponseDto;
//import com.bookhub.bookhub_back.service.DiscountPolicyService;
//import com.bookhub.bookhub_back.service.PublisherService;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.format.annotation.DateTimeFormat;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@RestController
//@RequestMapping(ApiMappingPattern.BASIC_API+ApiMappingPattern.COMMON_API+"/policies")
//@RequiredArgsConstructor
//public class DiscountPolicyController {
//    //서비스 단이랑 연결
//    private final DiscountPolicyService discountPolicyService;

//    //1) 할인 정책 전체조회
//    @GetMapping
//    public ResponseEntity<ResponseDto<?>> getPolicies(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size,
//            @RequestParam(required = false) String keyword){
//        if (keyword != null && !keyword.isBlank()){
//            return ResponseEntity.ok(discountPolicyService.getPoliciesByTitleContaining(keyword));
//        }
//        ResponseDto<PageResponseDto<DiscountPolicyListResponseDto>> policies = discountPolicyService.getAllPolicies(page,size);
//        return ResponseEntity.status(policies);
//    }

    //2) 할인 정책 단건 조회
//    @GetMapping("/{policyId}")
//    public ResponseEntity<ResponseDto<DiscountPolicyDetailResponseDto>> getPolicyById(
//            @PathVariable Long policyId){
//        ResponseDto<DiscountPolicyDetailResponseDto> policy = discountPolicyService.getPolicyById(policyId);
//        return ResponseEntity.status(HttpStatus.OK).body(policy);
//    }
//




//    //3) 할인 정책 제목으로 검색
//    @GetMapping(ApiMappingPattern.COMMON_API+"/policies")
//    public ResponseEntity<ResponseDto<List<DiscountPolicyListResponseDto>>> searchPoliciesByTitle(
//            @RequestParam String keyword){
//        ResponseDto<List<DiscountPolicyListResponseDto>> responseDto = discountPolicyService.searchPoliciesByTitle(keyword);
//        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
//    }
//
//    //4) 할인 정책 PolicyType로 검색
//    @GetMapping(ApiMappingPattern.COMMON_API+"/policies/type")
//    public ResponseEntity<ResponseDto<List<DiscountPolicyListResponseDto>>> getPoliciesByType(
//            @RequestParam PolicyType type){
//        ResponseDto<List<DiscountPolicyListResponseDto>> responseDtos = discountPolicyService.getPoliciesByType(type);
//        return ResponseEntity.status(HttpStatus.OK).body(responseDtos);
//    }
//
//    //5)할인 정책 기간으로 검색
//    @GetMapping("/time")
//    public ResponseEntity<ResponseDto<List<DiscountPolicyListResponseDto>>> getPoliciesByTime(
//            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
//            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end){
//        ResponseDto<List<DiscountPolicyListResponseDto>> responseDtos = discountPolicyService.getPoliciesByTime(start,end);
//        return ResponseEntity.status(HttpStatus.OK).body(responseDtos);
//    }
//
//
//}
