package com.bookhub.bookhub_back.dto.branch.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BranchCreateRequestDto {
    @NotNull
    private String branchName;

    @NotNull
    private String branchLocation;
}
