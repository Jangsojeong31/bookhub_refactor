package com.bookhub.bookhub_back.dto.authority.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthorityListResponseDto {
    private Long authorityId;
    private String authorityName;
}
