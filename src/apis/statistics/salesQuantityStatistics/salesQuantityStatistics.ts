import { axiosInstance, bearerAuthorization, responseSuccessHandler, responseErrorHandler } from "@/apis/axiosConfig";
import { GET_BEST_SELLERS_BY_CATEGORY, GET_MONTHLY_BEST_SELLERS, GET_TOP_100_BEST_SELLERS, GET_WEEKLY_BEST_SELLERS, GET_YEARLY_BEST_SELLERS } from "@/apis/constants/jsj.constants";
import { ResponseDto } from "@/dtos";
import { BestSellerResponseDto } from "@/dtos/statistics/salesQuantityStatistics/response/bestSeller.reponse.dto";
import { AxiosError } from "axios";

// 총합 베스트셀러
export const getTop100BestSellers = async(accessToken: string): Promise<ResponseDto<BestSellerResponseDto[]>> => {
  try{
    const response = await axiosInstance.get(GET_TOP_100_BEST_SELLERS, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}

// 주간 베스트셀러
export const getWeeklyBestSellers = async(accessToken: string): Promise<ResponseDto<BestSellerResponseDto[]>> => {
  try{
    const response = await axiosInstance.get(GET_WEEKLY_BEST_SELLERS, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}

// 월간 베스트셀러
export const getMonthlyBestSellers = async(accessToken: string): Promise<ResponseDto<BestSellerResponseDto[]>> => {
  try{
    const response = await axiosInstance.get(GET_MONTHLY_BEST_SELLERS, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}

// 연간 베스트셀러
export const getYearlyBestSellers = async(accessToken: string): Promise<ResponseDto<BestSellerResponseDto[]>> => {
  try{
    const response = await axiosInstance.get(GET_YEARLY_BEST_SELLERS, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}

// 카테고리별 베스트셀러
export const getBestSellersByCategory = async(categoryName: string, accessToken: string): Promise<ResponseDto<BestSellerResponseDto[]>> => {
  try{
    const response = await axiosInstance.get(GET_BEST_SELLERS_BY_CATEGORY(categoryName), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}