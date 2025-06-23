package com.bookhub.bookhub_back.dto.location.request;

import com.bookhub.bookhub_back.common.enums.DisplayType;
import com.bookhub.bookhub_back.entity.Branch;
import com.bookhub.bookhub_back.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class LocationCreateRequestDto {

    private String bookIsbn;
    private String floor;
    private String hall;
    private String section;
    private DisplayType displayType;
    private String note;
}
