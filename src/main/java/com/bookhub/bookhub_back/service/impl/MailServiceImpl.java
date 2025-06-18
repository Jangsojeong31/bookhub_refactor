package com.bookhub.bookhub_back.service.impl;

import com.bookhub.bookhub_back.common.constants.ResponseCode;
import com.bookhub.bookhub_back.common.constants.ResponseMessageKorean;
import com.bookhub.bookhub_back.common.enums.IsApproved;
import com.bookhub.bookhub_back.dto.ResponseDto;
import com.bookhub.bookhub_back.dto.auth.request.LoginIdFindSendEmailRequestDto;
import com.bookhub.bookhub_back.dto.auth.request.PasswordFindSendEmailReqestDto;
import com.bookhub.bookhub_back.dto.auth.request.PasswordResetRequestDto;
import com.bookhub.bookhub_back.dto.employee.request.EmployeeUpdateRequestDto;
import com.bookhub.bookhub_back.entity.Branch;
import com.bookhub.bookhub_back.entity.Employee;
import com.bookhub.bookhub_back.entity.EmployeeSignUpApproval;
import com.bookhub.bookhub_back.repository.BranchRepository;
import com.bookhub.bookhub_back.repository.EmployeeRepository;
import com.bookhub.bookhub_back.repository.EmployeeSignUpApprovalRepository;
import com.bookhub.bookhub_back.service.MailService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
    private final JavaMailSender mailSender;
    private final Map<String, String> verificationTokens = new ConcurrentHashMap<>();
    private final EmployeeRepository employeeRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final EmployeeSignUpApprovalRepository employeeSignUpApprovalRepository;
    private final BranchRepository branchRepository;

    @Override
    public Mono<ResponseEntity<ResponseDto<String>>> sendEmailFindId(LoginIdFindSendEmailRequestDto dto) {
        return Mono.fromCallable(() -> {

            Employee employee = employeeRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));

            if (!employee.getPhoneNumber().equals(dto.getPhoneNumber())) {
                throw new IllegalArgumentException("사용자의 전화번호와 일치하지 않습니다.");
            }

            String token = UUID.randomUUID().toString();
            verificationTokens.put(token, dto.getEmail());

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(dto.getEmail());
            helper.setSubject("이메일 인증 요청");
            String htmlContent = """
                            <h2>[이메일 인증 요청]</h2>
                            <p>
                                안녕하세요,<br><br>
                                이메일 인증을 위해 아래 버튼을 클릭해 주세요.
                            </p>
                            <a href="http://localhost:5174/auth/login-id-find?token=%s">이메일 인증하기</a>
                            <p>본 이메일은 인증 목적으로 발송되었습니다. 인증을 원하지 않으시면 무시하셔도 됩니다.</p>
                """.formatted(token);

            helper.setText(htmlContent, true);  // true: HTML 형식

            mailSender.send(message);

            return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, "이메일 전송 성공"));
        });
    }

    @Override
    public Mono<ResponseEntity<ResponseDto<String>>> verifyEmailId(String token) {
        return Mono.fromCallable(() -> {
            String email = verificationTokens.get(token);

            if (email == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ResponseDto.fail(ResponseCode.TOKEN_EXPIRED, ResponseMessageKorean.TOKEN_EXPIRED));
            }

            Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("직원이 존재하지 않습니다."));

            verificationTokens.remove(token);

            return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, employee.getLoginId()));
        });
    }

    @Override
    public Mono<ResponseEntity<ResponseDto<String>>> sendEmailResetPassword(PasswordFindSendEmailReqestDto dto) {
        return Mono.fromCallable(() -> {
            Employee employee = employeeRepository.findByLoginId(dto.getLoginId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사원입니다."));

            if (!employee.getEmail().equals(dto.getEmail())) {
                throw new IllegalArgumentException("사용자의 이메일과 일치하지 않습니다.");
            }

            if (!employee.getPhoneNumber().equals(dto.getPhoneNumber())) {
                throw new IllegalArgumentException("사용자의 전화번호와 일치하지 않습니다.");
            }

            String token = UUID.randomUUID().toString();
            verificationTokens.put(token, dto.getEmail());

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(dto.getEmail());
            helper.setSubject("이메일 인증 요청");
            String htmlContent = """
                            <h2>[이메일 인증 요청]</h2>
                            <p>
                                안녕하세요,<br><br>
                                이메일 인증을 위해 아래 버튼을 클릭해 주세요.
                            </p>
                            <a href="http://localhost:5174/auth/password-change?token=%s">이메일 인증하기</a>
                            <p>본 이메일은 인증 목적으로 발송되었습니다. 인증을 원하지 않으시면 무시하셔도 됩니다.</p>
                """.formatted(token);

            helper.setText(htmlContent, true);  // true: HTML 형식

            mailSender.send(message);

            return ResponseEntity.status(HttpStatus.OK).body(ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, "이메일 전송 성공"));

        });
    }

    @Override
    public Mono<ResponseEntity<ResponseDto<String>>> verifyLoginIdPassword(String token) {
        return Mono.fromCallable(() -> {
            String email = verificationTokens.get(token);

            if (email == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ResponseDto.fail(ResponseCode.TOKEN_EXPIRED, ResponseMessageKorean.TOKEN_EXPIRED));
            }

            Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("직원이 존재하지 않습니다."));

            return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS));
        });
    }

    @Override
    public Mono<ResponseEntity<ResponseDto<String>>> passwordChange(String token, PasswordResetRequestDto dto) {
        return Mono.fromCallable(() -> {
            String email = verificationTokens.get(token);

            if (email == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ResponseDto.fail(ResponseCode.TOKEN_EXPIRED, ResponseMessageKorean.TOKEN_EXPIRED));
            }

            Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("직원이 존재하지 않습니다."));

            String password = dto.getPassword();
            String confirmPassword = dto.getConfirmPassword();

            if (!password.equals(confirmPassword)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseDto.fail(ResponseCode.NOT_MATCH_PASSWORD, ResponseMessageKorean.NOT_MATCH_PASSWORD));
            }

            String encodePassword = bCryptPasswordEncoder.encode(password);
            employee.setPassword(encodePassword);
            employeeRepository.save(employee);

            verificationTokens.remove(token);

            return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, "비밀번호가 변경되었습니다."));
        });
    }

    @Override
    public Mono<ResponseEntity<ResponseDto<String>>> SendEmailSignUpResult(Long approvalId) {
        EmployeeSignUpApproval employeeSignUpApproval = employeeSignUpApprovalRepository.findById(approvalId)
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원가입 승인 신청입니다."));

        Employee employee = employeeRepository.findById(employeeSignUpApproval.getEmployeeId().getEmployeeId())
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않은 사원입니다."));

        if (employee.getIsApproved() == IsApproved.APPROVED) {
            return Mono.fromCallable(() -> {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                helper.setTo(employee.getEmail());
                helper.setSubject("이메일 인증 요청");
                String htmlContent = """
                                <h2>[이메일 인증 요청]</h2>
                                <p>
                                    안녕하세요,<br><br>
                                    회원가입이 승인되었습니다.
                                </p>
                    """;
                helper.setText(htmlContent, true);  // true: HTML 형식

                mailSender.send(message);

                return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, "이메일 전송 성공"));
            });
        } else if (employee.getIsApproved() == IsApproved.DENIED && employeeSignUpApproval.getDeniedReason().equals("INVALID_EMPLOYEE_INFO")) {
            return Mono.fromCallable(() -> {
                String token = UUID.randomUUID().toString();
                verificationTokens.put(token, employee.getEmail());

                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                helper.setTo(employee.getEmail());
                helper.setSubject("이메일 인증 요청");
                String htmlContent = """
                                <h2>[이메일 인증 요청]</h2>
                                <p>
                                    안녕하세요,<br><br>
                                    회원 가입 승인이 거절되었습니다.
                                    거절 사유: 사원 정보 불일치
                                    정보 수정를 위해 아래 버튼을 클릭해 주세요.
                                </p>
                                    <a href="http://localhost:5174/auth/sign-up/update?token=%s">이메일 인증하기</a>
                                <p>본 이메일은 인증 목적으로 발송되었습니다. 인증을 원하지 않으시면 무시하셔도 됩니다.</p>
                    """.formatted(token);

                helper.setText(htmlContent, true);  // true: HTML 형식

                mailSender.send(message);

                return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, "이메일 전송 성공"));
            });
        } else {
            return Mono.fromCallable(() -> {
                String reasonLabel;
                switch (employeeSignUpApproval.getDeniedReason()) {
                    case "ACCOUNT_ALREADY_EXISTS":
                        reasonLabel = "이미 계정이 발급된 사원";
                        break;
                    case "CONTRACT_EMPLOYEE_RESTRICTED":
                        reasonLabel = "계약직/기간제 사용 제한";
                        break;
                    case "PENDING_RESIGNATION":
                        reasonLabel = "퇴사 예정자";
                        break;
                    default:
                        reasonLabel = "기타 사유";
                }

                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                helper.setTo(employee.getEmail());
                helper.setSubject("이메일 인증 요청");
                String htmlContent = """
                                <h2>[이메일 인증 요청]</h2>
                                <p>
                                    안녕하세요,<br><br>
                                    회원가입이 거절되었습니다.
                                    거절 사유: %s
                                </p>
                    """.formatted(reasonLabel);
                helper.setText(htmlContent, true);  // true: HTML 형식

                mailSender.send(message);

                return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, "이메일 전송 성공"));
            });
        }
    }

    @Override
    public Mono<ResponseEntity<ResponseDto<String>>> verifyEmployeeUpdate(String token) {
        return Mono.fromCallable(() -> {
            String email = verificationTokens.get(token);

            if (email == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ResponseDto.fail(ResponseCode.TOKEN_EXPIRED, ResponseMessageKorean.TOKEN_EXPIRED));
            }

            Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("직원이 존재하지 않습니다."));

            return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS));
        });
    }

    @Override
    public Mono<ResponseEntity<ResponseDto<String>>> employeeUpdate(String token, EmployeeUpdateRequestDto dto) {
        return Mono.fromCallable(() -> {
            String email = verificationTokens.get(token);

            if (email == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ResponseDto.fail(ResponseCode.TOKEN_EXPIRED, ResponseMessageKorean.TOKEN_EXPIRED));
            }

            Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("직원이 존재하지 않습니다."));

            String phoneNumber = dto.getPhoneNumber();
            LocalDate birthDate = dto.getBirthDate();
            Long branchId = dto.getBranchId();

            Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new IllegalArgumentException("지점이 존재하지 않습니다."));

            if (employeeRepository.existsByPhoneNumber(phoneNumber)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ResponseDto.fail(ResponseCode.DUPLICATED_TEL_NUMBER, ResponseMessageKorean.DUPLICATED_TEL_NUMBER));
            }

            employee.setPhoneNumber(phoneNumber);
            employee.setBirthDate(birthDate);
            employee.setBranchId(branch);
            employee.setIsApproved(IsApproved.PENDING);

            Employee newEmployee = employeeRepository.save(employee);

            EmployeeSignUpApproval employeeSignupApproval = EmployeeSignUpApproval.builder()
                .employeeId(newEmployee)
                .appliedAt(newEmployee.getCreatedAt())
                .isApproved(newEmployee.getIsApproved())
                .build();

            employeeSignUpApprovalRepository.save(employeeSignupApproval);

            verificationTokens.remove(token);

            return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.success(ResponseCode.SUCCESS, ResponseMessageKorean.SUCCESS, "비밀번호가 변경되었습니다."));
        });
    }
}
