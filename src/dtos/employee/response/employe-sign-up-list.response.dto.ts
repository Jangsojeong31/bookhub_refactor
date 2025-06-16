import { IsApproved } from "../request/employee-sign-up-Approval.request.dto";

export interface EmployeeSignUpApprovalResponseDto {
  employeeNumber: string;
  employeeName: string;
  branchName: string;
  phoneNumber: string;
  appliedAt: Date;
  status: IsApproved;
}
