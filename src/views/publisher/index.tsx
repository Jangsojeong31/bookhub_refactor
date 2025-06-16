import React from 'react'
import CreatePublisher from './CreatePublisher'
import { Route, Routes } from 'react-router-dom'
import UpdatePublisher from './UpdatePublisher'
import PublisherPage from './PublisherPage'


function Publisher() {


  return (
    <Routes>
      {/* <Route path='/publishers' element={<CreatePublisherModalLauncher />} /> */}
      <Route path="/" element={<PublisherPage />} />
      {/* <Route path='/:publisherId' element={<UpdatePublisher />} /> */}
    </Routes>
  )
}

export default Publisher