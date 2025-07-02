package com.bookhub.bookhub_back.service.impl;

import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessage;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.location.request.LocationCreateRequestDto;
import com.bookhub.bookhub_back.dto.location.request.LocationUpdateRequestDto;
import com.bookhub.bookhub_back.dto.location.response.LocationCreateResponseDto;
import com.bookhub.bookhub_back.dto.location.response.LocationDetailResponseDto;
import com.bookhub.bookhub_back.dto.location.response.LocationResponseDto;
import com.bookhub.bookhub_back.dto.location.response.LocationUpdateResponseDto;
import com.bookhub.bookhub_back.entity.BookDisplayLocation;
import com.bookhub.bookhub_back.entity.Book;
import com.bookhub.bookhub_back.entity.Branch;
import com.bookhub.bookhub_back.repository.BookDisplayLocationRepository;
import com.bookhub.bookhub_back.repository.BookRepository;
import com.bookhub.bookhub_back.repository.BranchRepository;
import com.bookhub.bookhub_back.service.BookLocationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookLocationServiceImpl implements BookLocationService {

    private final BranchRepository branchRepository;
    private final BookRepository bookRepository;
    private final BookDisplayLocationRepository bookLocationRepository;

    //1)책의 위치 생성
    @Override
    public ResponseDto<LocationCreateResponseDto> createLocation(Long branchId, LocationCreateRequestDto dto) {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new EntityNotFoundException(ResponseCode.NO_EXIST_ID));

        Book book = bookRepository.findByIsbn(dto.getBookIsbn())
                .orElseThrow(() -> new EntityNotFoundException(ResponseCode.NO_EXIST_ID));

        BookDisplayLocation newLocation = BookDisplayLocation.builder()
                .branch(branch)
                .book(book)
                .floor(dto.getFloor())
                .hall(dto.getHall())
                .section(dto.getSection())
                .displayType(dto.getDisplayType())
                .note(dto.getNote())
                .build();

        BookDisplayLocation saved = bookLocationRepository.save(newLocation);

        LocationCreateResponseDto responseDto = null;
        responseDto = LocationCreateResponseDto.builder()
                .bookTitle(saved.getBook().getBookTitle())
                .floor(saved.getFloor())
                .hall(saved.getHall())
                .section(saved.getSection())
                .type(saved.getDisplayType())
                .build();

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDto);
    }


    //2)책의 위치 수정
    @Override
    public ResponseDto<LocationUpdateResponseDto> updateLocation(Long branchId, Long locationId, LocationUpdateRequestDto dto) {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new EntityNotFoundException(ResponseCode.NO_EXIST_ID));

        BookDisplayLocation location = bookLocationRepository.findById(locationId)
                .orElseThrow(() -> new EntityNotFoundException(ResponseCode.NO_EXIST_ID));

        if(dto.getFloor() != null) location.setFloor(dto.getFloor());
        if(dto.getHall() != null) location.setHall(dto.getHall());
        if(dto.getSection() != null) location.setSection(dto.getSection());
        if(dto.getDisplayType() != null) location.setDisplayType(dto.getDisplayType());
        if(dto.getNote() != null) location.setNote(dto.getNote());

        BookDisplayLocation updatedLocation = bookLocationRepository.save(location);

        LocationUpdateResponseDto responseDto = null;
        responseDto = LocationUpdateResponseDto.builder()
                .bookTitle(updatedLocation.getBook().getBookTitle())
                .floor(updatedLocation.getFloor())
                .hall(updatedLocation.getHall())
                .section(updatedLocation.getSection())
                .type(updatedLocation.getDisplayType())
                .build();

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDto);
    }
    //3)책을 검색하여 하여 책 리스트 반환
    @Override
    @Transactional(readOnly = true)
    public ResponseDto<List<LocationResponseDto>> searchBranchBooksByTitle(Long branchId, String bookTitle) {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new EntityNotFoundException(ResponseCode.NO_EXIST_ID + ResponseMessage.NO_EXIST_ID));

        List<Book> books = bookRepository.searchAllByKeyword(bookTitle);
        if (books.isEmpty()) {
            throw new EntityNotFoundException(ResponseCode.NO_EXIST_ID + ResponseMessage.NO_EXIST_ID);
        }

        List<BookDisplayLocation> locations = bookLocationRepository.findByBranchAndBooks(branch, books);
        if (locations.isEmpty()) {
            throw new EntityNotFoundException(ResponseCode.NO_EXIST_ID + ": 해당 지점에 해당 책들이 진열되어 있지 않습니다.");
        }

        List<LocationResponseDto> responseDtos = null;

        responseDtos = locations.stream()
                .map(location -> LocationResponseDto.builder()
                        .locationId(location.getLocationId())
                        .bookTitle(location.getBook().getBookTitle())
                        .floor(location.getFloor())
                        .build())
                .collect(Collectors.toList());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDtos);
    }



    //4)해당 책을 클릭하여 위치 반환
    @Override
    @Transactional(readOnly = true)
    public ResponseDto<LocationDetailResponseDto> getLocation(Long branchId, Long locationId) {
        LocationDetailResponseDto responseDto = null;
        BookDisplayLocation location = bookLocationRepository.findById(locationId)
                .orElseThrow(() -> new EntityNotFoundException(ResponseCode.NO_EXIST_ID));

        responseDto = LocationDetailResponseDto.builder()
                .locationId(location.getLocationId())
                .bookTitle(location.getBook().getBookTitle())
                .floor(location.getFloor())
                .hall(location.getHall())
                .section(location.getSection())
                .type(location.getDisplayType())
                .note(location.getNote())
                .build();
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDto);
    }

    //5)지점에서 위치 삭제 (더이상 진열하지 않음)

    @Override
    public ResponseDto<Void> deleteLocation(Long branchId, Long locationId) {
        BookDisplayLocation location = bookLocationRepository.findById(locationId)
                .orElseThrow(() -> new EntityNotFoundException(ResponseCode.NO_EXIST_ID));

        bookLocationRepository.deleteById(locationId);
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }
    
}
