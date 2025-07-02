package com.bookhub.bookhub_back.service.impl;

import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessageKorean;
import com.bookhub.bookhub_back.common.enums.AlertType;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.alert.request.AlertCreateRequestDto;
import com.bookhub.bookhub_back.dto.reception.request.ReceptionCreateRequestDto;
import com.bookhub.bookhub_back.dto.reception.response.ReceptionCreateResponseDto;
import com.bookhub.bookhub_back.dto.reception.response.ReceptionListResponseDto;
import com.bookhub.bookhub_back.dto.stock.request.StockUpdateRequestDto;
import com.bookhub.bookhub_back.entity.*;
import com.bookhub.bookhub_back.provider.JwtProvider;
import com.bookhub.bookhub_back.repository.*;
import com.bookhub.bookhub_back.service.AlertService;
import com.bookhub.bookhub_back.service.BookReceptionApprovalService;
import com.bookhub.bookhub_back.service.StockService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookReceptionApprovalServiceImpl implements BookReceptionApprovalService {
    private final JwtProvider jwtProvider;
    private final EmployeeRepository employeeRepository;
    private final BookReceptionApprovalRepository bookReceptionApprovalRepository;
    private final PurchaseOrderApprovalRepository purchaseOrderApprovalRepository;
    private final StockService stockService;
    private final AlertService alertService;
    private final AuthorityRepository authorityRepository;

    @Override
    @Transactional
    public ResponseDto<ReceptionCreateResponseDto> createReception(ReceptionCreateRequestDto dto, String token) {
        // 1. 로그인한 사용자 정보 추출
        String loginId = jwtProvider.getUsernameFromJwt(jwtProvider.removeBearer(token));
        Employee employee = employeeRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException(ResponseCode.NO_EXIST_USER_ID));

        Branch branch = employee.getBranchId();
        PurchaseOrderApproval purchaseOrderApproval = purchaseOrderApprovalRepository.findById(dto.getPurchaseOrderApprovalId())
                .orElseThrow(()-> new IllegalArgumentException("존재하지 않는 발주 승인 입니다."));

        BookReceptionApproval bookReceptionApproval = BookReceptionApproval.builder()
                .bookIsbn(purchaseOrderApproval.getPurchaseOrderId().getBookIsbn().getIsbn())
                .receptionEmployeeId(null)
                .branchName(branch.getBranchName())
                .bookTitle(purchaseOrderApproval.getPurchaseOrderId().getBookIsbn().getBookTitle())
                .purchaseOrderAmount(purchaseOrderApproval.getPurchaseOrderId().getPurchaseOrderAmount())
                .isReceptionApproved(false)
                .receptionDateAt(null)
                .purchaseOrderApprovalId(purchaseOrderApproval)
                .build();

        BookReceptionApproval newBookReceptionApproval = bookReceptionApprovalRepository.save(bookReceptionApproval);

        ReceptionCreateResponseDto responseDto = ReceptionCreateResponseDto.builder()
                .bookReceptionApprovalId(newBookReceptionApproval.getBookReceptionApprovalId())
                .branchName(newBookReceptionApproval.getBranchName())
                .bookIsbn(newBookReceptionApproval.getBookIsbn())
                .bookTitle(newBookReceptionApproval.getBookTitle())
                .purchaseOrderAmount(newBookReceptionApproval.getPurchaseOrderAmount())
                .build();

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, responseDto) ;
    }

    @Override
    @Transactional
    public ResponseDto<Void> approveReception(Long id, String token) {
        // 1. 로그인한 사용자 정보 추출
        String loginId = jwtProvider.getUsernameFromJwt(jwtProvider.removeBearer(token));
        Employee employee = employeeRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException(ResponseCode.NO_EXIST_USER_ID));

        BookReceptionApproval bookReceptionApproval = bookReceptionApprovalRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("존재 하지 않는 수령 확인 입니다."));
        bookReceptionApproval.setIsReceptionApproved(true);
        bookReceptionApproval.setReceptionEmployeeId(employee);
        bookReceptionApproval.setReceptionDateAt(LocalDateTime.now());

        // 재고 증가 처리
        StockUpdateRequestDto stockUpdateRequestDto = StockUpdateRequestDto.builder()
                .type("IN")
                .employeeId(employee.getEmployeeId())
                .bookIsbn(bookReceptionApproval.getBookIsbn())
                .branchId(bookReceptionApproval.getPurchaseOrderApprovalId().getPurchaseOrderId().getBranchId().getBranchId())
                .amount((long) bookReceptionApproval.getPurchaseOrderAmount())
                .description("입고-수령확인")
                .build();

        // 관리자에게 수령 확인 성공 알림 보내기
        Authority adminAuthority = authorityRepository.findByAuthorityName("ADMIN")
                .orElseThrow(() -> new IllegalArgumentException(ResponseMessageKorean.USER_NOT_FOUND));

            for (Employee admin : employeeRepository.findAll().stream()
                    .filter(emp -> emp.getAuthorityId().equals(adminAuthority))
                    .toList()) {

                alertService.createAlert(AlertCreateRequestDto.builder()
                        .employeeId(admin.getEmployeeId())
                        .alertType("BOOK_RECEIVED_SUCCESS")
                        .alertTargetTable("BOOK_RECEPTION_APPROVALS")
                        .targetPk(bookReceptionApproval.getBookReceptionApprovalId())
                        .message("지점 " + bookReceptionApproval.getBranchName() +
                                "에서 [" + bookReceptionApproval.getBookTitle() + "] 수령 확정 되었습니다.")
                        .build());
            }

        stockService.updateStock(null, stockUpdateRequestDto);




        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS) ;
    }

    @Override
    public ResponseDto<List<ReceptionListResponseDto>> getPendingList(String token) {
        String loginId = jwtProvider.getUsernameFromJwt(jwtProvider.removeBearer(token));
        List<BookReceptionApproval> pendingList = bookReceptionApprovalRepository.findPendingByLoginId(loginId);

        List<ReceptionListResponseDto> result = pendingList.stream()
                .map(r -> ReceptionListResponseDto.builder()
                        .bookReceptionApprovalId(r.getBookReceptionApprovalId())
                        .bookIsbn(r.getBookIsbn())
                        .bookTitle(r.getBookTitle())
                                .branchName(r.getBranchName())
                                .purchaseOrderAmount(r.getPurchaseOrderAmount())
                                .isReceptionApproved(r.getIsReceptionApproved())
                                .receptionDateAt(r.getReceptionDateAt())
                                .receptionEmployeeName(null)
                                .build())
                .toList();
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, result);
    }

    @Override
    public ResponseDto<List<ReceptionListResponseDto>> getManagerConfirmedList(String token) {
        String loginId = jwtProvider.getUsernameFromJwt(jwtProvider.removeBearer(token));
        List<BookReceptionApproval> confirmedList = bookReceptionApprovalRepository.findAllConfirmedByLoginId(loginId);

        List<ReceptionListResponseDto> result = confirmedList.stream()
                .map(r -> ReceptionListResponseDto.builder()
                        .bookReceptionApprovalId(r.getBookReceptionApprovalId())
                        .bookIsbn(r.getBookIsbn())
                        .bookTitle(r.getBookTitle())
                        .branchName(r.getBranchName())
                        .purchaseOrderAmount(r.getPurchaseOrderAmount())
                        .receptionDateAt(r.getReceptionDateAt())
                        .isReceptionApproved(r.getIsReceptionApproved())
                        .receptionEmployeeName(r.getReceptionEmployeeId().getName())
                        .build())
                .toList();
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, result);
    }

    @Override
    public ResponseDto<List<ReceptionListResponseDto>> getAdminConfirmedList(String branchName, String isbn) {
        List<BookReceptionApproval> logs = bookReceptionApprovalRepository.findAllConfirmedLogsWithFilter(
                branchName == null ? null : branchName.trim(),
                isbn == null ? null : isbn.trim()
        );

        List<ReceptionListResponseDto> result = logs.stream()
                .map(r -> ReceptionListResponseDto.builder()
                        .bookReceptionApprovalId(r.getBookReceptionApprovalId())
                        .bookIsbn(r.getBookIsbn())
                        .bookTitle(r.getBookTitle())
                        .branchName(r.getBranchName())
                        .purchaseOrderAmount(r.getPurchaseOrderAmount())
                        .isReceptionApproved(r.getIsReceptionApproved())
                        .receptionDateAt(r.getReceptionDateAt())
                        .receptionEmployeeName(r.getReceptionEmployeeId().getName())
                        .build())
                .toList();
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, result);
    }
}
