package com.bookhub.bookhub_back.repository;

import com.bookhub.bookhub_back.common.enums.FileTargetType;
import com.bookhub.bookhub_back.entity.UploadFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UploadFileRepository extends JpaRepository<UploadFile, Long> {
    // 도서 검색용 (isbn으로 연결된 이미지 1개 조회)
    Optional<UploadFile> findFirstByTargetTypeAndTargetId(FileTargetType targetType, String targetId);
}
