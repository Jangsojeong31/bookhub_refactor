import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreatePolicy from './CreatePolicy'

function Policy() {
  return (
    <div>
      <Routes>
        <Route path = '/create' element={<CreatePolicy/>}/>
      </Routes>


    </div>
  )
}

export default Policy