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
  GET_EMPLOYEE_URL,
} from "../constants/khj.constants";
import { AxiosError } from "axios";

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
