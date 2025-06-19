import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { StockLogResponseDto } from '@/dtos/stock/StockLog.response.dto'
import { getStockLogsByEmployee } from '@/apis/stock/stockLog'

const StockLogByEmployeePage = () => {
  const { employeeId } = useParams()
  const [cookies] = useCookies(['accessToken'])
  const [logs, setLogs] = useState<StockLogResponseDto[]>([])

  useEffect(() => {
    if (!employeeId) return
    getStockLogsByEmployee(Number(employeeId), cookies.accessToken)
      .then(res => setLogs(res.data))
      .catch(() => setLogs([]))
  }, [employeeId, cookies.accessToken])

  return (
    <div>
      <h2>사원별 재고 로그(employeeId: {employeeId})</h2>
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
export default StockLogByEmployeePage
