import { ResponseDto } from "@/dtos";
import { BranchSearchResponseDto } from "@/dtos/branch/response/branch-search.respnse.dto";
import {
  axiosInstance,
  bearerAuthorization,
  responseErrorHandler,
  responseSuccessHandler,
} from "../axiosConfig";
import { GET_BRANCH_URL } from "../constants/khj.constants";
import { AxiosError } from "axios";

interface searchParams {
  branchLocation: string;
}

export const branchSearchRequest = async (
  params: searchParams,
  accessToken: string
): Promise<ResponseDto<BranchSearchResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_BRANCH_URL, {
      params,
      ...bearerAuthorization(accessToken),
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
