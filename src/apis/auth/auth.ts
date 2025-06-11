import { ResponseDto } from "@/dtos";
import { SignUpRequestDto } from "@/dtos/auth/request/sign-up.request.dto";
import {
  axiosInstance,
  responseErrorHandler,
  responseSuccessHandler,
} from "../axiosConfig";
import { SIGN_UP_URL } from "../constants/khj.constants";
import { AxiosError } from "axios";

export const signUpRequest = async (
  dto: SignUpRequestDto
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(SIGN_UP_URL, dto);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
