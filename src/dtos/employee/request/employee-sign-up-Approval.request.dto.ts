export interface EmployeeSignUpApprovalRequestDto {
  status: IsApproved;
  deniedReason: string;
}

export interface IsApproved {
  PENDING: "PENDING"
  APPROVED: "APPROVED";
  DENIED: "DENIED";
}
