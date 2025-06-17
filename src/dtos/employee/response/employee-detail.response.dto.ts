import { IsApproved } from "../request/employee-sign-up-Approval.request.dto";

export interface EmployeeDetailResponseDto {
  employeeId: number;
  employeeNumber: number;
  employeeName: string;
  branchName: string;
  positionName: string;
  authorityName: string;
  email: string;
  phoneNumber: string;
  birthDate: Date;
  status: "EMPLOYED" | "EXITED";
  createdAt: Date;
}