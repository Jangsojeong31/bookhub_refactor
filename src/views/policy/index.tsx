import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreatePolicy from './CreatePolicy'
import UpdatePolicy from './UpdatePolicy'
import PolicyPage from './PolicyPage'

function Policy() {
  return (
    <Routes>
      <Route path="/" element={<PolicyPage/>}/>
    </Routes>

  )
};

export default Policy;