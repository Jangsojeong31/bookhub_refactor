export interface EmployeeListResponseDto {
  employeeNumber: number;
  employeeName: string;
  branchName: string;
  positionName: string;
  authorityName: string;
  status: "EMPLOYED" | "EXITED";
}