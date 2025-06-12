import { ResponseDto } from "@/dtos";
import { CategoryCreateRequestDto } from "@/dtos/category/request/category-create.request.dto";
import { CategoryCreateResponseDto } from "@/dtos/category/response/category-create.response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { DELETE_CATEGORY_URL, GET_CATEGORY_TREE_URL, POST_CATEGORY_URL, PUT_CATEGORY_URL} from "../constants/sjw.constants";
import axios, { AxiosError } from "axios";
import { CategoryUpdateResponseDto } from "@/dtos/category/response/category-update.response.dto";
import { CategoryTreeResponseDto } from "@/dtos/category/response/category-tree.response.dto";
import { CategoryUpdateRequestDto } from "@/dtos/category/request/category-update.request.dto";

// 카테고리 등록
export const createCategory = async(
  dto: CategoryCreateRequestDto
): Promise<ResponseDto<CategoryCreateResponseDto>> => {
  try {
    const response = await axiosInstance.post(POST_CATEGORY_URL, dto);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// 카테고리 대분류 조회
export const getRootCategories = async () => {
  const response = await axios.get("/api/v1/categories/roots");
  return response.data;
};


// 카테고리 트리 조회
export const getCategoryTree = async (
  type: "DOMESTIC" | "FOREIGN" = "DOMESTIC"
): Promise<ResponseDto<CategoryTreeResponseDto[]>> => {
  try{
    const response = await axiosInstance.get(GET_CATEGORY_TREE_URL(type));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// 카테고리 수정
export const updateCategory = async (
  categoryId: number,
  dto: CategoryUpdateRequestDto
): Promise<ResponseDto<CategoryUpdateResponseDto>> => {
  try {
    const response = await axiosInstance.put(PUT_CATEGORY_URL(categoryId), dto);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// 카테고리 비활성화(삭제 대신)
export const deleteCategory = async (
  categoryId: number
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(DELETE_CATEGORY_URL(categoryId));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
};