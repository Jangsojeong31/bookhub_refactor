import {
  GET_ALL_AUTHORITY_URL,
  GET_ALL_POSITION_URL,
  GET_BRANCH_URL,
} from "@/apis";
import Modal from "@/apis/constants/Modal";
import {
  employeeChangeRequestDto,
  employeeDetailRequest,
  employeeExitUpdateRequest,
  employeeRequest,
} from "@/apis/employee/employee";
import { Authority } from "@/dtos/authority/authority";
import { EmployeeDetailResponseDto } from "@/dtos/employee/response/employee-detail.response.dto";
import { EmployeeListResponseDto } from "@/dtos/employee/response/employee-list.response.dto";
import { Position } from "@/dtos/position/position";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const statusOptions = ["EMPLOYED", "EXITED"];
const ITEMS_PER_PAGE = 10;

interface Branch {
  branchId: number;
  branchName: string;
}

function EmployeeChange() {
  const [searchForm, setSearchForm] = useState({
    name: "",
    branchName: "",
    positionName: "",
    authorityName: "",
    status: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [cookies] = useCookies(["accessToken"]);

  const [employeeList, setEmployeeList] = useState<EmployeeListResponseDto[]>(
    []
  );
  const [message, setMessage] = useState("");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [authorities, setAuthorities] = useState<Authority[]>([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalExitStatus, setModalExitStatus] = useState(false);
  const [employee, setEmployee] = useState<EmployeeDetailResponseDto>({
    employeeId: 0,
    employeeNumber: 0,
    employeeName: "",
    branchId: 0,
    branchName: "",
    positionId: 0,
    positionName: "",
    authorityId: 0,
    authorityName: "",
    email: "",
    phoneNumber: "",
    birthDate: new Date(),
    status: "EMPLOYED",
    createdAt: new Date(),
  });

  const [form, setForm] = useState({
    branchId: 0,
    positionId: 0,
    authorityId: 0,
  });

  const [exit, setExit] = useState({
    status: "EMPLOYED",
    exitReason: "",
  });

  const totalPages = Math.ceil(employeeList.length / ITEMS_PER_PAGE);

  useEffect(() => {
    fetch(`${GET_BRANCH_URL}?branchLocation=전체`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBranches(data.data);
      })
      .catch((e) => console.error(e));

    fetch(`${GET_ALL_POSITION_URL}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPositions(data.data);
      })
      .catch((e) => console.error(e));

    fetch(`${GET_ALL_AUTHORITY_URL}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAuthorities(data.data);
      })
      .catch((e) => console.error(e));
  }, []);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchForm({ ...searchForm, [name]: value });
  };

  const onExitReasonSelectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setExit({ ...exit, [name]: value });
  };

  const onEmployeeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: Number(value) });
  };

  const token = cookies.accessToken;

  const onSearchClick = async () => {
    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    const response = await employeeRequest(searchForm, token);
    const { code, message, data } = response;

    if (code === "SU" && data) {
      setEmployeeList(data);
      setMessage("");
    } else {
      setEmployeeList([]);
      setMessage(message);
    }
  };

  const paginatedEmployees = employeeList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const onOpenModalUpdateClick = async (employee: EmployeeListResponseDto) => {
    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    const response = await employeeDetailRequest(employee.employeeId, token);
    const { code, message, data } = response;

    if (code === "SU" && data) {
      setEmployee(data);
      setForm({
        branchId: data.branchId,
        positionId: data.positionId,
        authorityId: data.authorityId,
      });
    } else {
      setMessage(message);
      return;
    }

    setModalStatus(true);
  };

  const onOpenModalExitUpdateClick = async (
    employee: EmployeeListResponseDto
  ) => {
    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    if (employee.status === "EXITED") {
      alert("이미 퇴사 처리 되었습니다.");
      return;
    }

    const response = await employeeDetailRequest(employee.employeeId, token);
    const { code, message, data } = response;

    if (code === "SU" && data) {
      setEmployee(data);
      setExit({ status: data.status, exitReason: "" });
    } else {
      setMessage(message);
      return;
    }

    setModalExitStatus(true);
  };

  const onUpdateClick = async () => {
    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    const response = await employeeChangeRequestDto(
      employee.employeeId,
      {
        branchId: form.branchId,
        positionId: form.positionId,
        authorityId: form.authorityId,
      },
      token
    );

    const { code, message } = response;

    if (code === "SU") {
      alert(message);
    } else {
      alert(message);
      return;
    }

    setModalStatus(false);

    onSearchClick();
  };

  const onExitUpdateClick = async () => {
    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    if (exit.exitReason == "") {
      alert("항목을 선택해주세요");
      return;
    }

    const response = await employeeExitUpdateRequest(
      employee.employeeId,
      {
        status: "EXITED",
        exitReason: exit.exitReason,
      },
      token
    );

    const { code, message } = response;

    if (code === "SU") {
      alert(message);
    } else {
      alert("이미 퇴사 처리 되었습니다.");
    }

    setModalExitStatus(false);

    onSearchClick();
  };

  const modalContent: React.ReactNode = (
    <>
      <h1>사원 세부 사항</h1>
      <p>사원 번호: {employee.employeeNumber}</p>
      <p>사원 이름: {employee.employeeName}</p>
      <p>
        지점 명:
        <select
          name="branchId"
          value={form.branchId}
          onChange={onEmployeeChange}
        >
          <option value="">지점을 선택하세요</option>
          {branches.map((branch) => (
            <option key={branch.branchId} value={branch.branchId}>
              {branch.branchName}
            </option>
          ))}
        </select>
      </p>
      <p>
        지급 명:
        <select
          name="positionId"
          value={form.positionId}
          onChange={onEmployeeChange}
        >
          <option value="">직급 선택</option>
          {positions.map((positon) => (
            <option key={positon.positionId} value={positon.positionId}>
              {positon.positionName}
            </option>
          ))}
        </select>
      </p>
      <p>
        권한 명:
        <select
          name="authorityId"
          value={form.authorityId}
          onChange={onEmployeeChange}
        >
          <option value="">권한 선택</option>
          {authorities.map((authority) => (
            <option key={authority.authorityId} value={authority.authorityId}>
              {authority.authorityName}
            </option>
          ))}
        </select>
      </p>
      <p>이메일: {employee.email}</p>
      <p>전화 번호: {employee.phoneNumber}</p>
      <p>생년월일: {new Date(employee.birthDate || "").toLocaleDateString()}</p>
      <p>재직 상태: {employee.status === "EXITED" ? "퇴사" : "재직"}</p>
      <p>입사 일자: {new Date(employee.createdAt || "").toLocaleString()}</p>

      <button onClick={onUpdateClick}>수정</button>
    </>
  );

  const modalExitContent: React.ReactNode = (
    <>
      <h1>퇴직 처리</h1>
      <select
        name="exitReason"
        value={exit.exitReason}
        onChange={onExitReasonSelectChange}
      >
        <option value="">퇴직 사유를 선택하세요</option>
        <option value="RETIREMENT">정년 퇴직</option>
        <option value="VOLUNTEER">자진 퇴사</option>
        <option value="FORCED">권고 사직</option>
        <option value="TERMINATED">해고</option>
      </select>
      <br />
      <button onClick={onExitUpdateClick}>퇴사</button>
    </>
  );

  return (
    <div>
      <h2>직원 수정</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={searchForm.name}
          onChange={onInputChange}
        />

        <select
          name="branchName"
          value={searchForm.branchName}
          onChange={onInputChange}
        >
          <option value="">지점 선택</option>
          {branches.map((branch) => (
            <option key={branch.branchName} value={branch.branchName}>
              {branch.branchName}
            </option>
          ))}
        </select>
        <select
          name="positionName"
          value={searchForm.positionName}
          onChange={onInputChange}
        >
          <option value="">직급 선택</option>
          {positions.map((p) => (
            <option key={p.positionName} value={p.positionName}>
              {p.positionName}
            </option>
          ))}
        </select>

        <select
          name="authorityName"
          value={searchForm.authorityName}
          onChange={onInputChange}
        >
          <option value="">권한 선택</option>
          {authorities.map((a) => (
            <option key={a.authorityName} value={a.authorityName}>
              {a.authorityName}
            </option>
          ))}
        </select>

        <select
          name="status"
          value={searchForm.status}
          onChange={onInputChange}
        >
          <option value="">상태 선택</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s === "EXITED" ? "퇴사" : "재직"}
            </option>
          ))}
        </select>

        <button onClick={onSearchClick}>검색</button>
      </div>

      {message && <p style={{ color: "red" }}>{message}</p>}

      <table
        border={1}
        cellPadding={10}
        style={{ width: "100%", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th>사번</th>
            <th>이름</th>
            <th>지점</th>
            <th>직급</th>
            <th>권한</th>
            <th>상태</th>
            <th>정보 수정</th>
            <th>퇴사 처리</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.map((emp) => (
            <tr key={emp.employeeId}>
              <td>{emp.employeeNumber}</td>
              <td>{emp.employeeName}</td>
              <td>{emp.branchName}</td>
              <td>{emp.positionName}</td>
              <td>{emp.authorityName}</td>
              <td>{emp.status === "EXITED" ? "퇴사" : "재직"}</td>
              <td>
                <button onClick={() => onOpenModalUpdateClick(emp)}>
                  정보 수정
                </button>
              </td>
              <td>
                <button onClick={() => onOpenModalExitUpdateClick(emp)}>
                  퇴사 처리
                </button>
              </td>
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
      {modalStatus && (
        <Modal
          isOpen={modalStatus}
          onClose={() => setModalStatus(false)}
          children={modalContent}
        />
      )}
      {modalExitStatus && (
        <Modal
          isOpen={modalExitStatus}
          onClose={() => setModalExitStatus(false)}
          children={modalExitContent}
        />
      )}
    </div>
  );
}

export default EmployeeChange;
