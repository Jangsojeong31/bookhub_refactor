package com.bookhub.bookhub_back.service;

import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.author.request.AuthorCreateRequestDto;
import com.bookhub.bookhub_back.dto.author.request.AuthorRequestDto;
import com.bookhub.bookhub_back.dto.author.response.AuthorResponseDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AuthorService {
    ResponseDto<List<AuthorResponseDto>> createAuthor(@Valid AuthorCreateRequestDto dto);

    ResponseDto<AuthorResponseDto> updateAuthor(Long authorId, AuthorRequestDto dto);

    ResponseDto<Void> deleteAuthor(Long authorId);

    ResponseDto<List<AuthorResponseDto>> getAllAuthorsByName(String authorName);

    ResponseDto<Void> checkDuplicateAuthorEmail(String authorEmail);
}
