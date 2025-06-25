package com.bookhub.bookhub_back.controller.statistics;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.revenue.BranchRevenueResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.revenue.MonthlyRevenueResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.revenue.WeekdayRevenueResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.revenue.WeeklyRevenueResponseDto;
import com.bookhub.bookhub_back.service.statistics.RevenueStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(ApiMappingPattern.BASIC_API+ApiMappingPattern.ADMIN_API+"/statistics/revenue")
@RequiredArgsConstructor
public class RevenueStatisticsController {
    private final RevenueStatisticsService revenueService;
    //주간 총 매출 금액
    /*
    x축 : 각 지점
    y축 : 총 매출 금액
    받아야 하는 값 (몇주인지 (월-일까지의 값을 계산할 예정
     */

     //요일별 매출 금액
    //x축 : 월화수목금토일
    //y축 : 금액
    // 받아야 하는 값 (분기) - 1분기 : 1-3월/2분기4-6월/3분기7-9월/4분기 10-12월)
    //토글을 통해서 년도와 분기값을 넣으면 해당 기간 내의 모든 요일별 매출을 더해서 출력해준다.
    @GetMapping("/weekday")
    public ResponseEntity<ResponseDto<List<WeekdayRevenueResponseDto>>> getWeekdayRevenue(
            @RequestParam int year,
            @RequestParam int quarter
    ){
        ResponseDto<List<WeekdayRevenueResponseDto>> revenue = revenueService.getWeekdayRevenue(year,quarter);
        return ResponseEntity.status(HttpStatus.OK).body(revenue);
    }

    //주별 매출 추이
    //RequestParam : 시작일과 마지막 날짜(달력을 이용한 선택
    //CustomizedLabelLineChart를 이용해 구현 예정
    //각각의 line은 각 지점을 나타내고 x축은 시작일로부터 주차별(6월 1주차, 6월 2주차 등등)
    //각각의 값은 만약 시작일이 2025.3.6(목)/끝나는 날자가 2025.6.20(금)이라면
    //목- 수요일까자의 각각의 값이 y 축이 되고 6.19일, 6.20일 데이터는 표시하지  않는다
    //y축은 각각의 주차별 총 매출금액의 합니다.
    @GetMapping("/weekly")
    public ResponseEntity<ResponseDto<List<WeeklyRevenueResponseDto>>> getWeeklyRevenue(
            @RequestParam("startDate")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam("endDate")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate
    ){
        ResponseDto<List<WeeklyRevenueResponseDto>> revenue = revenueService.getWeeklyRevenue(startDate, endDate);
        return ResponseEntity.status(HttpStatus.OK).body(revenue);
    }

    //월간 총 매출 금액 (1월~12월 : x축)
    //현재 월을 기분으로 이전 1년간의 데이터를 조회할 수 있다. (만약 현재가 2025.6/6일이면 2024.6.1부터 2025.5.31까지의 데이터 조회 가능)
    @GetMapping("/monthly")
    public ResponseEntity<ResponseDto<List<MonthlyRevenueResponseDto>>> getMonthlyRevenue(){
        ResponseDto<List<MonthlyRevenueResponseDto>> revenue = revenueService.getMonthlyRevenue();
        return ResponseEntity.status(HttpStatus.OK).body(revenue);
    }

    //x축 : 각 지점 (지점은 늘어날수도 줄어들수도 있기 때문에 고정값은 아님 , branchId 순서대로 x 축 정렬)
    //y축 : 매출금액
    //각 쌓이는 데이터(색깔 다른거 : 각 카테고리 (ex. 시: 빨강, 소설: 파랑)
    //입력값 : 시작일, 끝일 (각각 front에서는 달력을 이용하여 선택을 하게 할것임)
    //Mixbarchart를 이용하여 구현
    // front에서 시작일과 마무리 날짜를 선택하면 해당 날짜 사이의 모든 특정 주를 선택할 시에 -> 지점별 총 매출 금액
    @GetMapping("/branch")
    public ResponseEntity<ResponseDto<List<BranchRevenueResponseDto>>> getBranchRevenue(
            @RequestParam("startDate")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam("endDate")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate
    ){
        ResponseDto<List<BranchRevenueResponseDto>> revenue = revenueService.getBranchRevenue(startDate,endDate);
        return ResponseEntity.status(HttpStatus.OK).body(revenue);
    }
}
//월별 평균 객단가
