import { employeeExitLogsRequest } from "@/apis/employeeExitLogs/employeeExitLogs";
import { EmployeeExitLogsResponseDto } from "@/dtos/employee/response/employee-exit-logs.response.dto";
import { tr } from "date-fns/locale";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

const ITEMS_PAGE = 10;
const exitReasonMap: Record<string, string> = {
  RETIREMENT: "정년 퇴직",
  VOLUNTEER: "자진 퇴사",
  FORCED: "권고 사직",
  TERMINATED: "해고",
};

function EmployeeExitLogs() {
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  const [searchForm, setSearchFrom] = useState({
    employeeName: "",
    authorizerName: "",
    exitReason: "",
    startUpdatedAt: "",
    endUpdatedAt: "",
  });

  const [employeeExitLogs, setEmployeeExitLogs] = useState<
    EmployeeExitLogsResponseDto[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(employeeExitLogs.length / ITEMS_PAGE);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchFrom({ ...searchForm, [name]: value });
  };

  const onSearchClick = async () => {
    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    const response = await employeeExitLogsRequest(searchForm, token);
    const { code, message, data } = response;

    if (code === "SU" && data) {
      setEmployeeExitLogs(data);
    } else {
      setEmployeeExitLogs([]);
    }
  };

  const onResetClick = () => {
    setSearchFrom({
      employeeName: "",
      authorizerName: "",
      exitReason: "",
      startUpdatedAt: "",
      endUpdatedAt: "",
    });

    setEmployeeExitLogs([]);
    setCurrentPage(1);
  };

  const paginatedEmployeeExitLogs = employeeExitLogs.slice(
    (currentPage - 1) * ITEMS_PAGE,
    currentPage * ITEMS_PAGE
  );

  return (
    <div>
      <div>
        <input
          type="text"
          name="employeeName"
          value={searchForm.employeeName}
          placeholder="사원 명"
          onChange={onInputChange}
        />
        <input
          type="text"
          name="authorizerName"
          value={searchForm.authorizerName}
          placeholder="관리자 명"
          onChange={onInputChange}
        />
        <select
          name="exitReason"
          value={searchForm.exitReason}
          onChange={onInputChange}
        >
          <option value="">퇴사 사유를 선택하세요.</option>
          <option value="RETIREMENT">정년 퇴직</option>
          <option value="VOLUNTEER">자진 퇴사</option>
          <option value="FORCED">권고 사직</option>
          <option value="TERMINATED">해고</option>
        </select>
        <span>
          <input
            type="date"
            name="startUpdatedAt"
            value={searchForm.startUpdatedAt}
            placeholder="시작 일자"
            onChange={onInputChange}
          />
          ~
          <input
            type="date"
            name="endUpdatedAt"
            value={searchForm.endUpdatedAt}
            placeholder="종료 일자"
            onChange={onInputChange}
          />
        </span>
        <button onClick={onSearchClick}>검색</button>
        <button onClick={onResetClick}>초기화</button>
      </div>
      <table>
        <thead>
          <tr>
            <td>사원 번호</td>
            <td>사원 명</td>
            <td>지점 명</td>
            <td>직급 명</td>
            <td>상태</td>
            <td>퇴사 사유</td>
            <td>권한자 사원 번호</td>
            <td>권한자 명</td>
            <td>퇴사 일자</td>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployeeExitLogs.map((employeeExitLog) => (
            <tr key={employeeExitLog.exitId}>
              <td>{employeeExitLog.employeeNumber}</td>
              <td>{employeeExitLog.employeeName}</td>
              <td>{employeeExitLog.branchName}</td>
              <td>{employeeExitLog.positionName}</td>
              <td>{employeeExitLog.status === "EXITED" ? "퇴사" : "재직"}</td>
              <td>
                {employeeExitLog.exitReason
                  ? exitReasonMap[employeeExitLog.exitReason] ||
                    employeeExitLog.exitReason
                  : "-"}
              </td>
              <td>{employeeExitLog.authorizerNumber}</td>
              <td>{employeeExitLog.authorizerName}</td>
              <td>{new Date(employeeExitLog.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div style={{ marginTop: "20px" }}>
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
    </div>
  );
}

export default EmployeeExitLogs;
