import React from 'react'
import { Route, Routes } from 'react-router-dom'

import PolicySearch from './PolicySearch';
import PolicyPage from './PolicyPage';

function Policy() {
  return (
    <Routes>
      <Route path="/" element={<PolicySearch/>}/>
      <Route path="/admin" element={<PolicyPage/>}/>
    </Routes>

  )
};

export default Policy;