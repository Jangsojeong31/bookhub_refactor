import { deletePublisher } from '@/apis/publisher/publisher';
import { stockSearchByBranch } from '@/apis/stock/stock';
import { StockListResponseDto, StockUpdateResponseDto } from '@/dtos/stock/Stock.response.dto';
import { useEmployeeStore } from '@/stores/employee.store';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';


function StockPage() {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
    const branchId = useEmployeeStore(state => state.employee?.branchId);

  //검색하는 법
  const [search,setSearch] = useState<string>('');

  const [stocks, setStocks] = useState<StockListResponseDto[]>([]);

  // 페이징 상태
    const [currentPage, setCurrentPage] = useState<number>(0);
    const pageSize = 10;
    const [totalPages, setTotalPages] = useState<number>(0);

  const [selectStock, setSelectedStock] = useState<StockUpdateResponseDto |null>(null);
  const[isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);

  

  const fetchPage = async (page : number, keyword? : string) => {
    if(!accessToken) return;
    try{
      //SearchByBranch(branch)
      const response = await stockSearchByBranch(branchId, accessToken);
      if(response.code ==='SU' && response.data){
        const pageData = response.data as StockListResponseDto[];
        setSearch(pageData.)
        
      }else{
        console.error('목록 조회 실패', response.message);
      }

        // accessToken 이 바뀌거나 search 가 바뀔 때마다 재조회
        useEffect(() => {
          fetchPage(0, search.trim() || undefined);
        }, [accessToken, search]);
      
        const onDelete = async(id:number) =>{
          if (!window.confirm('정말 삭제하시겠습니까?')) return;
          if (!accessToken) return;
          try{
            const response = await deletePublisher(id, accessToken);
                  if (response.code === 'SU') {
                    // 삭제 후 빈 페이지라면 이전 페이지로
                    if (stocks.length === 1 && currentPage > 0) {
                      fetchPage(currentPage - 1, search.trim() || undefined);
                    } else {
                      fetchPage(currentPage, search.trim() || undefined);
                    }
                  } else {
                    alert(response.message || '삭제 중 오류');
                  }

          }catch(err){
            console.error('삭제 중 예외:', err);
            alert('삭제 중 오류가 발생했습니다.');
          }
        }
      //book - get (Isbn)
      
  // 페이지네이션
  const goToPage = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    fetchPage(page, search.trim() || undefined);
  };
  const goPrev = () => {
    if (currentPage > 0) goToPage(currentPage - 1);
  };
  const goNext = () => {
    if (currentPage < totalPages - 1) goToPage(currentPage + 1);
  };

      
    }catch(err){
      console.error('stock 조회 중 예외', err);
    }
  }

  return (
    <div>StockPage</div>
  )
}

export default StockPage