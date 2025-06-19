// src/apis/location/location.ts
import {
  axiosInstance,
  responseSuccessHandler,
  responseErrorHandler,
  bearerAuthorization
} from '@/apis/axiosConfig';
import { AxiosError } from 'axios';
import { ResponseDto } from '@/dtos';

// Location API 용 DTO
import {
  
  LocationCreateRequestDto,
  
  LocationUpdateRequestDto,
  
} from '@/dtos/location/location.request.dto';

import{
LocationResponseDto,
  LocationDetailResponseDto,
  LocationCreateResponseDto,
  LocationUpdateResponseDto
}from '@/dtos/location/location.response.dto';


// URL 상수 (예시)
import {
            // '/api/common/branch/{branchId}/locations'
  GET_LOCATION_URL,     // '/api/common/branch/{branchId}/locations/{locationId}'
  POST_LOCATION_URL,           // '/api/manager/branch/{branchId}/locations'
  PUT_LOCATION_URL,            // '/api/manager/branch/{branchId}/locations/{locationId}'
  DELETE_LOCATION_URL,          // '/api/manager/branch/{branchId}/locations/{locationId}'
  GET_ALL_LOCATIONS_URL
} from '@/apis';

export const getLocations = async (
  accessToken: string,
  branchId: number,
  keyword: string
): Promise<ResponseDto<LocationResponseDto[]>> => {
  try {
    const url = `${GET_ALL_LOCATIONS_URL(branchId)}?bookTitle=${encodeURIComponent(keyword)}`;
    const response = await axiosInstance.get(url, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(
      error as AxiosError<ResponseDto<LocationResponseDto[]>>
    );
  }
};

export const getLocationDetail = async (
  accessToken: string,
  branchId: number,
  locationId: number
): Promise<ResponseDto<LocationDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_LOCATION_URL(branchId, locationId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(
      error as AxiosError<ResponseDto<LocationDetailResponseDto>>
    );
  }
};

export const createLocation = async (
  dto: LocationCreateRequestDto,
  accessToken: string,
  branchId: number
): Promise<ResponseDto<LocationCreateResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      POST_LOCATION_URL(branchId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(
      error as AxiosError<ResponseDto<LocationCreateResponseDto>>
    );
  }
};

export const updateLocation = async (
  locationId: number,
  dto: LocationUpdateRequestDto,
  accessToken: string,
  branchId: number
): Promise<ResponseDto<LocationUpdateResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      PUT_LOCATION_URL(branchId, locationId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(
      error as AxiosError<ResponseDto<LocationUpdateResponseDto>>
    );
  }
};

export const deleteLocation = async (
  locationId: number,
  accessToken: string,
  branchId: number
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      DELETE_LOCATION_URL(branchId, locationId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(
      error as AxiosError<ResponseDto<void>>
    );
  }
};
