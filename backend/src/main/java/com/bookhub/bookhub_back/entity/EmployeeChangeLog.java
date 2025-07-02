package com.bookhub.bookhub_back.entity;

import com.bookhub.bookhub_back.common.enums.ChangeType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "employee_change_logs")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class EmployeeChangeLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long logId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employeeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "authorizer_id", nullable = false)
    private Employee authorizerId;

    @Column(name = "change_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ChangeType changeType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "previous_authority_id")
    private Authority previousAuthorityId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "previous_position_id")
    private Position previousPositionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "previous_branch_id")
    private Branch previousBranchId;

    @Column(name = "changed_at")
    private LocalDateTime changedAt;

    @PrePersist
    public void prePersist() {
        this.changedAt = LocalDateTime.now();
    }
}
