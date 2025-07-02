package com.bookhub.bookhub_back.controller;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.location.request.LocationCreateRequestDto;
import com.bookhub.bookhub_back.dto.location.request.LocationUpdateRequestDto;
import com.bookhub.bookhub_back.dto.location.response.LocationCreateResponseDto;
import com.bookhub.bookhub_back.dto.location.response.LocationDetailResponseDto;
import com.bookhub.bookhub_back.dto.location.response.LocationResponseDto;
import com.bookhub.bookhub_back.dto.location.response.LocationUpdateResponseDto;
import com.bookhub.bookhub_back.service.BookLocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiMappingPattern.BASIC_API)
@RequiredArgsConstructor
public class BookLocationController {
    private final BookLocationService bookLocationService;

    //1)책의 위치 생성
    @PostMapping(ApiMappingPattern.MANAGER_API+"/branch/locations")
    public ResponseEntity<ResponseDto<LocationCreateResponseDto>> createLocation(
            @RequestParam Long branchId,
            @Valid @RequestBody LocationCreateRequestDto dto){
        ResponseDto<LocationCreateResponseDto> location = bookLocationService.createLocation(branchId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(location);
    }

    //2)책의 위치 수정
    @PutMapping(ApiMappingPattern.MANAGER_API+"/branch/locations/{locationId}")
    public ResponseEntity<ResponseDto<LocationUpdateResponseDto>> updateLocation(
            @RequestParam Long branchId,
            @PathVariable Long locationId,
            @Valid @RequestBody LocationUpdateRequestDto dto){
        ResponseDto<LocationUpdateResponseDto> changeLocation = bookLocationService.updateLocation(branchId,locationId, dto);
        return ResponseEntity.status(HttpStatus.OK).body(changeLocation);
    }

    //3)책을 검색하여 하여 책 리스트 반환
    @GetMapping(ApiMappingPattern.COMMON_API+"/branch/locations")
    public ResponseEntity<ResponseDto<List<LocationResponseDto>>> searchBranchBooksByTitle(
            @RequestParam Long branchId,
            @RequestParam(required = false, defaultValue = "")  String bookTitle){
        ResponseDto<List<LocationResponseDto>> books = bookLocationService.searchBranchBooksByTitle(branchId,bookTitle);
        return ResponseEntity.status(HttpStatus.OK).body(books);
    }

    //4)해당 책을 클릭하여 위치 반환
    @GetMapping(ApiMappingPattern.COMMON_API+"/branch/locations/{locationId}")
    public ResponseEntity<ResponseDto<LocationDetailResponseDto>> getLocation(
            @RequestParam Long branchId,
            @PathVariable Long locationId){
        ResponseDto<LocationDetailResponseDto> location = bookLocationService.getLocation(branchId,locationId);
        return ResponseEntity.status(HttpStatus.OK).body(location);
    }

    //5)위치 삭제하기
    @DeleteMapping(ApiMappingPattern.MANAGER_API+"/branch/locations/{locationId}")
    public ResponseEntity<ResponseDto<Void>> deleteLocation(
            @RequestParam Long branchId,
            @PathVariable Long locationId){
        ResponseDto<Void> responseDto = bookLocationService.deleteLocation(branchId, locationId);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }



}
