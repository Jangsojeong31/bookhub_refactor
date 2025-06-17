import { ResponseDto } from "@/dtos";
import { EmployeeListResponseDto } from "@/dtos/employee/response/employee-list.response.dto";
import {
  axiosInstance,
  bearerAuthorization,
  responseErrorHandler,
  responseSuccessHandler,
} from "../axiosConfig";
import {
  GET_ALL_EMPLOYEE_URL,
  GET_EMPLOYEE_SIGN_UP_APRROVALS_URL,
  GET_EMPLOYEE_URL,
  PUT_EMPLOYEE_APPROVE_URL,
} from "../constants/khj.constants";
import { AxiosError } from "axios";
import { EmployeeSignUpApprovalRequestDto } from "@/dtos/employee/request/employee-sign-up-Approval.request.dto";
import { EmployeeDetailResponseDto } from "@/dtos/employee/response/employee-detail.response.dto";
import { access } from "fs";

interface SearchEmployeeParams {
  name?: string;
  branchName?: string;
  positionName?: string;
  authorityName?: string;
  status?: string;
}

export const employeeResquest = async (
  params: SearchEmployeeParams,
  accessToken: string
): Promise<ResponseDto<EmployeeListResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_ALL_EMPLOYEE_URL, {
      params,
      ...bearerAuthorization(accessToken),
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const employeeDetailResquest = async (
  employeeId: number,
  accessToken: string
): Promise<ResponseDto<EmployeeDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(GET_EMPLOYEE_URL(employeeId), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const employeeSignUpApprovalRequest = async (
  employeeId: number,
  dto: EmployeeSignUpApprovalRequestDto,
  loginId: string,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(
      PUT_EMPLOYEE_APPROVE_URL(employeeId),
      { loginId, dto, ...bearerAuthorization(accessToken) }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
