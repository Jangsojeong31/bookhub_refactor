package com.bookhub.bookhub_back.service.impl;

import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessageKorean;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.authority.response.AuthorityListResponseDto;
import com.bookhub.bookhub_back.entity.Authority;
import com.bookhub.bookhub_back.repository.AuthorityRepository;
import com.bookhub.bookhub_back.service.AuthorityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthorityServiceImpl implements AuthorityService {
    private final AuthorityRepository authorityRepository;

    @Override
    public ResponseDto<List<AuthorityListResponseDto>> getAllAuthorities() {
        List<AuthorityListResponseDto> responseDtos = null;
        List<Authority> authorities = null;

        authorities = authorityRepository.findAll();

        responseDtos = authorities.stream()
            .map(authority -> AuthorityListResponseDto.builder()
                .authorityId(authority.getAuthorityId())
                .authorityName(authority.getAuthorityName())
                .build())
            .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, responseDtos);
    }
}
