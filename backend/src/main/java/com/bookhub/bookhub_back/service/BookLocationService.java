package com.bookhub.bookhub_back.service;

import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.location.request.LocationCreateRequestDto;
import com.bookhub.bookhub_back.dto.location.request.LocationUpdateRequestDto;
import com.bookhub.bookhub_back.dto.location.response.LocationCreateResponseDto;
import com.bookhub.bookhub_back.dto.location.response.LocationDetailResponseDto;
import com.bookhub.bookhub_back.dto.location.response.LocationResponseDto;
import com.bookhub.bookhub_back.dto.location.response.LocationUpdateResponseDto;
import jakarta.validation.Valid;

import java.util.List;

public interface BookLocationService {

    //1)책의 위치 생성
    ResponseDto<LocationCreateResponseDto> createLocation(Long branchId, @Valid LocationCreateRequestDto dto);

    //2)책의 위치 수정
    ResponseDto<LocationUpdateResponseDto> updateLocation(Long branchId, Long locationId, @Valid LocationUpdateRequestDto dto);

    //3)해당 지점의 책을 제목으로 검색
    ResponseDto<List<LocationResponseDto>> searchBranchBooksByTitle(Long branchId, String bookTitle);

    //4)해당 책을 클릭하여 위치 반환
    ResponseDto<LocationDetailResponseDto> getLocation(Long branchId, Long locationId);

    ResponseDto<Void> deleteLocation(Long branchId, Long locationId);
}
