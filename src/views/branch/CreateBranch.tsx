import {
  branchCreateRequest,
  branchDetailRequest,
  branchSearchRequest,
  branchUpdateRequest,
} from "@/apis/branch/branch";
import Modal from "@/apis/constants/Modal";
import { BranchSearchResponseDto } from "@/dtos/branch/response/branch-search.respnse.dto";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

const ITEMS_PAGE = 10;

function CreateBranch() {
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;
  const [searchForm, setSearchForm] = useState({ branchLocation: "" });
  const [branchList, setBranchList] = useState<BranchSearchResponseDto[]>([]);
  const [branchDetail, setBranchDetail] = useState({
    branchId: 0,
    branchName: "",
    branchLocation: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(branchList.length / ITEMS_PAGE);
  const [createBranch, setCreateBranch] = useState({
    branchName: "",
    branchLocation: "",
  });

  const [modalStatus, setModalStatus] = useState(false);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(false);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchForm({ ...searchForm, [name]: value });
  };

  const onCreateInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCreateBranch({ ...createBranch, [name]: value });
  };

  const onUpdateInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBranchDetail({ ...branchDetail, [name]: value });
  };

  const onSearchClick = async () => {
    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    const response = await branchSearchRequest(searchForm, token);
    const { code, message, data } = response;

    if (code === "SU" && data) {
      setBranchList(data);
    } else {
      setBranchList([]);
      setCurrentPage(1);
    }
  };

  const onResetClick = () => {
    setSearchForm({ branchLocation: "" });
    setBranchList([]);
  };

  const paginatedBranchList = branchList.slice(
    (currentPage - 1) * ITEMS_PAGE,
    currentPage * ITEMS_PAGE
  );

  const onOpenCreateModal = () => {
    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    setModalStatus(true);
  };

  const onCreateClick = async () => {
    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    const response = await branchCreateRequest(createBranch, token);
    const { code, message } = response;

    if (code === "SU") {
      alert("지점이 등록되었습니다.");
    } else {
      alert(message);
      return;
    }

    setModalStatus(false);
  };

  const modalContent = (
    <>
      <h2>지점 등록</h2>
      <input
        type="text"
        name="branchName"
        value={createBranch.branchName}
        placeholder="지점 명"
        onChange={onCreateInputChange}
      />
      <br />
      <input
        type="text"
        name="branchLocation"
        value={createBranch.branchLocation}
        placeholder="지점 위치"
        onChange={onCreateInputChange}
      />
      <br />
      <button onClick={onCreateClick}>등록</button>
    </>
  );

  const onOpenUpdateModal = async (branch: BranchSearchResponseDto) => {
    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    const response = await branchDetailRequest(branch.branchId, token);
    const { code, message, data } = response;

    if (code === "SU" && data) {
      setBranchDetail(data);
    } else {
      alert(message);
      return;
    }
    setModalUpdateStatus(true);
  };
  
  const modalUpdateContent = (
    <>
      <h2>지점 수정</h2>
      <input
        type="text"
        name="branchName"
        value={branchDetail.branchName}
        placeholder="지점 명"
        onChange={onUpdateInputChange}
        />
      <br />
      <input
        type="text"
        name="branchLocation"
        value={branchDetail.branchLocation}
        placeholder="지점 위치"
        onChange={onUpdateInputChange}
        />
      <br />
      <button onClick={() => onUpdateClick(branchDetail.branchId)}>수정</button>
    </>
  );
  
  const onUpdateClick = async (branchId: number) => {
    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }
    
    const response = await branchUpdateRequest(branchId, branchDetail, token);
    const { code, message } = response;
    
    if (code === "SU") {
      alert("지점이 수정되었습니다.");
    } else {
      alert(message);
      return;
    }
    
    setModalUpdateStatus(false);
    onSearchClick();
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="branchLocation"
          value={searchForm.branchLocation}
          placeholder="지점 주소"
          onChange={onInputChange}
        />
        <button onClick={onSearchClick}>검색</button>
        <button onClick={onResetClick}>최기화</button>
        <button style={{ float: "right" }} onClick={onOpenCreateModal}>
          등록
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>지점 명</th>
            <th>지점 주소</th>
            <th>등록 일자</th>
            <th>지점 수정</th>
            <th>지점 삭제</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBranchList.map((branch) => (
            <tr key={branch.branchId}>
              <td>{branch.branchName}</td>
              <td>{branch.branchLocation}</td>
              <td>{new Date(branch.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => onOpenUpdateModal(branch)}>수정</button>
              </td>
              <td>
                <button>삭제</button>
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
      {modalUpdateStatus && (
        <Modal
          isOpen={modalUpdateStatus}
          onClose={() => setModalUpdateStatus(false)}
          children={modalUpdateContent}
        />
      )}
    </div>
  );
}

export default CreateBranch;
