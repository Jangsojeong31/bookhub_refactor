import { ResponseDto } from "@/dtos";
import { AuthorCreateRequestDto } from "@/dtos/author/request/author-create.request.dto";
import { AuthorResponseDto } from "@/dtos/author/response/author.response.dto";

import { AxiosError } from "axios";

import { AuthorRequestDto } from "@/dtos/author/request/author.request.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { DELETE_AUTHOR_URL, GET_ALL_AUTHOR_BY_NAME_URL, GET_ALL_AUTHOR_URL, GET_AUTHOR_URL, POST_AUTHOR_URL, PUT_AUTHOR_URL } from "../constants/jsj.constants";


// 저자 등록
export const createAuthor = async (dto: AuthorCreateRequestDto): Promise<ResponseDto<AuthorResponseDto[]>> => {
  try {
    const response = await axiosInstance.post(POST_AUTHOR_URL, dto);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 저자 조회 - 전체
export const getAllAuthors = async (): Promise<ResponseDto<AuthorResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_ALL_AUTHOR_URL);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 저자 조회 - 단건
export const getAuthorById = async (authorId: number): Promise<ResponseDto<AuthorResponseDto>> => {
  try {
    const response = await axiosInstance.get(GET_AUTHOR_URL(authorId));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 저자 조회 - 이름으로
export const getAllAuthorsByName = async (authorName: string): Promise<ResponseDto<AuthorResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_ALL_AUTHOR_BY_NAME_URL(authorName));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 저자 수정
export const updateAuthor = async (authorId: number, dto: AuthorRequestDto): Promise<ResponseDto<AuthorResponseDto>> => {
  try {
    const response = await axiosInstance.put(PUT_AUTHOR_URL(authorId), dto);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 저자 삭제
export const deleteAuthor = async (authorId: number): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(DELETE_AUTHOR_URL(authorId));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}
