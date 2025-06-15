import MainCommon from './MainCommon'
import { Route } from 'react-router-dom'

function Main() {
  return (
    <>
    <Route path = "/main" element = {<MainCommon />} />
    </>
  )
}

export default Main