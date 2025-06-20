import { branchSearchRequest } from "@/apis/branch/branch";
import { BranchSearchResponseDto } from "@/dtos/branch/response/branch-search.respnse.dto";
import { tr } from "date-fns/locale";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

const ITEMS_PAGE = 10;

function BranchSearch() {
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;
  const [searchForm, setSearchForm] = useState({ branchLocation: "" });
  const [branchList, setBranchList] = useState<BranchSearchResponseDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(branchList.length / ITEMS_PAGE);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchForm({ ...searchForm, [name]: value });
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
      </div>
      <table>
        <thead>
          <tr>
            <th>지점 명</th>
            <th>지점 주소</th>
            <th>등록 일자</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBranchList.map((branch) => (
            <tr key={branch.branchId}>
              <td>{branch.branchName}</td>
              <td>{branch.branchLocation}</td>
              <td>{new Date(branch.createdAt).toLocaleString()}</td>
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

export default BranchSearch;
