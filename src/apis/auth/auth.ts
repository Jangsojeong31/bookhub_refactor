import { ResponseDto } from "@/dtos";
import { SignUpRequestDto } from "@/dtos/auth/request/sign-up.request.dto";
import {
  axiosInstance,
  responseErrorHandler,
  responseSuccessHandler,
} from "../axiosConfig";
import {
  CHECK_LOGIN_ID_DUPLICATE,
  SIGN_UP_URL,
} from "../constants/khj.constants";
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

export const checkLoginIdDuplicate = async (
  loginId: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.get(
      CHECK_LOGIN_ID_DUPLICATE + `?loginId=${loginId}`
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
