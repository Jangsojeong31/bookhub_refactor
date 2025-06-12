// src/apis/publisher/publisher.ts
import { axiosInstance, responseSuccessHandler, responseErrorHandler, bearerAuthorization } from '@/apis/axiosConfig';
import { AxiosError } from 'axios';
import { ResponseDto } from '@/dtos';
import { PublisherRequestDto } from '@/dtos/publisher/request/publisher.request.dto';
import {
  PublisherResponseDto,
  PublisherListResponseDto,
} from '@/dtos/publisher/response/publisher.response.dto';
import { DELETE_PUBLISHER_URL, GET_ALL_PUBLISHER_URL, POST_PUBLISHER_URL, PUT_PUBLISHER_URL } from '@/apis';




// ✅ 출판사 목록 조회
export const getPublishers = async ( accessToken: string): Promise<ResponseDto<PublisherResponseDto[]>> => {

  try {
    const response = await axiosInstance.get(GET_ALL_PUBLISHER_URL, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// ✅ 출판사 등록
export const createPublisher = async (
  dto: PublisherRequestDto, accessToken: string
): Promise<ResponseDto<PublisherResponseDto>> => {
  try {
    const response = await axiosInstance.post(POST_PUBLISHER_URL, dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// ✅ 출판사 수정
export const updatePublisher = async (
  publisherId: number,
  dto: PublisherRequestDto, accessToken: string
): Promise<ResponseDto<PublisherResponseDto>> => {
  try {
    const response = await axiosInstance.put(PUT_PUBLISHER_URL(publisherId), dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// ✅ 출판사 삭제
export const deletePublisher = async (
  publisherId: number, accessToken: string
): Promise<ResponseDto<null>> => {
  try {
    const response = await axiosInstance.delete(DELETE_PUBLISHER_URL(publisherId), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
