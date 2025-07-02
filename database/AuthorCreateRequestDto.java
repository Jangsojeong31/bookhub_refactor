package com.bookhub.bookhub_back.dto.author.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

import java.util.List;

@Getter
public class AuthorCreateRequestDto {
    @NotEmpty
    private List<AuthorRequestDto> authors;
}
