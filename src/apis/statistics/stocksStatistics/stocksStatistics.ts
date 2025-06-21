import {
  axiosInstance,
  bearerAuthorization,
  responseErrorHandler,
  responseSuccessHandler,
} from "@/apis/axiosConfig";
import { STOCK_STATISTICS_BRANCH_URL } from "@/apis/constants/csy.constants";
import { ResponseDto } from "@/dtos";
import { BranchStockBarChartResponseDto } from "@/dtos/statistics/StocksStatistics/response/branchStockBarChart.response.dto";
import { AxiosError } from "axios";

interface searchParams {
  year: number;
  month: number;
}

export const branchStockBarChartRequest = async (
  params: searchParams,
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
