package com.bookhub.bookhub_back.dto.stock.request;

import com.bookhub.bookhub_back.common.enums.StockActionType;
import com.bookhub.bookhub_back.entity.Book;
import com.bookhub.bookhub_back.entity.Branch;
import com.bookhub.bookhub_back.entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


/*
* LOSS 일 때에만 직접 입력하고
* 이외의 경우에는 customer controller
* 이나 purchase Order Approval에서 처리한다.
*
* */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StockUpdateRequestDto {
    private String type;
    private Long employeeId;
    private String bookIsbn;
    private Long branchId;
    private Long amount;
    private String description;
}
