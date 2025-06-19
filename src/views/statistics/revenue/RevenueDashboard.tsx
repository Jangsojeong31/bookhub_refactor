import React from 'react'
import RevenueWeekday from './RevenueWeekday'

function RevenueDashboard() {
  return (
    
    <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "12px",
        height: "100vh",
        padding: "12px",
      }}>
<div><RevenueWeekday/></div>
<div></div>
<div></div>
<div></div>

      </div>
  )
}

export default RevenueDashboard;