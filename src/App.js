import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RootLayout } from './global/layouts'
import Dashboard from './routes/dashboard'
import Login from './routes/login'
import Registration from './routes/registration'
import Details from './routes/app/details'
import Create from './routes/app/create'
import Update from './routes/app/update'
import { AuthenticationContext, useAuthentication } from './contexts/authentication'

function App() {
  const authentication = useAuthentication(useContext(AuthenticationContext))
  const [{ csrftoken }] = authentication
  return (
      <AuthenticationContext.Provider value={authentication}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="app" >
              <Route path="create" element={<Create />} />
              <Route path="update/:appId" element={<Update />} />
              <Route path="details/:appId" element={<Details />} />
            </Route>
            <Route path="login" element={ <Login />} />
            <Route path="registration" element={<Registration />} />
            <Route path="" element={<Navigate to='/login' />} />
          </Route>
        </Routes>
      </AuthenticationContext.Provider>
  )
}

export default App;
