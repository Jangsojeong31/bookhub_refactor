package com.bookhub.bookhub_back.service;

import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.position.response.PositionListResponseDto;

import java.util.List;

public interface PositionService {
    ResponseDto<List<PositionListResponseDto>> getAllPosition();
}
