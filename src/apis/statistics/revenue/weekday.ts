// src/apis/statistics/revenue/weekday.ts
import { REVENUE_STATISTICS_WEEKDAY_URL } from "@/apis";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "@/apis/axiosConfig";
import { ResponseDto } from "@/dtos";
import { WeekdayRevenueResponseDto } from "@/dtos/statistics/revenue/revenue.response";
import { AxiosError } from "axios";

export const getWeekdayRevenue = async (
  accessToken: string,
  year: number,
  quarter: number
): Promise<ResponseDto<WeekdayRevenueResponseDto[]>> => {
  try {
    // axiosInstance를 사용해서 baseURL/CORS 등을 한 번에 처리
    const response = await axiosInstance.get<
      ResponseDto<WeekdayRevenueResponseDto[]>
    >(REVENUE_STATISTICS_WEEKDAY_URL, {
      // Authorization 헤더를 붙이고
      ...bearerAuthorization(accessToken),
      // year/quarter 쿼리 파라미터 지정
      params: { year, quarter },
      // 필요한 경우 credentials 포함
      withCredentials: true,
    });

    // 성공 응답 처리
    return responseSuccessHandler(response);
  } catch (error) {
    // 에러 응답 처리
    return responseErrorHandler(
      error as AxiosError<ResponseDto<WeekdayRevenueResponseDto[]>>
    );
  }
};
