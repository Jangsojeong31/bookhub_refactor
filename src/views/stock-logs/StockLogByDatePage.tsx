import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { StockLogResponseDto } from '@/dtos/stock/StockLog.response.dto'
import { getStockLogsByDate } from '@/apis/stock/stockLog'

const StockLogByDatePage = () => {
  const { branchId } = useParams()
  const [searchParams] = useSearchParams()
  const [cookies] = useCookies(['accessToken'])
  const [logs, setLogs] = useState<StockLogResponseDto[]>([])

  // yyyy-MM-ddTHH:mm:ss
  const start = searchParams.get('start') || '2024-01-01T00:00:00'
  const end = searchParams.get('end') || '2025-12-31T23:59:59'

  useEffect(() => {
    if (!branchId) return
    getStockLogsByDate(Number(branchId), start, end, cookies.accessToken)
      .then(res => setLogs(res.data))
      .catch(() => setLogs([]))
  }, [branchId, start, end, cookies.accessToken])

  return (
    <div>
      <h2>날짜별 재고 로그 (branchId: {branchId}, {start} ~ {end})</h2>
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
export default StockLogByDatePage
