import { StatusType } from "@/apis/enums/StatusType";

export interface EmployeeExitUpdateRequestDto {
  status: StatusType;
  exitReason: string;
}