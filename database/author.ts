import { ResponseDto } from "@/dtos";
import { AuthorCreateRequestDto } from "@/dtos/author/request/author-create.request.dto";
import { AuthorResponseDto } from "@/dtos/author/response/author.response.dto";

import { AxiosError } from "axios";

import { AuthorRequestDto } from "@/dtos/author/request/author.request.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { CHECK_DUPLICATE_AUTHOR_EMAIL, DELETE_AUTHOR_URL, GET_ALL_AUTHOR_BY_NAME_URL, GET_ALL_AUTHOR_URL, GET_AUTHOR_URL, POST_AUTHOR_URL, PUT_AUTHOR_URL } from "../constants/jsj.constants";


// 저자 등록
export const createAuthor = async (dto: AuthorCreateRequestDto, accessToken: string): Promise<ResponseDto<AuthorResponseDto[]>> => {
  try {
    const response = await axiosInstance.post(POST_AUTHOR_URL, dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 저자 이메일 중복 체크
export const checkDuplicateAuthorEmail = async (authorEmail: string, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.get(CHECK_DUPLICATE_AUTHOR_EMAIL(authorEmail), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 저자 조회 - 전체
export const getAllAuthors = async (accessToken: string): Promise<ResponseDto<AuthorResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_ALL_AUTHOR_URL, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 저자 조회 - 단건
export const getAuthorById = async (authorId: number, accessToken: string): Promise<ResponseDto<AuthorResponseDto>> => {
  try {
    const response = await axiosInstance.get(GET_AUTHOR_URL(authorId), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 저자 조회 - 이름으로
export const getAllAuthorsByName = async (authorName: string, accessToken: string): Promise<ResponseDto<AuthorResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_ALL_AUTHOR_BY_NAME_URL(authorName), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 저자 수정
export const updateAuthor = async (authorId: number, dto: AuthorRequestDto, accessToken: string): Promise<ResponseDto<AuthorResponseDto>> => {
  try {
    const response = await axiosInstance.put(PUT_AUTHOR_URL(authorId), dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 저자 삭제
export const deleteAuthor = async (authorId: number, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(DELETE_AUTHOR_URL(authorId), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}
