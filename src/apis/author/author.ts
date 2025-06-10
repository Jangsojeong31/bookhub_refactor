import { ResponseDto } from "@/dtos";
import { AuthorCreateRequestDto } from "@/dtos/author/request/author-create.request.dto";
import { AuthorResponseDto } from "@/dtos/author/response/author.response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { POST_AUTHOR_URL } from "../constants/jsj.constants";

// 저자 등록
export const createAuthor = async (dto: AuthorCreateRequestDto): Promise<ResponseDto<AuthorResponseDto>> => {
  try {
    const response = await axiosInstance.post(POST_AUTHOR_URL, dto);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}