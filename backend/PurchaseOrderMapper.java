package com.bookhub.bookhub_back.mapper;

import com.bookhub.bookhub_back.common.enums.PurchaseOrderStatus;
import com.bookhub.bookhub_back.dto.purchaseOrder.response.PurchaseOrderResponseDto;
import com.bookhub.bookhub_back.entity.PurchaseOrder;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PurchaseOrderMapper {
    List<PurchaseOrderResponseDto> searchPurchaseOrder(@Param("employeeName") String employeeName, @Param("bookIsbn") String bookIsbn, @Param("purchaseOrderStatus") PurchaseOrderStatus purchaseOrderStatus);
}
