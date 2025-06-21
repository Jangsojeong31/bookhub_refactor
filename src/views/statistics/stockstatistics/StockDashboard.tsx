import React from 'react'
import BranchStockStatistics from './BranchStockStatistics'
import CategoryStockStatistics from './CategoryStockStatistics'
import TimeStockStatistics from './TimeStockStatistics'
import ZeroStockStatistics from './ZeroStockStatistics'

function StockDashboard() {
  return (
    <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "12px",
        width: "200vh",
        height: "50vh",
        padding: "12px",
      }}>
        <div><BranchStockStatistics/></div>
        <div><CategoryStockStatistics/></div>
        <div><TimeStockStatistics/></div>
        <div><ZeroStockStatistics/></div>
      

      </div>
  )
}

export default StockDashboard;