package com.bookhub.bookhub_back.service;


import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.reception.request.ReceptionCreateRequestDto;
import com.bookhub.bookhub_back.dto.reception.response.ReceptionCreateResponseDto;
import com.bookhub.bookhub_back.dto.reception.response.ReceptionListResponseDto;

import java.util.List;

public interface BookReceptionApprovalService {
    ResponseDto<ReceptionCreateResponseDto> createReception(ReceptionCreateRequestDto dto, String token);
    ResponseDto<Void> approveReception(Long id, String token);
    ResponseDto<List<ReceptionListResponseDto>> getPendingList(String token);
    ResponseDto<List<ReceptionListResponseDto>> getManagerConfirmedList(String token);
    ResponseDto<List<ReceptionListResponseDto>> getAdminConfirmedList(String branchName, String isbn);

}
