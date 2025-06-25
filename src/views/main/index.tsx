import { Route } from 'react-router-dom'
import MainSearchBar from './MainSearchBar'

function Main() {
  return (
    <>
    <Route path = "/main" element = {<MainSearchBar />} />
    </>
  )
}

export default Main