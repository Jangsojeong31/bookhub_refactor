package com.bookhub.bookhub_back.common.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 날짜 및 시간 관련 유틸리티 클래스
 */
public class DateUtils {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static String format(LocalDateTime dateTime) {
        return (dateTime != null) ? dateTime.format(FORMATTER) : null;
    }

    public static LocalDateTime parse(String dateString) {
        return (dateString != null && !dateString.isEmpty()) ? LocalDateTime.parse(dateString, FORMATTER) : null;
    }

    public static String nowFormated() {
        return format(LocalDateTime.now());
    }
}
