package com.bookhub.bookhub_back.service;

import com.bookhub.bookhub_back.dto.PageResponseDto;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.location.request.LocationCreateRequestDto;
import com.bookhub.bookhub_back.dto.location.request.LocationUpdateRequestDto;
import com.bookhub.bookhub_back.dto.location.response.LocationCreateResponseDto;
import com.bookhub.bookhub_back.dto.location.response.LocationDetailResponseDto;
import com.bookhub.bookhub_back.dto.location.response.LocationUpdateResponseDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;

import java.util.List;

public interface BookLocationService {

    //1)책의 위치 생성
    ResponseDto<LocationCreateResponseDto> createLocation(Long branchId, @Valid LocationCreateRequestDto dto);

    //2)책의 위치 수정
    ResponseDto<LocationUpdateResponseDto> updateLocation(Long branchId, Long locationId, @Valid LocationUpdateRequestDto dto);

    //3)책의 위치 삭제
    ResponseDto<Void> deleteLocation(Long branchId, Long locationId);

    //4)책의 위치 통합검색
    ResponseDto<PageResponseDto<LocationDetailResponseDto>> getFilteredLocations(
            @Min(0) int page, @Min(1) int size,
            String bookTitle, String isbn,
            Long branchId);

    //5)해당 책을 클릭하여 위치 반환
    ResponseDto<LocationDetailResponseDto> getLocation(Long locationId);


}
