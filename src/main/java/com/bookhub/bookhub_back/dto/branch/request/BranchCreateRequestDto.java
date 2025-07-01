package com.bookhub.bookhub_back.dto.branch.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BranchCreateRequestDto {
    @NotBlank(message = "지점 명을 입력하세요")
    private String branchName;

    @NotBlank(message = "지점 위치를 입력하세요")
    private String branchLocation;
}
