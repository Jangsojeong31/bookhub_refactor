package com.bookhub.bookhub_back.controller;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.reception.request.ReceptionCreateRequestDto;
import com.bookhub.bookhub_back.dto.reception.response.ReceptionCreateResponseDto;
import com.bookhub.bookhub_back.dto.reception.response.ReceptionListResponseDto;
import com.bookhub.bookhub_back.service.BookReceptionApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiMappingPattern.BASIC_API)
@RequiredArgsConstructor
public class BookReceptionApprovalController {
    private final BookReceptionApprovalService bookReceptionApprovalService;

    // 1) 수령 확인 생성
    @PostMapping(ApiMappingPattern.ADMIN_API+"/reception")
    public ResponseEntity<ResponseDto<ReceptionCreateResponseDto>> createReceptionApproval(
            @RequestBody ReceptionCreateRequestDto dto,
            @RequestHeader("Authorization") String token
            ) {
        ResponseDto<ReceptionCreateResponseDto> reception = bookReceptionApprovalService.createReception(dto, token);
        return ResponseEntity.status(HttpStatus.CREATED).body(reception);
    }

    // 2) 수령 확인 (지점 관리자가 확인 버튼 누름)
    @PutMapping(ApiMappingPattern.MANAGER_API+"/reception/approve/{id}")
    public ResponseEntity<ResponseDto<Void>> approveReception(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token
        ) {
        ResponseDto<Void> reception = bookReceptionApprovalService.approveReception(id, token);
        return ResponseEntity.status(HttpStatus.OK).body(reception);
    }

    // 3) 수령 대기 목록 조회(지점 관리자 전용)
    @GetMapping(ApiMappingPattern.MANAGER_API+"/reception/pending")
    public ResponseEntity<ResponseDto<List<ReceptionListResponseDto>>> getPendingReceptions(
            @RequestHeader("Authorization") String token
    ) {
        ResponseDto<List<ReceptionListResponseDto>> reception = bookReceptionApprovalService.getPendingList(token);
        return ResponseEntity.status(HttpStatus.OK).body(reception);
    }

    // 4) 수령 완료 목록 조회(지점 관리자)
    @GetMapping(ApiMappingPattern.MANAGER_API+"/reception/confirmed")
    public ResponseEntity<ResponseDto<List<ReceptionListResponseDto>>> getManagerConfirmedReceptions(
            @RequestHeader("Authorization") String token
    ) {
        ResponseDto<List<ReceptionListResponseDto>> reception = bookReceptionApprovalService.getManagerConfirmedList(token);
        return ResponseEntity.status(HttpStatus.OK).body(reception);
    }

    // 5) 전체 수령 로그 조회 (관리자)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(ApiMappingPattern.ADMIN_API+"/reception/logs")
    public ResponseEntity<ResponseDto<List<ReceptionListResponseDto>>> getAdminConfirmedReceptions(
            @RequestParam(required = false) String branchName,
            @RequestParam(value = "bookIsbn", required = false) String isbn
    ) {
        ResponseDto<List<ReceptionListResponseDto>> reception = bookReceptionApprovalService.getAdminConfirmedList(branchName, isbn);
        return ResponseEntity.status(HttpStatus.OK).body(reception);
    }
}
