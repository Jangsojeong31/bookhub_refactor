import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreatePolicy from './CreatePolicy'
import UpdatePolicy from './UpdatePolicy'

function Policy() {
  return (
    <div>
      <>
        <Route path = '/create' element={<CreatePolicy/>}/>
        <Route path = '/:policyId' element={<UpdatePolicy/>}/>
      </>


    </div>
  )
}

export default Policy