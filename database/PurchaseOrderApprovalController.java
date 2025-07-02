package com.bookhub.bookhub_back.controller;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.common.enums.PurchaseOrderStatus;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.purchaseOrder.request.PurchaseOrderApproveRequestDto;
import com.bookhub.bookhub_back.dto.purchaseOrder.response.PurchaseOrderResponseDto;
import com.bookhub.bookhub_back.dto.purchaseOrderApproval.response.PurchaseOrderApprovalResponseDto;
import com.bookhub.bookhub_back.service.PurchaseOrderApprovalService;
import com.bookhub.bookhub_back.service.PurchaseOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(ApiMappingPattern.BASIC_API + ApiMappingPattern.ADMIN_API + "/purchase-order-approvals")
@RequiredArgsConstructor
public class PurchaseOrderApprovalController {
    private final PurchaseOrderApprovalService purchaseOrderApprovalService;
    private final PurchaseOrderService purchaseOrderService;

    // 단건 조회
    @GetMapping("/{purchaseOrderApprovalId}")
    public ResponseEntity<ResponseDto<PurchaseOrderApprovalResponseDto>> getPurchaseOrderApprovalById(
            @PathVariable Long purchaseOrderApprovalId
    ) {
        ResponseDto<PurchaseOrderApprovalResponseDto> response = purchaseOrderApprovalService.getPurchaseOrderApprovalById(purchaseOrderApprovalId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 조회 조건으로 조회 - 승인 담당자, 승인 여부로 조회
    @GetMapping
    public ResponseEntity<ResponseDto<List<PurchaseOrderApprovalResponseDto>>> getPurchaseOrderApprovalByEmployeeNameAndIsApproved(
            @RequestParam(required = false) String employeeName,
            @RequestParam(required = false) Boolean isApproved
    ) {
        ResponseDto<List<PurchaseOrderApprovalResponseDto>> response = purchaseOrderApprovalService.getPurchaseOrderApprovalByEmployeeNameAndIsApproved(employeeName, isApproved);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 조회 조건으로 조회 - 승인 일자로 조회
    @GetMapping("/date")
    public ResponseEntity<ResponseDto<List<PurchaseOrderApprovalResponseDto>>> getPurchaseOrderApprovalByCreatedAt(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate
    ) {
        ResponseDto<List<PurchaseOrderApprovalResponseDto>> response = purchaseOrderApprovalService.getPurchaseOrderApprovalByCreatedAt(startDate, endDate);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
