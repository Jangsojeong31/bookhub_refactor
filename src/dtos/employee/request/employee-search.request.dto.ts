import { StatusType } from "@/apis/enums/StatusType";

export interface EmployeeSearchRequestDto {
  name: string;
  branchName: string;
  positionName: string;
  authorityName: string;
  status: StatusType;
}