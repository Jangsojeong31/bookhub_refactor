package com.bookhub.bookhub_back.controller;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.dto.PageResponseDto;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.location.request.LocationCreateRequestDto;
import com.bookhub.bookhub_back.dto.location.request.LocationUpdateRequestDto;
import com.bookhub.bookhub_back.dto.location.response.LocationCreateResponseDto;
import com.bookhub.bookhub_back.dto.location.response.LocationDetailResponseDto;
import com.bookhub.bookhub_back.dto.location.response.LocationUpdateResponseDto;
import com.bookhub.bookhub_back.service.BookLocationService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
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
    @PostMapping(ApiMappingPattern.MANAGER_API+"/branch/{branchId}/locations")
    public ResponseEntity<ResponseDto<LocationCreateResponseDto>> createLocation(
            @PathVariable Long branchId,
            @Valid @RequestBody LocationCreateRequestDto dto){
        ResponseDto<LocationCreateResponseDto> location = bookLocationService.createLocation(branchId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(location);
    }

    //2)책의 위치 수정
    @PutMapping(ApiMappingPattern.MANAGER_API+"/branch/{branchId}/locations/{locationId}")
    public ResponseEntity<ResponseDto<LocationUpdateResponseDto>> updateLocation(
            @PathVariable Long branchId,
            @PathVariable Long locationId,
            @Valid @RequestBody LocationUpdateRequestDto dto){
        ResponseDto<LocationUpdateResponseDto> changeLocation = bookLocationService.updateLocation(branchId,locationId, dto);
        return ResponseEntity.status(HttpStatus.OK).body(changeLocation);
    }

    //5)위치 삭제하기
    @DeleteMapping(ApiMappingPattern.MANAGER_API+"/branch/{branchId}/locations/{locationId}")
    public ResponseEntity<ResponseDto<Void>> deleteLocation(
            @PathVariable Long branchId,
            @PathVariable Long locationId){
        ResponseDto<Void> responseDto = bookLocationService.deleteLocation(branchId, locationId);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    //------------------------------------------------------------
    //고객 같은 경우에도 책의 위치 조회는 할 수 있어야 함 (통합검색 기능 제공)
    @GetMapping(ApiMappingPattern.COMMON_API+"/locations")
    public ResponseEntity<ResponseDto<PageResponseDto<LocationDetailResponseDto>>> getLocations(
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "10") @Min(1) int size,
            @RequestParam(required = false) String bookTitle,
            @RequestParam(required = false) String isbn,
            @RequestParam(required = false) Long branchId){
        ResponseDto<PageResponseDto<LocationDetailResponseDto>> response
                = bookLocationService.getFilteredLocations(page,size, bookTitle, isbn, branchId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }



//    //3)책을 검색하여 하여 책 리스트 반환
//    @GetMapping(ApiMappingPattern.COMMON_API+"/branch/locations")
//    public ResponseEntity<ResponseDto<List<LocationResponseDto>>> searchBranchBooksByTitle(
//            @RequestParam Long branchId,
//            @RequestParam(required = false, defaultValue = "")  String bookTitle){
//        ResponseDto<List<LocationResponseDto>> books = bookLocationService.searchBranchBooksByTitle(branchId,bookTitle);
//        return ResponseEntity.status(HttpStatus.OK).body(books);
//    }
//
    //4)해당 책을 클릭하여 위치 반환
    @GetMapping(ApiMappingPattern.COMMON_API+"/locations/{locationId}")
    public ResponseEntity<ResponseDto<LocationDetailResponseDto>> getLocation(
            @PathVariable Long locationId){
        ResponseDto<LocationDetailResponseDto> location = bookLocationService.getLocation(locationId);
        return ResponseEntity.status(HttpStatus.OK).body(location);
//    }





}}
