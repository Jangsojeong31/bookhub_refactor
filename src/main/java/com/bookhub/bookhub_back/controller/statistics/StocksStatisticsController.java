package com.bookhub.bookhub_back.controller.statistics;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.stocks.BranchStockBarChartDto;
import com.bookhub.bookhub_back.dto.statistics.response.stocks.CategoryStockResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.stocks.TimeStockChartResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.stocks.ZeroStockResponseDto;
import com.bookhub.bookhub_back.service.statistics.StocksStaticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//재고별 통계기능 컨트롤러
@RestController
@RequestMapping(ApiMappingPattern.BASIC_API + ApiMappingPattern.ADMIN_API + "/statistics/stocks")
@RequiredArgsConstructor
public class StocksStatisticsController {
    private final StocksStaticsService stocksStaticsService;

    //지점별 입고량 및 출고량
    //x축 : 각 지점
    //y축 : 입고수량/ 출고수량
    //requestParam  몇년 몇월 (해당 년 월에 각각의 지점별의 입고량/ 출고량),
    //Simple Bar Chart 구조 (총 바가 각 지점별 3개씩 있을 예정 ( 해당 기간 총 IN amount 전부 더한거/ OUT 전부 더한거/ LOSS 전부 더한거 각 하나씩))
    //  하나는 해당 지점의 총 출고량) => StockLog 에서 Out amount 전부 긁어오기
    @GetMapping("/branch")
    public ResponseEntity<ResponseDto<List<BranchStockBarChartDto>>> getBranchStockBarChart(
        @RequestParam int year,
        @RequestParam int month
    ) {
        ResponseDto<List<BranchStockBarChartDto>> stockStatistics = stocksStaticsService.getBranchStockBarChart(year, month);
        return ResponseEntity.status(HttpStatus.OK).body(stockStatistics);
    }

    //시간별 입고량 추이
    //시간별 loss 추이
    // LineChartWithXAxisPadding 사용
    //RequestParam : 년
    //각각다른 색의 선 그래프는 각각 다른 Branch
    //x축 : 1월 2월 3월~~ (미래는 표시하지 않는다 -> null 값)
    //y축 : 입고량
    @GetMapping("/time")
    public ResponseEntity<ResponseDto<List<TimeStockChartResponseDto>>> getTimeStockStatistics(
        @RequestParam Long year
    ) {
        ResponseDto<List<TimeStockChartResponseDto>> revenue = stocksStaticsService.getTimeStockStatistics(year);
        return ResponseEntity.status(HttpStatus.OK).body(revenue);
    }

    //지점별 재고가 0인 책의 수
    //x축 : 각 지점
    //y축 : 책의 수
    //stockRepository에서 amount를 받아와서 count 한다
    @GetMapping("/zero")
    public ResponseEntity<ResponseDto<List<ZeroStockResponseDto>>> getZeroStockBooks() {
        ResponseDto<List<ZeroStockResponseDto>> revenue = stocksStaticsService.getZeroStockBooks();
        return ResponseEntity.status(HttpStatus.OK).body(revenue);
    }

    //지점별 각 카테고리의 재고 비율
    //PieChartWithCustomizedLabel 사용 예정 각 label은 각 카테고리를 의미
    //RequestParam : branch를 토글로 받아옴
    //해당 branch에서 각 카테고리별 재고 비율을 산정하여 차트로 보여줌
    //상위 10개의 카테고리만 보여주고 나머지는 기타로 표시
    @GetMapping("/category")
    public ResponseEntity<ResponseDto<List<CategoryStockResponseDto>>> getCategoryStocks(
        @RequestParam String branchName
    ) {
        ResponseDto<List<CategoryStockResponseDto>> revenue = stocksStaticsService.getCategoryStocks(branchName);
        return ResponseEntity.status(HttpStatus.OK).body(revenue);
    }
}





























