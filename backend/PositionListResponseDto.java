package com.bookhub.bookhub_back.dto.position.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PositionListResponseDto {
    private Long positionId;
    private String positionName;
}

