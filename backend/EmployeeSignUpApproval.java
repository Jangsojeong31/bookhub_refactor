package com.bookhub.bookhub_back.entity;

import com.bookhub.bookhub_back.common.enums.IsApproved;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "employee_signup_approvals")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class EmployeeSignUpApproval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "approval_id")
    private Long approvalId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employeeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "authorizer_id", nullable = false)
    private Employee authorizerId;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private IsApproved isApproved;

    @Column(name = "applied_at")
    private LocalDateTime appliedAt;

    @Column(name = "updated_at", nullable = false)
    @CreatedDate
    private LocalDateTime updatedAt;

    @Column(name = "denied_reason")
    private String deniedReason;

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}
