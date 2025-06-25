package com.bookhub.bookhub_back.service.statistics.Impl;

import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessage;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.statistics.projection.MonthlyRevenueStatisticsProjection;
import com.bookhub.bookhub_back.dto.statistics.projection.WeeklyRevenueStatisticsProjection;
import com.bookhub.bookhub_back.dto.statistics.response.revenue.BranchRevenueResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.revenue.MonthlyRevenueResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.revenue.WeekdayRevenueResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.revenue.WeeklyRevenueResponseDto;
import com.bookhub.bookhub_back.entity.CustomerOrder;
import com.bookhub.bookhub_back.repository.statistics.RevenueStatisticsRepository;
import com.bookhub.bookhub_back.service.statistics.RevenueStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RevenueStatisticsServiceImpl implements RevenueStatisticsService {

    private final RevenueStatisticsRepository revenueStatisticsRepository;

    @Override
    public ResponseDto<List<WeekdayRevenueResponseDto>> getWeekdayRevenue(int year, int quarter) {
        int startMonth = (quarter -1) *3+1;
        int endMonth = startMonth+2;

        //Repository에서 매출 집계 쿼리 호출
        List<Object[]> result = revenueStatisticsRepository.findRevenueGroupedByWeekday(year, startMonth, endMonth);

        String[] weekdays = {"월","화","수","목","금","토","일"};
        Map<String, Long> salesMap = new LinkedHashMap<>();
        for(String weekday : weekdays) salesMap.put(weekday,0L);
        for(Object[] row : result){
            String weekday = (String) row[0];
            Long total = ((Number) row[1]).longValue();
            salesMap.put(weekday,total);
        }

        List<WeekdayRevenueResponseDto> responsedtos = new ArrayList<>();
        for(String weekday:weekdays){
            responsedtos.add(new WeekdayRevenueResponseDto(weekday, salesMap.get(weekday)));

        }
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS,responsedtos);
    }

    @Override
    public ResponseDto<List<WeeklyRevenueStatisticsProjection>> getWeeklyRevenue(int year, int month) {
        // 1) 전체 일수 및 완전 주(7일) 개수 계산
//        long totalDays = ChronoUnit.DAYS.between(startDate, endDate) + 1;
//        int fullWeeks = (int)(totalDays / 7);
//        if (fullWeeks == 0) {
//            return ResponseDto.success(
//                    ResponseCode.SUCCESS,
//                    ResponseMessage.SUCCESS,
//                    Collections.emptyList()
//            );
//        }

        // 2) 마지막 완전 주 종료일
//        LocalDate lastFullWeekEnd = startDate.plusWeeks(fullWeeks).minusDays(1);

        // 3) DB 조회 (완전 주 구간만)
//        List<CustomerOrder> orders = revenueStatisticsRepository.findByCreatedAtBetween(
//                startDate.atStartOfDay(),
//                lastFullWeekEnd.atTime(23, 59, 59)
//        );

        // 4) (지점ID → (주차 → 매출합)) 집계
//        Map<Long, Map<Integer, Long>> agg = new HashMap<>();
//        for (CustomerOrder o : orders) {
//            long branchId = o.getBranchId().getBranchId();
//            long daysFromStart = ChronoUnit.DAYS.between(
//                    startDate,
//                    o.getCreatedAt().toLocalDate()
//            );
//            int weekIndex = (int)(daysFromStart / 7);
//
//            agg
//                    .computeIfAbsent(branchId, k -> new HashMap<>())
//                    .merge(weekIndex, o.getTotalPrice(), Long::sum);
//        }

        // 5) Builder로 DTO 조립
//        List<WeeklyRevenueResponseDto> responsedto = new ArrayList<>();
//        for (Map.Entry<Long, Map<Integer, Long>> entry : agg.entrySet()) {
//            Long branchId = entry.getKey();
//            String branchName = orders.stream()
//                    .filter(o -> o.getBranchId().getBranchId().equals(branchId))
//                    .findFirst()
//                    .map(o -> o.getBranchId().getBranchName())
//                    .orElse("Unknown");
//
//            Map<Integer, Long> weeklyMap = entry.getValue();
//            for (int wi = 0; wi < fullWeeks; wi++) {
//                LocalDate weekStart = startDate.plusWeeks(wi);
//                Long revenue = weeklyMap.getOrDefault(wi, 0L);
//
//                responsedto.add(
//                        WeeklyRevenueResponseDto.builder()
//                                .branchId(branchId)
//                                .branchName(branchName)
//                                .weekIndex(wi)
//                                .weekStartDate(weekStart)
//                                .totalRevenue(revenue)
//                                .build()
//                );
//            }
//        }

        // 6) ResponseDto 래핑
        List<WeeklyRevenueStatisticsProjection> responsedto = revenueStatisticsRepository.findWeeklySales(year, month);
        return ResponseDto.success(ResponseCode.SUCCESS,ResponseMessage.SUCCESS,responsedto);
    }

    @Override
    public ResponseDto<List<BranchRevenueResponseDto>> getBranchRevenue(LocalDate startDate, LocalDate endDate) {
        List<BranchRevenueResponseDto> dtos = revenueStatisticsRepository.findByBranchByDate(startDate,endDate);
        return ResponseDto.success(ResponseCode.SUCCESS,ResponseMessage.SUCCESS,dtos);
    }

    @Override
    public ResponseDto<List<MonthlyRevenueStatisticsProjection>> getMonthlyRevenue(int year) {
//        // 오늘 날짜 기준
//        LocalDate today = LocalDate.now();
//        YearMonth currentMonth = YearMonth.of(today.getYear(), today.getMonth());
//
//        // 1년 전 같은 월부터, 바로 이전 달까지 (12개월)
//        YearMonth startYm = currentMonth.minusMonths(12);
//        YearMonth endYm   = currentMonth.minusMonths(1);
//
//        LocalDate startDate = startYm.atDay(1);
//        LocalDate endDate   = endYm.atEndOfMonth();
//
//        // DB에서 집계 결과 가져오기
//        List<MonthlyRevenueResponseDto> raw = revenueStatisticsRepository.findMonthlySales(startDate, endDate);
//
//        // 월 → 합계 맵으로 변환
//        Map<Integer, Long> map = raw.stream()
//                .collect(Collectors.toMap(MonthlyRevenueResponseDto::getMonth, MonthlyRevenueResponseDto::getTotalSales));
//
//        // 누락된 월(매출 0인 월)도 채워서 순차 리스트 생성
//        List<MonthlyRevenueResponseDto> result = new ArrayList<>();
//        YearMonth iter = startYm;
//        for (int i = 0; i < 12; i++) {
//            Integer month = iter.getMonthValue();
//            Long sales = map.getOrDefault(month, 0L);
//            result.add(new MonthlyRevenueResponseDto(month, sales));
//            iter = iter.plusMonths(1);
//        }

        List<MonthlyRevenueStatisticsProjection> responseDto = revenueStatisticsRepository.findMonthlySales(year);
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, responseDto);
    }


}




































































