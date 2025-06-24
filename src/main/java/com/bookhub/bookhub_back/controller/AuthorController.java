package com.bookhub.bookhub_back.controller;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.author.request.AuthorCreateRequestDto;
import com.bookhub.bookhub_back.dto.author.request.AuthorRequestDto;
import com.bookhub.bookhub_back.dto.author.response.AuthorResponseDto;
import com.bookhub.bookhub_back.service.AuthorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiMappingPattern.BASIC_API + ApiMappingPattern.ADMIN_API + "/authors")
@RequiredArgsConstructor
public class AuthorController {
    private final AuthorService authorService;

    // 작가 추가 시 이메일 중복 점검
    @GetMapping("/{authorEmail}")
    public ResponseEntity<ResponseDto<Void>> checkDuplicateAuthorEmail(
            @PathVariable String authorEmail
    ) {
        authorService.checkDuplicateAuthorEmail(authorEmail);
        return ResponseEntity.noContent().build();
    }

    // 작가 등록
    @PostMapping
    public ResponseEntity<ResponseDto<List<AuthorResponseDto>>> createAuthor(
            @Valid @RequestBody AuthorCreateRequestDto dto
    ) {
        ResponseDto<List<AuthorResponseDto>> response = authorService.createAuthor(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 작가 이름으로 조회 (동명이인까지 조회)
    @GetMapping("/author-name/{authorName}")
    public ResponseEntity<ResponseDto<List<AuthorResponseDto>>> getAllAuthorsByName(
            @PathVariable String authorName
    ) {
        ResponseDto<List<AuthorResponseDto>> response = authorService.getAllAuthorsByName(authorName);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 작가 수정
    @PutMapping("/{authorId}")
    public ResponseEntity<ResponseDto<AuthorResponseDto>> updateAuthor(
            @PathVariable Long authorId,
            @Valid @RequestBody AuthorRequestDto dto
    ) {
        ResponseDto<AuthorResponseDto> response = authorService.updateAuthor(authorId, dto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 작가 삭제
    @DeleteMapping("/{authorId}")
    public ResponseEntity<ResponseDto<Void>> deleteAuthor(
            @PathVariable Long authorId
    ) {
        ResponseDto<Void> response = authorService.deleteAuthor(authorId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
