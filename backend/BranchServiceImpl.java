package com.bookhub.bookhub_back.service.impl;

import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessageKorean;
import com.bookhub.bookhub_back.common.util.DateUtils;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.branch.request.BranchCreateRequestDto;
import com.bookhub.bookhub_back.dto.branch.request.BranchUpdateRequestDto;
import com.bookhub.bookhub_back.dto.branch.response.BranchResponseDto;
import com.bookhub.bookhub_back.entity.Branch;
import com.bookhub.bookhub_back.repository.BranchRepository;
import com.bookhub.bookhub_back.service.BranchService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {
    private final BranchRepository branchRepository;

    @Override
    public ResponseDto<BranchResponseDto> createBranch(BranchCreateRequestDto dto) {
        BranchResponseDto responseDto = null;
        Branch branch = null;

        if (branchRepository.existsByBranchName(dto.getBranchName())) {
            throw new EntityNotFoundException();
        }

        branch = Branch.builder()
            .branchName(dto.getBranchName())
            .branchLocation(dto.getBranchLocation())
            .build();

        Branch newBranch = branchRepository.save(branch);

        responseDto = BranchResponseDto.builder()
            .branchName(newBranch.getBranchName())
            .branchLocation(newBranch.getBranchLocation())
            .createdAt(DateUtils.format(branch.getCreatedAt()))
            .updatedAt(DateUtils.format(branch.getUpdatedAt()))
            .build();

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, responseDto);
    }

    @Override
    public ResponseDto<List<BranchResponseDto>> getBranchesByLocation(String branchLocation) {
        List<BranchResponseDto> responseDtos = null;
        List<Branch> branches = null;

        if (branchLocation.isBlank()) {
            branches = branchRepository.findAll();
        } else {
            branches = branchRepository.findByBranchLocationContaining(branchLocation);
        }

        responseDtos = branches.stream()
            .map(branch -> BranchResponseDto.builder()
                .branchId(branch.getBranchId())
                .branchName(branch.getBranchName())
                .branchLocation(branch.getBranchLocation())
                .createdAt(DateUtils.format(branch.getCreatedAt()))
                .updatedAt(DateUtils.format(branch.getUpdatedAt()))
                .build())
            .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, responseDtos);
    }

    @Override
    public ResponseDto<BranchResponseDto> getBranchById(Long branchId) {
        BranchResponseDto responseDto = null;
        Branch branch = null;

        branch = branchRepository.findById(branchId)
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 지점 아이디입니다."));

        responseDto = BranchResponseDto.builder()
            .branchId(branch.getBranchId())
            .branchName(branch.getBranchName())
            .branchLocation(branch.getBranchLocation())
            .createdAt(DateUtils.format(branch.getCreatedAt()))
            .updatedAt(DateUtils.format(branch.getUpdatedAt()))
            .build();

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, responseDto);
    }

    @Override
    public ResponseDto<BranchResponseDto> updateBranch(Long branchId, BranchUpdateRequestDto dto) {
        BranchResponseDto responseDto = null;

        Branch branch = branchRepository.findById(branchId)
            .orElseThrow(IllegalArgumentException::new);

        branch.setBranchName(dto.getBranchName());
        branch.setBranchLocation(dto.getBranchLocation());


        Branch updateBranch = branchRepository.save(branch);

        responseDto = BranchResponseDto.builder()
            .branchName(updateBranch.getBranchName())
            .branchLocation(updateBranch.getBranchLocation())
            .build();

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, responseDto);
    }
}
