package com.bookhub.bookhub_back.common.constants;

public interface RegexConstants {
    // 회원 로그인 아이디 정규식
    public static final String LOING_ID_REGEX = "^[A-Za-z][A-Za-z\\d]{3,12}$";

    // 회원 비밀번호 정규식: 최소 8자 이상, 16자 이하 - 영문, 숫자, 특수문자 각각 1개 이상 포함되어야 한다.
    public static final String PASSWORD_REGEX =
        "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%*?])[A-Za-z\\d!@#$%*?]{8,16}$";

    // 회원 이메일 정규식
    public static final String EMAIL_REGEX = "^[A-Za-z][A-Za-z\\d]+@[A-Za-z\\d.-]+\\.[A-Za-z]{2,}$";

    // 회원 전화번호 정규식
    public static final String PHONE_REGEX = "^010\\d{8}";
}
