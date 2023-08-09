import React, { useContext, useEffect } from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'
import { AuthenticationContext, useAuthentication } from '../../../contexts/authentication'

const BotAppBar = () => {
  const authentication = useAuthentication(useContext(AuthenticationContext))
  const navigation = useNavigate()
  const [{ user, authenticatedState }, { logout }] = authentication

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {user.username}
            </Typography>
            {
              authenticatedState === 'authenticated'
              ? <Button color="inherit" onClick={() => logout()}>Logout</Button>
              : null
            }
            
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default BotAppBar
