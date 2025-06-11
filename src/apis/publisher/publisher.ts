import { ResponseDto } from "@/dtos";
import { PublisherRequestDto } from "@/dtos/publisher/request/publisher.request.dto";
import { PublisherListResponseDto } from "@/dtos/publisher/response/publisher.response.dto,";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { POST_PUBLISHER_URL } from "../constants/csy.constants";

export const createPublisher = async (dto: PublisherRequestDto): Promise<ResponseDto<PublisherListResponseDto>> => {
  try {
    const response = await axiosInstance.post(POST_PUBLISHER_URL, dto);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}