
import { Outlet } from 'react-router-dom'
import AppBar from '../../components/app-bar'

const RootLayout = () => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  )
}

export default RootLayout
