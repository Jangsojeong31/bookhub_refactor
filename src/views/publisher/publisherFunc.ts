import { axiosInstance, responseSuccessHandler, responseErrorHandler } from '@/apis/axiosConfig';
import { AxiosError } from 'axios';
import { ResponseDto } from '@/dtos';
import { PublisherListResponseDto } from '@/dtos/publisher/response/publisher.response.dto';
import { DELETE_PUBLISHER_URL, GET_ALL_PUBLISHER_URL } from '@/apis';




// ✅ 출판사 목록 조회
export const getPublishers = async (): Promise<ResponseDto<PublisherListResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_ALL_PUBLISHER_URL);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// ❌ 출판사 삭제
export const deletePublisher = async (publisherId: number): Promise<ResponseDto<null>> => {
  try {
    const response = await axiosInstance.delete(DELETE_PUBLISHER_URL(publisherId));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
