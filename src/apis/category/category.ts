import { ResponseDto } from "@/dtos";
import { CategoryCreateRequestDto } from "@/dtos/category/request/category-create.request.dto";
import { CategoryCreateResponseDto } from "@/dtos/category/response/category-create.response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler, bearerAuthorization } from "@/apis/axiosConfig"
import { DELETE_CATEGORY_URL, GET_CATEGORY_TREE_URL, POST_CATEGORY_URL, PUT_CATEGORY_URL} from "../constants/sjw.constants";
import axios, { AxiosError } from "axios";
import { CategoryUpdateResponseDto } from "@/dtos/category/response/category-update.response.dto";
import { CategoryTreeResponseDto } from "@/dtos/category/response/category-tree.response.dto";
import { CategoryUpdateRequestDto } from "@/dtos/category/request/category-update.request.dto";

// 카테고리 등록
export const createCategory = async(
  dto: CategoryCreateRequestDto,
  accessToken: string
): Promise<ResponseDto<CategoryCreateResponseDto>> => {
  try {
    const response = await axiosInstance.post(POST_CATEGORY_URL, dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getRootCategories = async (
  token: string
): Promise<ResponseDto<CategoryTreeResponseDto[]>> => {
  const response = await axiosInstance.get(`/api/v1/admin/categories/roots`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};




// 카테고리 트리 조회
export const getCategoryTree = async (
  type: "DOMESTIC" | "FOREIGN" = "DOMESTIC",
  accessToken: string
): Promise<ResponseDto<CategoryTreeResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(
      GET_CATEGORY_TREE_URL(type),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
// 카테고리 수정
export const updateCategory = async (
  categoryId: number,
  dto: CategoryUpdateRequestDto,
  accessToken: string
): Promise<ResponseDto<CategoryUpdateResponseDto>> => {
  try {
    const response = await axiosInstance.put(PUT_CATEGORY_URL(categoryId), dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// 카테고리 비활성화(삭제 대신)
export const deleteCategory = async (
  categoryId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(DELETE_CATEGORY_URL(categoryId), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
};