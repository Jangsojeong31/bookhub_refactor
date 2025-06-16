// src/apis/publisher/publisher.ts
import {
  axiosInstance,
  responseSuccessHandler,
  responseErrorHandler,
  bearerAuthorization
} from '@/apis/axiosConfig';
import { AxiosError } from 'axios';
import { ResponseDto } from '@/dtos';
import { PublisherResponseDto } from '@/dtos/publisher/response/publisher.response.dto';
import { PageResponseDto } from '@/dtos/page-response.dto';
import {
  GET_ALL_PUBLISHER_URL,
  POST_PUBLISHER_URL,
  PUT_PUBLISHER_URL,
  DELETE_PUBLISHER_URL
} from '@/apis';

/**
 * 페이징 조회 및 키워드 검색 통합 API
 * @param accessToken 인증 토큰
 * @param page 페이지 번호 (0부터 시작)
 * @param size 페이지 크기
 * @param keyword 검색어 (미입력 시 페이징 조회만 수행)
 */
export const getPublishers = async (
  accessToken: string,
  page: number,
  size: number,
  keyword?: string
): Promise<
  ResponseDto<
    PageResponseDto<PublisherResponseDto> | PublisherResponseDto[]
  >
> => {
  try {
    let url = `${GET_ALL_PUBLISHER_URL}?page=${page}&size=${size}`;
    if (keyword && keyword.trim() !== '') {
      url += `&keyword=${encodeURIComponent(keyword.trim())}`;
    }
    const response = await axiosInstance.get(
      url,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(
      error as AxiosError<
        ResponseDto<
          PageResponseDto<PublisherResponseDto> | PublisherResponseDto[]
        >
      >
    );
  }
};

/**
 * 단일 출판사 생성
 */
export const createPublisher = async (
  dto: { publisherName: string },
  accessToken: string
): Promise<ResponseDto<PublisherResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      POST_PUBLISHER_URL,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(
      error as AxiosError<ResponseDto<PublisherResponseDto>>
    );
  }
};

/**
 * 출판사 정보 수정
 */
export const updatePublisher = async (
  publisherId: number,
  dto: { publisherName: string },
  accessToken: string
): Promise<ResponseDto<PublisherResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      PUT_PUBLISHER_URL(publisherId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(
      error as AxiosError<ResponseDto<PublisherResponseDto>>
    );
  }
};

/**
 * 출판사 삭제
 */
export const deletePublisher = async (
  publisherId: number,
  accessToken: string
): Promise<ResponseDto<null>> => {
  try {
    const response = await axiosInstance.delete(
      DELETE_PUBLISHER_URL(publisherId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(
      error as AxiosError<ResponseDto<null>>
    );
  }
};

