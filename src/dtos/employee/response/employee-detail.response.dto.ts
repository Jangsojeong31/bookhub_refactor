export interface EmployeeDetailResponseDto {
  employeeId: number;
  employeeNumber: number;
  employeeName: string;
  branchId: number;
  branchName: string;
  positionId: number;
  positionName: string;
  authorityId: number;
  authorityName: string;
  email: string;
  phoneNumber: string;
  birthDate: Date;
  status: "EMPLOYED" | "EXITED";
  createdAt: Date;
}