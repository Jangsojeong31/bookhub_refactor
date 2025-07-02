package com.bookhub.bookhub_back.controller;

import com.bookhub.bookhub_back.common.constants.ApiMappingPattern;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.auth.request.LoginIdFindSendEmailRequestDto;
import com.bookhub.bookhub_back.dto.auth.request.PasswordFindSendEmailReqestDto;
import com.bookhub.bookhub_back.dto.auth.request.PasswordResetRequestDto;
import com.bookhub.bookhub_back.dto.employee.request.EmployeeSignInRequestDto;
import com.bookhub.bookhub_back.dto.employee.request.EmployeeSignUpRequestDto;
import com.bookhub.bookhub_back.dto.employee.request.EmployeeUpdateRequestDto;
import com.bookhub.bookhub_back.dto.employee.response.EmployeeSignInResponseDto;
import com.bookhub.bookhub_back.service.AuthService;
import com.bookhub.bookhub_back.service.MailService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(ApiMappingPattern.AUTH_API)
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final MailService mailService;

    private static final String POST_SIGN_UP = "/signup";
    private static final String POST_SIGN_IN = "/login";

    // 1) 회원가입
    @PostMapping(POST_SIGN_UP)
    public ResponseEntity<ResponseDto<Void>> signup(@Valid @RequestBody EmployeeSignUpRequestDto dto) {
        ResponseDto<Void> response = authService.signup(dto);
        return ResponseDto.toResponseEntity(HttpStatus.OK, response);
    }


    // 2) 로그인
    @PostMapping(POST_SIGN_IN)
    public ResponseEntity<ResponseDto<EmployeeSignInResponseDto>> login(@Valid @RequestBody EmployeeSignInRequestDto dto) {
        ResponseDto<EmployeeSignInResponseDto> response = authService.login(dto);
        return ResponseDto.toResponseEntity(HttpStatus.OK, response);
    }

    @PostMapping("/login-id-find/email")
    public Mono<ResponseEntity<ResponseDto<String>>> SendEmailFindId(@Valid @RequestBody LoginIdFindSendEmailRequestDto dto) {
        return mailService.sendEmailFindId(dto);
    }

    @GetMapping("/login-id-find")
    public Mono<ResponseEntity<ResponseDto<String>>> verifyEmailId(@RequestParam String token) {
        return mailService.verifyEmailId(token);
    }

    @PostMapping("/password-change/email")
    public Mono<ResponseEntity<ResponseDto<String>>> sendEmailResetPassword (@Valid @RequestBody PasswordFindSendEmailReqestDto dto) {
        return mailService.sendEmailResetPassword(dto);
    }

    @GetMapping("/password-change")
    public Mono<ResponseEntity<ResponseDto<String>>> verifyLoginIdPassword(@RequestParam String token) {
        return mailService.verifyLoginIdPassword(token);
    }

    @PutMapping("/password-change")
    public Mono<ResponseEntity<ResponseDto<String>>> passwordChange(@RequestParam String token, @Valid @RequestBody PasswordResetRequestDto dto) {
        return mailService.passwordChange(token, dto);
    }

    @GetMapping("/login-id-exists")
    public ResponseEntity<ResponseDto<Void>> checkLoginIdDuplicate(@RequestParam String loginId) {
        ResponseDto<Void> responseDto = authService.checkLoginIdDuplicate(loginId);
        return ResponseDto.toResponseEntity(HttpStatus.OK, responseDto);
    }

    @PostMapping("/logout")
    public ResponseEntity<ResponseDto<Void>> logout (HttpServletResponse response) {
        ResponseDto<Void> responseDto = authService.logout(response);
        return ResponseDto.toResponseEntity(HttpStatus.OK, responseDto);
    }

    // 회원 가입 승임 및 거절 시 이메일 전송
    @PostMapping("/employees/{approvalId}/approve")
    public Mono<ResponseEntity<ResponseDto<String>>> SendEmailSignUpResult(@PathVariable Long approvalId) {
        return mailService.SendEmailSignUpResult(approvalId);
    }

    @GetMapping("employees/approve")
    public Mono<ResponseEntity<ResponseDto<String>>> verifyEmployeeUpdate(@RequestParam String token) {
        return mailService.verifyEmployeeUpdate(token);
    }

    // 거절 시 회원 정보 수정
    @PutMapping("/employees/approve")
    public Mono<ResponseEntity<ResponseDto<String>>> employeeUpdate(@RequestParam String token, @RequestBody EmployeeUpdateRequestDto dto) {
        return mailService.employeeUpdate(token, dto);
    }
}