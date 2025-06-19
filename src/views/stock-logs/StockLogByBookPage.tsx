import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { StockLogResponseDto } from '@/dtos/stock/StockLog.response.dto'
import { getStockLogsByBook } from '@/apis/stock/stockLog'

const StockLogByBookPage = () => {
  const { branchId, bookIsbn } = useParams()
  const [cookies] = useCookies(['accessToken'])
  const [logs, setLogs] = useState<StockLogResponseDto[]>([])

  useEffect(() => {
    if (!branchId || !bookIsbn) return
    getStockLogsByBook(Number(branchId), bookIsbn, cookies.accessToken)
      .then(res => setLogs(res.data))
      .catch(() => setLogs([]))
  }, [branchId, bookIsbn, cookies.accessToken])

  return (
    <div>
      <h2>도서별 재고 로그(branchId: {branchId}, ISBN: {bookIsbn})</h2>
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
export default StockLogByBookPage
