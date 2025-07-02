package com.bookhub.bookhub_back.controller;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.branch.request.BranchCreateRequestDto;
import com.bookhub.bookhub_back.dto.branch.request.BranchUpdateRequestDto;
import com.bookhub.bookhub_back.dto.branch.response.BranchResponseDto;
import com.bookhub.bookhub_back.service.BranchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiMappingPattern.BASIC_API)
@RequiredArgsConstructor
public class BranchController {
    private final BranchService branchService;

    @PostMapping(ApiMappingPattern.ADMIN_API+"/branches")
    public ResponseEntity<ResponseDto<BranchResponseDto>> createBranch(@Valid @RequestBody BranchCreateRequestDto dto) {
        ResponseDto<BranchResponseDto> responseDto = branchService.createBranch(dto);
        return ResponseDto.toResponseEntity(HttpStatus.CREATED, responseDto);
    }

    @GetMapping("/auth/branches")
    public ResponseEntity<ResponseDto<List<BranchResponseDto>>> getBranchesByLocation(@RequestParam(required = false) String branchLocation) {
        ResponseDto<List<BranchResponseDto>> responseDto = branchService.getBranchesByLocation(branchLocation);
        return ResponseDto.toResponseEntity(HttpStatus.OK, responseDto);
    }

    @GetMapping(ApiMappingPattern.ADMIN_API + "/branches/{branchId}")
    public ResponseEntity<ResponseDto<BranchResponseDto>> getBranchById(@PathVariable Long branchId) {
        ResponseDto<BranchResponseDto> responseDto = branchService.getBranchById(branchId);
        return ResponseDto.toResponseEntity(HttpStatus.OK, responseDto);
    }

    @PutMapping(ApiMappingPattern.ADMIN_API+"/branches/{branchId}")
    public ResponseEntity<ResponseDto<BranchResponseDto>> updateBranch(
        @PathVariable Long branchId,
        @Valid @RequestBody BranchUpdateRequestDto dto
    ) {
        ResponseDto<BranchResponseDto> responseDto = branchService.updateBranch(branchId, dto);
        return ResponseDto.toResponseEntity(HttpStatus.OK, responseDto);
    }
}
