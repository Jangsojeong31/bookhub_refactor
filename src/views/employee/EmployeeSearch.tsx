import { GET_BRANCH_URL } from "@/apis";
import Modal from "@/apis/constants/Modal";
import {
  employeeDetailResquest,
  employeeResquest,
} from "@/apis/employee/employee";
import { EmployeeDetailResponseDto } from "@/dtos/employee/response/employee-detail.response.dto";
import { EmployeeListResponseDto } from "@/dtos/employee/response/employee-list.response.dto";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const positionOptions = ["사원", "대리", "과장", "부장", "점장"];
const authorityOptions = ["STAFF", "MANAGER", "ADMIN"];
const statusOptions = ["EMPLOYED", "EXITED"];
const ITEMS_PER_PAGE = 10;

interface Branch {
  branchId: number;
  branchName: string;
  branchLocation: string;
}

function EmployeeSearch() {
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
  const [modalStatus, setModalStatus] = useState(false);
  const [employee, setEmployee] = useState<EmployeeDetailResponseDto>();

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
  }, []);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchForm({ ...searchForm, [name]: value });
  };

  const onSearchClick = async () => {
    const token = cookies.accessToken;

    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    const response = await employeeResquest(searchForm, token);
    const { code, message, data } = response;

    if (code === "SU" && data) {
      setEmployeeList(data);
      console.log(employeeList);
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

  const onOpenModalClick = async (employee: EmployeeListResponseDto) => {
    const token = cookies.accessToken;

    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    const response = await employeeDetailResquest(employee.employeeId, token);
    const { code, message, data } = response;

    if (code === "SU") {
      setEmployee(data);
    } else {
      setMessage(message);
      return;
    }

    setModalStatus(true);
  };

  const modalContent: React.ReactNode = (
    <>
      <h1>사원 세부 사항</h1>
      <p>사원 번호: {employee?.employeeNumber}</p>
      <p>사원 이름: {employee?.employeeName}</p>
      <p>지점 명: {employee?.branchName}</p>
      <p>지급 명: {employee?.positionName}</p>
      <p>권한 명: {employee?.authorityName}</p>
      <p>이메일: {employee?.email}</p>
      <p>전화 번호: {employee?.phoneNumber}</p>
      <p>생년월일: {new Date(employee?.birthDate || "").toLocaleDateString()}</p> 
      <p>재직 상태: {employee?.status === "EXITED"? "퇴사": "재직"}</p>
      <p>입사 일자: {new Date(employee?.createdAt || "").toLocaleString()}</p>
    </>
  );

  useEffect(() => {
  console.log("birthDate =", employee?.birthDate);
  console.log("typeof birthDate =", typeof employee?.birthDate);
}, [employee]);


  return (
    <div>
      <h2>직원 검색</h2>
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
          {positionOptions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <select
          name="authorityName"
          value={searchForm.authorityName}
          onChange={onInputChange}
        >
          <option value="">권한 선택</option>
          {authorityOptions.map((a) => (
            <option key={a} value={a}>
              {a}
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
            <th>세부 사항</th>
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
                <button onClick={() => onOpenModalClick(emp)}>세부 사항</button>
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
    </div>
  );
}

export default EmployeeSearch;
