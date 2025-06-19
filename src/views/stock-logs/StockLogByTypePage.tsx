import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { StockLogResponseDto } from '@/dtos/stock/StockLog.response.dto'
import { getStockLogsByType } from '@/apis/stock/stockLog'

const StockLogByTypePage = () => {
  const { branchId } = useParams()
  const [searchParams] = useSearchParams()
  const [cookies] = useCookies(['accessToken'])
  const [logs, setLogs] = useState<StockLogResponseDto[]>([])
  const type = searchParams.get('type') || 'IN'

  useEffect(() => {
    if (!branchId) return
    getStockLogsByType(Number(branchId), type, cookies.accessToken)
      .then(res => setLogs(res.data))
      .catch(() => setLogs([]))
  }, [branchId, type, cookies.accessToken])

  return (
    <div>
      <h2>유형별 재고 로그 (branchId: {branchId}, type: {type})</h2>
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
export default StockLogByTypePage
