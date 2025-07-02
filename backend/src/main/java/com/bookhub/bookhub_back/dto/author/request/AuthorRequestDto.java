package com.bookhub.bookhub_back.dto.author.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class AuthorRequestDto {
    @NotBlank
    private String authorName;
    @NotBlank
    private String authorEmail;
}
