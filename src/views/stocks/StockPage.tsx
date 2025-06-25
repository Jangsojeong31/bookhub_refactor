import { getStockByIsbn, getStockByTitle, getStockByBranch } from "@/apis/stock/stock";
import { StockListResponseDto } from "@/dtos/stock/Stock.response.dto";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import StockUpdateModal from "./StockUpdateModal";

const StockPage: React.FC = () => {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken as string;

  const [stocks, setStocks] = useState<StockListResponseDto[]>([]);
  const [search, setSearch] = useState<string>('');
  const [searchMode, setSearchMode] = useState<'isbn' | 'title' | 'branch'>('isbn');
  const [branchId, setBranchId] = useState<number>(0);

  const [selected, setSelected] = useState<StockListResponseDto | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const fetchStocks = async () => {
    if (!accessToken) return;
    try {
      let res;
      if (searchMode === 'isbn') {
        res = await getStockByIsbn(search, accessToken);
      } else if (searchMode === 'title') {
        res = await getStockByTitle(search, accessToken);
      } else {
        res = await getStockByBranch(branchId, accessToken);
      }
      if (res.code === 'SU' && res.data) {
        setStocks(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, [accessToken, searchMode, search, branchId]);

  const onOpenUpdate = (stock: StockListResponseDto) => {
    setSelected(stock);
    setIsUpdateOpen(true);
  };
  const onCloseUpdate = () => {
    setSelected(null);
    setIsUpdateOpen(false);
  };
  const onUpdated = () => {
    onCloseUpdate();
    fetchStocks();
  };

  return (
    <div className="stock-page-container">
      <div className="topBar">
        <select
          value={searchMode}
          onChange={(e) => setSearchMode(e.target.value as any)}
        >
          <option value="isbn">ISBN</option>
          <option value="title">제목</option>
          <option value="branch">지점</option>
        </select>
        {searchMode !== 'branch' ? (
          <input
            className="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              searchMode === 'isbn'
                ? 'ISBN 입력'
                : '제목 키워드 입력'
            }
          />
        ) : (
          <input
            className="search"
            type="number"
            value={branchId || ''}
            onChange={(e) => setBranchId(Number(e.target.value))}
            placeholder="지점 ID 입력"
          />
        )}
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Stock ID</th>
              <th>지점</th>
              <th>책 제목</th>
              <th>수량</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length === 0 ? (
              <tr>
                <td colSpan={5} className="gray-text">데이터가 없습니다.</td>
              </tr>
            ) : (
              stocks.map((st) => (
                <tr key={st.stockId}>
                  <td>{st.stockId}</td>
                  <td>{st.branchName}</td>
                  <td>{st.bookTitle}</td>
                  <td>{st.amount}</td>
                  <td>
                    <button onClick={() => onOpenUpdate(st)}>수정</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isUpdateOpen && selected && (
  <StockUpdateModal
    stock={selected}
    onClose={onCloseUpdate}
    onUpdated={onUpdated}  // ← 이 콜백이 Modal로 전달되어야 목록 갱신이 됩니다.
  />
)}

    </div>
  );
};

export default StockPage;