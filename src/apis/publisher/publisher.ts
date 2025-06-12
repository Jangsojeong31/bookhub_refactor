// src/apis/publisher/publisher.ts
import { axiosInstance, responseSuccessHandler, responseErrorHandler } from '@/apis/axiosConfig';
import { AxiosError } from 'axios';
import { ResponseDto } from '@/dtos';
import { PublisherRequestDto } from '@/dtos/publisher/request/publisher.request.dto';
import {
  PublisherResponseDto,
  PublisherListResponseDto,
} from '@/dtos/publisher/response/publisher.response.dto';

const BASE_URL = '/api/publishers';

// ✅ 출판사 목록 조회
export const getPublishers = async (): Promise<ResponseDto<PublisherResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(BASE_URL);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// ✅ 출판사 등록
export const createPublisher = async (
  dto: PublisherRequestDto
): Promise<ResponseDto<PublisherResponseDto>> => {
  try {
    const response = await axiosInstance.post(BASE_URL, dto);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// ✅ 출판사 수정
export const updatePublisher = async (
  publisherId: number,
  dto: PublisherRequestDto
): Promise<ResponseDto<PublisherResponseDto>> => {
  try {
    const response = await axiosInstance.put(`${BASE_URL}/${publisherId}`, dto);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// ✅ 출판사 삭제
export const deletePublisher = async (
  publisherId: number
): Promise<ResponseDto<null>> => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/${publisherId}`);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
