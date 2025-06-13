import { ResponseDto } from "@/dtos";
import { SignUpRequestDto } from "@/dtos/auth/request/sign-up.request.dto";
import {
  axiosInstance,
  responseErrorHandler,
  responseSuccessHandler,
} from "../axiosConfig";
import {
  CHECK_LOGIN_ID_DUPLICATE,
  LOGIN_ID_FIND_EMAIL_URL,
  LOGIN_ID_FIND_URL,
  SIGN_IN_URL,
  SIGN_UP_URL,
} from "../constants/khj.constants";
import { AxiosError } from "axios";
import { SignInRequestDto } from "@/dtos/auth/request/sign-in.request.dto";
import { SignInResponseDto } from "@/dtos/auth/response/sign-in.response.dto";
import { LoginIdFindSendEmailRequestDto } from "@/dtos/auth/request/login-id-find-email.request.dto";
import { LoginIdFindResponseDto } from "@/dtos/auth/response/Login-id-find.response.dto";

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
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const loginIdFindSendEmailRequest = async (
  dto: LoginIdFindSendEmailRequestDto
): Promise<ResponseDto<string>> => {
  try {
    const response = await axiosInstance.post(LOGIN_ID_FIND_EMAIL_URL, dto);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const loginIdFindRequest = async (
  token: string
): Promise<ResponseDto<string>> => {
  try {
    const response = await axiosInstance.get(
      LOGIN_ID_FIND_URL + `?token=${token}`
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
