import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './views/auth/SignUp'

function Auth() {
  return (
    <div>
      <div>
        <Routes>
          <Route path='auth/sign-up' element={<SignUp />} />
        </Routes>
      </div>
    </div>
  )
}

export default Auth