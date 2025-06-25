

import { ResponseDto } from "@/dtos"
import { DELETE_STOCK_URL, UPDATE_STOCK_URL } from "../constants/csy.constants"
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig"
import { AxiosError } from "axios";
import { StockUpdateRequestDto } from "@/dtos/stock/Stock.request.dto";

//재고를 업데이트 하는 기능
export const UpdateStock = async(
  stockId : number,
  dto: StockUpdateRequestDto,
  accessToken : string
): Promise<ResponseDto<null>> => {
  try{
    const response = await axiosInstance.put(
      UPDATE_STOCK_URL(stockId), dto, bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto<null>>);
  }
}

export const deletePolicy = async(
  stockId : number,
  accessToken: string
): Promise<ResponseDto<null>> => {
  try{
    const response = await axiosInstance.delete(
      DELETE_STOCK_URL(stockId), bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto<null>>);
  }
};

