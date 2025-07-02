package com.bookhub.bookhub_back.dto.location.response;

import com.bookhub.bookhub_back.common.enums.DisplayType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LocationCreateResponseDto {
    @NotBlank
    private String bookTitle;
    @NotBlank
    private String floor;
    @NotBlank
    private String hall;
    @NotBlank
    private String section;
    @NotNull
    private DisplayType type;
}
