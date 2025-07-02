package com.bookhub.bookhub_back.dto.alert.response;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlertResponseDto {
    private Long alertId;
    private String alertType;
    private String message;
    private String alertTargetTable;
    private Long targetPk;
    private String targetIsbn;
    private Boolean isRead;
    private LocalDate createdAt;
}
