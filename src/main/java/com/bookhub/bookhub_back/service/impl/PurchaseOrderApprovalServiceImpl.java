package com.bookhub.bookhub_back.service.impl;

import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessage;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.purchaseOrder.response.PurchaseOrderResponseDto;
import com.bookhub.bookhub_back.dto.purchaseOrderApproval.response.PurchaseOrderApprovalResponseDto;
import com.bookhub.bookhub_back.entity.*;
import com.bookhub.bookhub_back.repository.EmployeeRepository;
import com.bookhub.bookhub_back.repository.PurchaseOrderApprovalRepository;
import com.bookhub.bookhub_back.service.PurchaseOrderApprovalService;
import com.bookhub.bookhub_back.service.PurchaseOrderService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchaseOrderApprovalServiceImpl implements PurchaseOrderApprovalService {
    private final PurchaseOrderApprovalRepository purchaseOrderApprovalRepository;
    private final EmployeeRepository employeeRepository;

    // 전체 조회
    @Override
    public ResponseDto<List<PurchaseOrderApprovalResponseDto>> getAllPurchaseOrderApprovals() {
        List<PurchaseOrderApprovalResponseDto> responseDtos = null;

        List<PurchaseOrderApproval> purchaseOrderApprovals = purchaseOrderApprovalRepository.findAll();

        responseDtos = purchaseOrderApprovals.stream()
                .sorted(Comparator.comparing(PurchaseOrderApproval::getCreatedAt).reversed())
                .map(purchaseOrderApproval -> changeToResponseDto(purchaseOrderApproval))
                .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }

    // id로 단건 조회
    @Override
    public ResponseDto<PurchaseOrderApprovalResponseDto> getPurchaseOrderApprovalById(Long id) {
        PurchaseOrderApprovalResponseDto responseDto = null;

        PurchaseOrderApproval purchaseOrderApproval = purchaseOrderApprovalRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ResponseMessage.NO_EXIST_ID));

        responseDto = changeToResponseDto(purchaseOrderApproval);
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDto);
    }

    // 조회 - 승인 담당자
    @Override
    public ResponseDto<List<PurchaseOrderApprovalResponseDto>> getPurchaseOrderApprovalByEmployeeName(String employeeName) {
        List<PurchaseOrderApprovalResponseDto> responseDtos = null;
        List<PurchaseOrderApproval> purchaseOrderApprovals = null;

        Employee employee = employeeRepository.findByName(employeeName)
                .orElseThrow(() -> new EntityNotFoundException(ResponseMessage.NO_EXIST_ID));


        purchaseOrderApprovals = purchaseOrderApprovalRepository.findByEmployeeId(employee);

        responseDtos = purchaseOrderApprovals.stream()
                .map(purchaseOrderApproval -> changeToResponseDto(purchaseOrderApproval))
                .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }

    // 조회 - 승인 일자
    @Override
    public ResponseDto<List<PurchaseOrderApprovalResponseDto>> getPurchaseOrderApprovalByCreatedAt(LocalDate startDate, LocalDate endDate) {
        List<PurchaseOrderApprovalResponseDto> responseDtos = null;
        List<PurchaseOrderApproval> purchaseOrderApprovals = null;

        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("시작일과 종료일을 입력해주세요.");
        }

        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.atTime(23, 59, 59);

        purchaseOrderApprovals = purchaseOrderApprovalRepository.findByCreatedAtBetween(start, end);

        responseDtos = purchaseOrderApprovals.stream()
                .sorted(Comparator.comparing(PurchaseOrderApproval::getCreatedAt).reversed())
                .map(purchaseOrderApproval -> changeToResponseDto(purchaseOrderApproval))
                .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }


    // 조회 - 승인 여부
    @Override
    public ResponseDto<List<PurchaseOrderApprovalResponseDto>> getPurchaseOrderApprovalByIsApproved(boolean isApproved) {
        List<PurchaseOrderApprovalResponseDto> responseDtos = null;
        List<PurchaseOrderApproval> purchaseOrderApprovals = null;

        purchaseOrderApprovals = purchaseOrderApprovalRepository.findByIsApproved(isApproved);

        responseDtos = purchaseOrderApprovals.stream()
                .sorted(Comparator.comparing(PurchaseOrderApproval::getCreatedAt).reversed())
                .map(purchaseOrderApproval -> changeToResponseDto(purchaseOrderApproval))
                .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }

    // 조회 - 승인 담당자 + 승인 여부
    @Override
    public ResponseDto<List<PurchaseOrderApprovalResponseDto>> getPurchaseOrderApprovalByEmployeeNameAndIsApproved(
            String employeeName, Boolean isApproved
    ) {
        List<PurchaseOrderApprovalResponseDto> responseDtos = null;
        List<PurchaseOrderApproval> purchaseOrderApprovals = null;

        if(employeeName == null && isApproved == null) {
            purchaseOrderApprovals = purchaseOrderApprovalRepository.findAll();
        }else if(employeeName == null) {
            purchaseOrderApprovals = purchaseOrderApprovalRepository.findByIsApproved(isApproved);
        }else if(isApproved == null) {
            Employee employee = employeeRepository.findByName(employeeName)
                    .orElseThrow(() -> new EntityNotFoundException(ResponseMessage.NO_EXIST_ID));
            purchaseOrderApprovals = purchaseOrderApprovalRepository.findByEmployeeId(employee);
        }else {
            Employee employee = employeeRepository.findByName(employeeName)
                    .orElseThrow(() -> new EntityNotFoundException(ResponseMessage.NO_EXIST_ID));
            purchaseOrderApprovals = purchaseOrderApprovalRepository.findByEmployeeIdAndIsApproved(employee, isApproved);
        }

        responseDtos = purchaseOrderApprovals.stream()
                .sorted(Comparator.comparing(PurchaseOrderApproval::getCreatedAt).reversed())
                .map(approval -> changeToResponseDto(approval))
                .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }

    // responseDto 변환 메서드
    public PurchaseOrderApprovalResponseDto changeToResponseDto(PurchaseOrderApproval purchaseOrderApproval) {
        return  PurchaseOrderApprovalResponseDto.builder()
                .purchaseOrderApprovalId(purchaseOrderApproval.getPurchaseOrderApprovalId())
                .poDetail(
                        PurchaseOrderApprovalResponseDto.PurchaseOrderDetail.builder()
                                .branchName(purchaseOrderApproval.getPurchaseOrderId().getBranchId().getBranchName())
                                .employeeName(purchaseOrderApproval.getPurchaseOrderId().getEmployeeId().getName())
                                .isbn(purchaseOrderApproval.getPurchaseOrderId().getBookIsbn().getIsbn())
                                .bookTitle(purchaseOrderApproval.getPurchaseOrderId().getBookIsbn().getBookTitle())
                                .bookPrice(purchaseOrderApproval.getPurchaseOrderId().getBookIsbn().getBookPrice())
                                .purchaseOrderAmount(purchaseOrderApproval.getPurchaseOrderId().getPurchaseOrderAmount())
                                .purchaseOrderStatus(purchaseOrderApproval.getPurchaseOrderId().getPurchaseOrderStatus())
                                .build()
                )
                .employeeName(purchaseOrderApproval.getEmployeeId().getName())
                .isApproved(purchaseOrderApproval.isApproved())
                .approvedDateAt(purchaseOrderApproval.getCreatedAt())
                .build();
    }
}
