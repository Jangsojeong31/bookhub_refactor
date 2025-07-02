package com.bookhub.bookhub_back.dto.branch.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BranchUpdateRequestDto {
    private String branchName;
    private String branchLocation;
}
