import React from 'react'
import { Route } from 'react-router-dom'
import CreateAuthor from './CreateAuthor'
import ElseAuthor from './ElseAuthor'

function Author() {
  return (
    <>
      <Route path='/author/create' element={<CreateAuthor />} />
      <Route path='/author/else' element={<ElseAuthor />} />
    </>
  )
}

export default Author