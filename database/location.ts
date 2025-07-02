// 📁 src/apis/location/location.ts
// -----------------------------------------------------------------------------
import {
  axiosInstance,
  responseSuccessHandler,
  responseErrorHandler,
  bearerAuthorization,
} from "@/apis/axiosConfig";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseDto } from "@/dtos";
import { LocationDetailResponseDto, LocationCreateRequestDto, LocationUpdateRequestDto } from "@/dtos/location/location.dto";
import { GET_LOCATION_URL, POST_LOCATION_URL, PUT_LOCATION_URL, DELETE_LOCATION_URL, GET_FILTERED_LOCATIONS_URL } from "../constants/csy.constants";
import { PageResponseDto } from "@/dtos/page-response.dto";



/**
 * 진열 위치 목록 조회 (페이징 + 검색)
 */
export const getLocations = async (
  accessToken: string | null,
  page: number,
  size: number,
  bookTitle?: string,
  isbn?: string,
  branchId?: number
): Promise<ResponseDto<PageResponseDto<LocationDetailResponseDto>>> => {
  try {
    const response: AxiosResponse<
      ResponseDto<PageResponseDto<LocationDetailResponseDto>>
    > = await axios.get(GET_FILTERED_LOCATIONS_URL, {
      params: { page, size, bookTitle, isbn, branchId },
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(
      error as AxiosError<ResponseDto<PageResponseDto<LocationDetailResponseDto>>>
    );
  }
};

/**
 * 특정 진열 위치 상세 조회
 */
export const getLocationDetail = async (
  accessToken: string,
  branchId: number,
  locationId: number,
): Promise<ResponseDto<LocationDetailResponseDto>> => {
  try {
    const url = `${GET_LOCATION_URL(locationId)}?branchId=${branchId}`;
    const response = await axiosInstance.get(
      url,
      bearerAuthorization(accessToken),
    );
    return responseSuccessHandler<LocationDetailResponseDto>(response);
  } catch (error) {
    return responseErrorHandler(
      error as AxiosError<ResponseDto<LocationDetailResponseDto>>,
    );
  }
};

/**
 * 진열 위치 등록
 */
export const createLocation = async (
  dto: LocationCreateRequestDto,
  accessToken: string,
  branchId: number,
): Promise<ResponseDto<LocationDetailResponseDto>> => {
  try {
    const url = `${POST_LOCATION_URL}?branchId=${branchId}`;
    const response = await axiosInstance.post(
      url,
      dto,
      bearerAuthorization(accessToken),
    );
    return responseSuccessHandler<LocationDetailResponseDto>(response);
  } catch (error) {
    return responseErrorHandler(
      error as AxiosError<ResponseDto<LocationDetailResponseDto>>,
    );
  }
};

/**
 * 진열 위치 수정
 */
export const updateLocation = async (
  locationId: number,
  dto: LocationUpdateRequestDto,
  accessToken: string,
  branchId: number,
): Promise<ResponseDto<LocationDetailResponseDto>> => {
  try {
    const url = `${PUT_LOCATION_URL(locationId)}?branchId=${branchId}`;
    const response = await axiosInstance.put(
      url,
      dto,
      bearerAuthorization(accessToken),
    );
    return responseSuccessHandler<LocationDetailResponseDto>(response);
  } catch (error) {
    return responseErrorHandler(
      error as AxiosError<ResponseDto<LocationDetailResponseDto>>,
    );
  }
};

/**
 * 진열 위치 삭제
 */
export const deleteLocation = async (
  locationId: number,
  accessToken: string,
  branchId: number,
): Promise<ResponseDto<null>> => {
  try {
    const url = `${DELETE_LOCATION_URL(locationId)}?branchId=${branchId}`;
    const response = await axiosInstance.delete(
      url,
      bearerAuthorization(accessToken),
    );
    return responseSuccessHandler<null>(response);
  } catch (error) {
    return responseErrorHandler(
      error as AxiosError<ResponseDto<null>>,
    );
  }
};