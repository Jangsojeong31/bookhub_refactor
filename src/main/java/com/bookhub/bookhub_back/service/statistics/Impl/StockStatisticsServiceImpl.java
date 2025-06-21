package com.bookhub.bookhub_back.service.statistics.Impl;

import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessageKorean;
import com.bookhub.bookhub_back.common.enums.StockActionType;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.statistics.projection.CategoryStockProjection;
import com.bookhub.bookhub_back.dto.statistics.response.stocks.BranchStockBarChartDto;
import com.bookhub.bookhub_back.dto.statistics.response.stocks.CategoryStockResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.stocks.TimeStockChartResponseDto;
import com.bookhub.bookhub_back.dto.statistics.response.stocks.ZeroStockResponseDto;
import com.bookhub.bookhub_back.entity.Branch;
import com.bookhub.bookhub_back.repository.BranchRepository;
import com.bookhub.bookhub_back.repository.statistics.StocksStatisticsRepository;
import com.bookhub.bookhub_back.service.statistics.StocksStaticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StockStatisticsServiceImpl implements StocksStaticsService {
    private final StocksStatisticsRepository stocksStatisticsRepository;
    private final BranchRepository branchRepository;

    @Override
    public ResponseDto<List<BranchStockBarChartDto>> getBranchStockBarChart(int year, int month) {
        List<Branch> branches = branchRepository.findAll();
        List<BranchStockBarChartDto> resultList = new ArrayList<>();

        long totalIn = 0L;
        long totalOut = 0L;
        long totalLoss = 0L;

        for (Branch branch : branches) {
            System.out.println(branch.getBranchName());
            Long in = stocksStatisticsRepository.sumAmountByBranchAndType(branch.getBranchId(), StockActionType.IN, year, month);
            Long out = stocksStatisticsRepository.sumAmountByBranchAndType(branch.getBranchId(), StockActionType.OUT, year, month);
            Long loss = stocksStatisticsRepository.sumAmountByBranchAndType(branch.getBranchId(), StockActionType.LOSS, year, month);

            in = in == null ? 0 : in;
            out = out == null ? 0 : out;
            loss = loss == null ? 0 : loss;

            resultList.add(BranchStockBarChartDto.builder()
                .branchName(branch.getBranchName())
                .inAmount(in)
                .outAmount(out)
                .lossAmount(loss)
                .build());

            totalIn += in;
            totalOut += out;
            totalLoss += loss;
        }

        resultList.add(BranchStockBarChartDto.builder()
                .branchName("전체 합계")
                .inAmount(totalIn)
                .outAmount(totalOut)
                .lossAmount(totalLoss)
                .build());

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, resultList);
    }

    @Override
    public ResponseDto<List<TimeStockChartResponseDto>> getTimeStockStatistics(int year) {
        return null;
    }

    @Override
    public ResponseDto<List<ZeroStockResponseDto>> getZeroStockBooks() {
        return null;
    }

    @Override
    public ResponseDto<List<CategoryStockResponseDto>> getCategoryStocks(String branchName) {
        List<CategoryStockProjection> projections = stocksStatisticsRepository.findCategoryStockByBranch(branchName);

        List<CategoryStockResponseDto> top10 = new ArrayList<>();
        long etcSum = 0L;

        for (int i = 0; i < projections.size(); i++) {
            CategoryStockProjection p = projections.get(i);
            if (i < 9) {
                top10.add(new CategoryStockResponseDto(p.getCategoryName(), p.getTotalAmount()));
            } else {
                etcSum += p.getTotalAmount();
            }
        }

        if (etcSum > 0) {
            top10.add(new CategoryStockResponseDto("기타", etcSum));
        }
        System.out.println(top10.get(1));
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, top10);
    }

}
