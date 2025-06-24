import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreatePolicy from './CreatePolicy'
import UpdatePolicy from './UpdatePolicy'
import PolicyPage from './PolicyPage'
import PolicyAdmin from './PolicyAdmin'

function Policy() {
  return (
    <Routes>
      <Route path="/" element={<PolicyPage/>}/>
      <Route path="/admin" element={<PolicyAdmin/>}/>
    </Routes>

  )
};

export default Policy;