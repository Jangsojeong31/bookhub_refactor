package com.bookhub.bookhub_back.common.enums;

/**
 * 재고 이동 유형을 나타내는 enum입니다.
 * - IN: 입고
 * - OUT: 출고
 * - LOSS: 분실, 파손 등 손실 처리
 */
public enum StockActionType {
    IN,
    OUT,
    LOSS
}
