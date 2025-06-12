import { ResponseDto } from "@/dtos";
import { SignUpRequestDto } from "@/dtos/auth/request/sign-up.request.dto";
import {
  axiosInstance,
  responseErrorHandler,
  responseSuccessHandler,
} from "../axiosConfig";
import {
  CHECK_LOGIN_ID_DUPLICATE,
  SIGN_IN_URL,
  SIGN_UP_URL,
} from "../constants/khj.constants";
import { AxiosError } from "axios";
import { SignInRequestDto } from "@/dtos/auth/request/sign-in.request.dto";
import SignInResponseDto from "@/dtos/auth/response/sign-in.response.dto";

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

export const signInRequest = async (
  dto: SignInRequestDto
): Promise<ResponseDto<SignInResponseDto>> => {
  try {
    const response = await axiosInstance.post(SIGN_IN_URL, dto);
    return responseSuccessHandler(response)
  } catch(error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}