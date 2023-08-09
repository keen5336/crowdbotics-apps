import React, { useContext, useState } from 'react'
import { changeHandle } from '../../utils'
import { useNavigate } from 'react-router'
import { AuthenticationContext, useAuthentication } from '../../contexts/authentication'

import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import './registration.css'

function Registration() {
  const [,{ setAuthenticatedState, setCsrftoken }] = useAuthentication(useContext(AuthenticationContext))
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigate()

  const register = (data) => {
  
    fetch('/rest-auth/registration/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      setAuthenticatedState('authenticated')
      setCsrftoken(true)
      navigation('/dashboard')
    })
  }
  
  return (
    <div className="registration">
      <h3>Registration</h3>
      <List sx={{ backgroundColor: 'background.paper', padding: '2rem' }}>
          <ListItem>
              <TextField color="primary" label="Name" onChange={changeHandle(setName)} />
          </ListItem>
          <ListItem>
              <TextField color="primary" label="Email" onChange={changeHandle(setEmail)} />
          </ListItem>
          <ListItem>
              <TextField color='primary' label='Password' type='password' onChange={changeHandle(setPassword)} />
          </ListItem>
          <ListItem>
              <Button variant="contained" onClick={() => register({name, email, password})}>Register</Button>
              <Link href="/login">
                  <Button className="cancel" color="error" variant="contained">Cancel</Button>
              </Link>
          </ListItem>
      </List>
    </div>
  )
}
  
export default Registration;