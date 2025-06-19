import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { StockLogResponseDto } from '@/dtos/stock/StockLog.response.dto'
import { getStockLogsByBranch } from '@/apis/stock/stockLog'

const StockLogListPage = () => {
  const { branchId } = useParams()
  const [cookies] = useCookies(['accessToken'])
  const [logs, setLogs] = useState<StockLogResponseDto[]>([])

  useEffect(() => {
    if (!branchId) return
    getStockLogsByBranch(Number(branchId), cookies.accessToken)
      .then(res => setLogs(res.data))
      .catch(() => setLogs([]))
  }, [branchId, cookies.accessToken])

  return (
    <div>
      <h2>전체 재고 로그(branchId: {branchId})</h2>
      <ul>
        {logs.map(log => (
          <li key={log.stockLogId}>
            {log.actionDate} | {log.type} | {log.bookTitle} | {log.amount}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default StockLogListPage
