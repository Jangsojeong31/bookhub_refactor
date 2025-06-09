package com.bookhub.bookhub_back.service;

import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.branch.request.BranchCreateRequestDto;
import com.bookhub.bookhub_back.dto.branch.request.BranchUpdateRequestDto;
import com.bookhub.bookhub_back.dto.branch.response.BranchResponseDto;
import jakarta.validation.Valid;

import java.util.List;

public interface BranchService {
    ResponseDto<BranchResponseDto> createBranch(@Valid BranchCreateRequestDto dto);

    ResponseDto<List<BranchResponseDto>> getBranchesByLocation(String branchLocation);

    ResponseDto<BranchResponseDto> updateBranch(Long branchId, @Valid BranchUpdateRequestDto dto);

    ResponseDto<Void> deleteBranch(Long branchId);
}
