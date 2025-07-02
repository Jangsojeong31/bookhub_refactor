// 📁 src/views/location/LocationPage.tsx
import { getLocations, deleteLocation, getLocationDetail } from "@/apis/location/location";
import { LocationDetailResponseDto } from "@/dtos/location/location.dto";
import { PageResponseDto } from "@/dtos/page-response.dto";
import { useEmployeeStore } from "@/stores/employee.store";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { CreateLocation } from "./CreateLocation";
import { UpdateLocation } from "./UpdateLocation";

const PAGE_SIZE = 10;

export default function LocationPage() {
  const [cookies] = useCookies(["accessToken"]);
  const accessToken = cookies.accessToken;
  const branchId = useEmployeeStore((state) => state.employee?.branchId);

  const [bookTitle, setBookTitle] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");

  const [locations, setLocations] = useState<LocationDetailResponseDto[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<LocationDetailResponseDto | null>(null);

  const fetchPage = async (page: number) => {
    if (!accessToken || branchId === undefined) return;
    try {
      const res = await getLocations(
        accessToken,
        page,
        PAGE_SIZE,
        bookTitle.trim() || undefined,
        isbn?.trim() || undefined,
        branchId
      );
      if (res.code === "SU" && res.data) {
        setLocations(res.data.content);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      }
    } catch (err) {
      console.error("진열 위치 조회 오류:", err);
    }
  };

  useEffect(() => {
    fetchPage(0);
  }, [bookTitle, isbn, accessToken, branchId]);

  const goToPage = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    fetchPage(page);
  };

  const handleDelete = async (locationId: number) => {
    if (!accessToken || branchId === undefined) return;
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const res = await deleteLocation(locationId, accessToken, branchId);
      if (res.code === "SU") {
        const isLast = locations.length === 1 && currentPage > 0;
        fetchPage(isLast ? currentPage - 1 : currentPage);
      } else {
        alert(res.message || "삭제 실패");
      }
    } catch (err) {
      console.error("삭제 예외:", err);
    }
  };

  const openUpdateModal = async (locationId: number) => {
    if (!accessToken || branchId === undefined) return;
    try {
      const res = await getLocationDetail(accessToken, branchId, locationId);
      if (res.code === "SU" && res.data) {
        setSelectedLocationId(locationId);
        setSelectedDetail(res.data);
        setIsUpdateOpen(true);
      } else {
        alert(res.message || "상세 조회 실패");
      }
    } catch (err) {
      console.error("상세 조회 오류:", err);
    }
  };

  const handleUpdateClose = () => {
    setIsUpdateOpen(false);
    setSelectedLocationId(null);
    setSelectedDetail(null);
  };

  const handleUpdated = () => {
    handleUpdateClose();
    fetchPage(currentPage);
  };

  return (
    <div className="location-page-container">
      <div className="topBar">
        <button onClick={() => setIsCreateOpen(true)} className="btn-primary">진열 위치 등록</button>
      </div>

      <div className="filters">
        <input
          className="input-search"
          type="text"
          placeholder="도서 제목"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchPage(0)}
        />
        <input
          className="input-search"
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchPage(0)}
        />
        <button onClick={() => fetchPage(0)} className="btn-primary">검색</button>
      </div>

      <table className="table-policy">
        <thead>
          <tr>
            <th>ID</th>
            <th>도서 제목</th>
            <th>ISBN</th>
            <th>층</th>
            <th>홀</th>
            <th>섹션</th>
            <th>진열 방식</th>
    
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => (
            <tr key={loc.locationId}>
              <td>{loc.locationId}</td>
              <td>{loc.bookTitle}</td>
              <td>{loc.floor} </td>
              <td>{loc.hall} </td>
              <td>{loc.section}</td>
              <td>{loc.type}</td>
    
              <td>
                <button onClick={() => openUpdateModal(loc.locationId)} className="modifyBtn">수정</button>
                <button onClick={() => handleDelete(loc.locationId)} className="button">삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button className="btn-primary" disabled={currentPage === 0} onClick={() => goToPage(currentPage - 1)}>이전</button>
        <span>{currentPage + 1} / {totalPages}</span>
        <button className="btn-primary" disabled={currentPage + 1 >= totalPages} onClick={() => goToPage(currentPage + 1)}>다음</button>
      </div>

      {isCreateOpen && (
        <CreateLocation
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSuccess={() => fetchPage(currentPage)}
        />
      )}

      {isUpdateOpen && selectedLocationId != null && selectedDetail && (
        <UpdateLocation
          locationId={selectedLocationId}
          open={isUpdateOpen}
          onClose={handleUpdateClose}
          onSuccess={async () => {
  handleUpdateClose();
  await fetchPage(currentPage);
}}
          //locationDetail={selectedDetail}
        />
      )}
    </div>
  );
}
