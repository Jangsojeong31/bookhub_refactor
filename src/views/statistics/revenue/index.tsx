//views/statistics/revenue/index.tsx
import { Route, Routes } from 'react-router-dom';
import RevenueDashboard from './RevenueDashboard';
import RevenueWeekday from './RevenueWeekday'

function Revenue() {
  return (
    <Routes>
      <Route index element = {<RevenueDashboard/>}/>
      <Route path="weekday" element={<RevenueWeekday/>}/>
    </Routes>
  )
}

export default Revenue;