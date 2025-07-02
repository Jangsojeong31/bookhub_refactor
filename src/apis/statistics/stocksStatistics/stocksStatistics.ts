import {
  axiosInstance,
  bearerAuthorization,
  responseErrorHandler,
  responseSuccessHandler,
} from "@/apis/axiosConfig";
import {
  STOCK_STATISTICS_BRANCH_URL,
  STOCK_STATISTICS_CATEGORY_URL,
  STOCK_STATISTICS_TIME_URL,
  STOCK_STATISTICS_ZERO_URL,
} from "@/apis/constants/csy.constants";
import { ResponseDto } from "@/dtos";
import { BranchStockBarChartRequestDto } from "@/dtos/statistics/StocksStatistics/request/branchStockBarChart.request.dto";
import { CategoryStockRequestDto } from "@/dtos/statistics/StocksStatistics/request/categoryStock.request.dto";
import { TimeStockChartRequestDto } from "@/dtos/statistics/StocksStatistics/request/timeStockChart.request.dto";
import { BranchStockBarChartResponseDto } from "@/dtos/statistics/StocksStatistics/response/branchStockBarChart.response.dto";
import { CategoryStockResponseDto } from "@/dtos/statistics/StocksStatistics/response/categoryStock.response.dto";
import { TimeStockChartResponseDto } from "@/dtos/statistics/StocksStatistics/response/timestockchart.response.dto";
import { ZeroStockResponseDto } from "@/dtos/statistics/StocksStatistics/response/zeroStock.response.dto";
import { AxiosError } from "axios";

export const branchStockBarChartRequest = async (
  params: BranchStockBarChartRequestDto,
  accessToken: string
): Promise<ResponseDto<BranchStockBarChartResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(STOCK_STATISTICS_BRANCH_URL, {
      params,
      ...bearerAuthorization(accessToken),
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const categoryStockRequest = async (
  params: CategoryStockRequestDto,
  accessToken: string
): Promise<ResponseDto<CategoryStockResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(STOCK_STATISTICS_CATEGORY_URL, {
      params,
      ...bearerAuthorization(accessToken),
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const zeroStockRequest = async (
  accessToken: string
): Promise<ResponseDto<ZeroStockResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(
      STOCK_STATISTICS_ZERO_URL,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const timeStockChartrequest = async (
  params: TimeStockChartRequestDto,
  accessToken: string
): Promise<ResponseDto<TimeStockChartResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(STOCK_STATISTICS_TIME_URL, {
      params,
      ...bearerAuthorization(accessToken),
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
