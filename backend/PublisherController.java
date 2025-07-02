package com.bookhub.bookhub_back.controller;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.dto.PageResponseDto;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.publisher.request.PublisherRequestDto;
import com.bookhub.bookhub_back.dto.publisher.response.PublisherResponseDto;
import com.bookhub.bookhub_back.service.PublisherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiMappingPattern.BASIC_API + ApiMappingPattern.ADMIN_API + "/publishers")
@RequiredArgsConstructor
public class PublisherController {
    //서비스 단이랑 연결
    private final PublisherService publisherService;

    //1) 출판사 생성
    @PostMapping
    public ResponseEntity<ResponseDto<PublisherResponseDto>> createPublisher(
            @Valid @RequestBody PublisherRequestDto dto){
        ResponseDto<PublisherResponseDto> publisher = publisherService.createPublisher(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(publisher);
    }

    //2)출판사 수정
    @PutMapping("/{publisherId}")
    public ResponseEntity<ResponseDto<PublisherResponseDto>> updatePublisher(
            @PathVariable Long publisherId,
            @Valid @RequestBody PublisherRequestDto dto){
        ResponseDto<PublisherResponseDto> changedPublisher = publisherService.updatePublisher(publisherId, dto);
        return ResponseEntity.status(HttpStatus.OK).body(changedPublisher);
    }

//    // 3) 페이징 조회 + 키워드 조회
//    @GetMapping
//    public ResponseEntity<ResponseDto<PageResponseDto<PublisherResponseDto>>> getAllPublishers(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size) {
//        ResponseDto<PageResponseDto<PublisherResponseDto>> publishers = publisherService.getAllPublishers(page, size);
//        return ResponseEntity.ok(publishers);
//    }

    @GetMapping
    public ResponseEntity<ResponseDto<?>> getPublishers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword
    ) {
        if (keyword != null && !keyword.isBlank()) {

            return ResponseEntity.ok(publisherService.getPublisherByNameContaining(keyword));
        }
        ResponseDto<PageResponseDto<PublisherResponseDto>> publishers = publisherService.getAllPublishers(page, size);
       return ResponseEntity.ok(publishers);
    }


    //4)단건 조회하기
//    @GetMapping("/{publisherId}")
//    public ResponseEntity<ResponseDto<PublisherResponseDto>> getpublisherById(
//            @PathVariable Long publisherId){
//        ResponseDto<PublisherResponseDto> publisher = publisherService.getPublisherById(publisherId);
//        return ResponseEntity.status(HttpStatus.OK).body(publisher);
//    }

//    //5)출판사 제목으로 검색
//    @GetMapping("/search")
//    public ResponseEntity<ResponseDto<List<PublisherResponseDto>>> searchPublisherByName(
//            @RequestParam String keyword
//    ){
//        ResponseDto<List<PublisherResponseDto>> publisher = publisherService.getPublisherByName(keyword);
//        return ResponseEntity.status(HttpStatus.OK).body(publisher);
//    }

    //6)출판사 삭제하기
    @DeleteMapping("/{publisherId}")
    public ResponseEntity<ResponseDto<Void>> deletePublisher(@PathVariable Long publisherId){
        ResponseDto<Void> responseDto = publisherService.deletePublisher(publisherId);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }


}
