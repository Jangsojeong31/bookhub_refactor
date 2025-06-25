import axios from "axios";
import { STOCK_SEARCH_BOOK_URL, STOCK_SEARCH_TITLE_URL, STOCK_SEARCH_BRANCH_URL, UPDATE_STOCK_URL } from "../constants/csy.constants";

export const searchStocksByIsbn = (isbn: string) =>
  axios.get(STOCK_SEARCH_BOOK_URL(isbn));

export const searchStocksByTitle = (title: string) =>
  axios.get(STOCK_SEARCH_TITLE_URL, { params: { bookTitle: title } });

export const searchStocksByBranch = (branchId: number) =>
  axios.get(STOCK_SEARCH_BRANCH_URL(branchId));

export const updateStock = (branchId: number, stockId: number, body: any) =>
  axios.put(UPDATE_STOCK_URL(branchId, stockId), body);

/*import { ResponseDto } from "@/dtos";
import { StockListResponseDto } from "@/dtos/stock/Stock.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { STOCK_SEARCH_BOOK_URL, STOCK_SEARCH_TITLE_URL } from "../constants/csy.constants";
import { error } from "console";

export const stockSearchByBranch = async(
  branchId : number,
  accessToken: string
): Promise<ResponseDto<StockListResponseDto[]>> => {
  try{
    let url = `${STOCK_SEARCH_BOOK_URL}`;
    if(branchId) url+= `branchId=${encodeURIComponent(branchId)}`;

    const response = await axiosInstance.get(
      url,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);

  }catch(err){
    return responseErrorHandler(error as unknown as AxiosError<ResponseDto<null>>);
  }
}

export const stockSearchByBookIsbn = async(
  bookIsbn : string,
  accessToken: string
): Promise<ResponseDto<StockListResponseDto[]>> => {
  try{
    let url = `${STOCK_SEARCH_TITLE_URL}`;
    if(bookIsbn?.trim()) url+= `bookIsbn=${encodeURIComponent(bookIsbn.trim())}`;

    const response = await axiosInstance.get(
      url,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);

  }catch(err){
    return responseErrorHandler(error as unknown as AxiosError<ResponseDto<null>>);
  }
}

export const stockSearchByBookTitle = async(
  bookTitle : string,
  accessToken: string
): Promise<ResponseDto<StockListResponseDto[]>> => {
  try{
    let url = `${STOCK_SEARCH_BOOK_URL}`;
    if(bookTitle?.trim()) url+= `bookTitle=${encodeURIComponent(bookTitle.trim())}`;

    const response = await axiosInstance.get(
      url,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);

  }catch(err){
    return responseErrorHandler(error as unknown as AxiosError<ResponseDto<null>>);
  }
}*/