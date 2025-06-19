import { signUpResultRequest } from "@/apis/auth/auth";
import Modal from "@/apis/constants/Modal";
import {
  employeeSignUpApprovalRequest,
  employeeSignUpListeRequest,
} from "@/apis/employee/employee";
import { EmployeeSignUpListResponseDto } from "@/dtos/employee/response/employee-sign-up-list.response.dto copy";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function EmployeeSignUpApprovals() {
  const [employeeList, setEmployeeList] = useState<
    EmployeeSignUpListResponseDto[]
  >([]);
  const [employee, setEmployee] = useState({ employeeId: 0, approvalId: 0 });
  const [message, setMessage] = useState("");
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(employeeList.length / ITEMS_PER_PAGE);

  const [modalStatus, setModalStatus] = useState(false);

  const [deniedReason, setDeniedReason] = useState("");

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setDeniedReason(value);
  };

  const fetchEmployeSignUpList = async () => {
    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    const response = await employeeSignUpListeRequest(token);
    const { code, message, data } = response;

    if (code === "SU" && data) {
      setEmployeeList(data);
      setMessage("");
    } else {
      setEmployeeList([]);
      setMessage(message);
    }
  };

  useEffect(() => {
    fetchEmployeSignUpList();
  }, [token]);

  const paginatedEmployees = employeeList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const onOpenModalClick = async (employee: EmployeeSignUpListResponseDto) => {
    setEmployee({
      employeeId: employee.employeeId,
      approvalId: employee.approvalId,
    });
    setModalStatus(true);
  };

  const onApprovedClick = async (employee: EmployeeSignUpListResponseDto) => {
    if (!token) {
      setMessage("인증 토큰이 없습니다.");
    }

    const response = await employeeSignUpApprovalRequest(
      employee.employeeId,
      { isApproved: "APPROVED", deniedReason: "" },
      token
    );

    const responseBody = await signUpResultRequest(employee.approvalId);

    const { code, message } = response;

    if (code === "SU" && responseBody.code === "SU") {
      alert(message + "\n이메일 전송 성공");
      fetchEmployeSignUpList();
    } else {
      alert(message + "\n이메일 전송 실패: " + responseBody.message);
      fetchEmployeSignUpList();
    }
  };

  const onSubmitClick = async () => {
    if (!token) {
      setMessage("인증 토큰이 없습니다.");
    }

    if (!deniedReason) {
      alert("항목을 선택하세요");
      return;
    }

    const id = { employee: employee.employeeId };
    const approvalId = { employee: employee.approvalId };

    const response = await employeeSignUpApprovalRequest(
      id.employee,
      { isApproved: "DENIED", deniedReason: deniedReason },
      token
    );

    const responseBody = await signUpResultRequest(approvalId.employee);

    const { code, message } = response;

    if (code === "SU" && responseBody.code == "SU") {
      alert(message + "\n이메일 전송 성공");
      fetchEmployeSignUpList();
    } else {
      alert(message + "\n이메일 전송 실패: " + responseBody.message);
      fetchEmployeSignUpList();
    }

    setModalStatus(false);
  };

  const modalContent: React.ReactNode = (
    <>
      <h1>거절 사유</h1>
      <select name="deniedReason" value={deniedReason} onChange={onInputChange}>
        <option value="">거절 사유 선택</option>
        <option value="INVALID_EMPLOYEE_INFO">사원 정보 불일치</option>
        <option value="ACCOUNT_ALREADY_EXISTS">이미 계정이 발급된 사원</option>
        <option value="PENDING_RESIGNATION">퇴사 예정자</option>
      </select>
      <br />
      <button onClick={onSubmitClick}>확인</button>
    </>
  );

  return (
    <div>
      <h1>로그인 승인</h1>
      <table>
        <thead>
          <tr>
            <th>사원 번호</th>
            <th>사원 명</th>
            <th>지점 명</th>
            <th>이메일</th>
            <th>전화 번호</th>
            <th>회원가입 날짜</th>
            <th>승인 상태</th>
            <th>승인</th>
            <th>거절</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.map((employee) => (
            <tr key={employee.approvalId}>
              <td>{employee.employeeNumber}</td>
              <td>{employee.employeeName}</td>
              <td>{employee.branchName}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>{new Date(employee.appliedAt || "").toLocaleString()}</td>
              <td>{employee.isApproved === "PENDING" ? "대기 중" : "오류"}</td>
              <td>
                <button onClick={() => onApprovedClick(employee)}>승인</button>
              </td>
              <td>
                <button onClick={() => onOpenModalClick(employee)}>거절</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            이전
          </button>
          <span style={{ margin: "0 10px" }}>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      )}
      {modalStatus && (
        <Modal
          isOpen={modalStatus}
          onClose={() => setModalStatus(false)}
          children={modalContent}
        />
      )}
    </div>
  );
}

export default EmployeeSignUpApprovals;
