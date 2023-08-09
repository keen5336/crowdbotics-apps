import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthenticationContext, useAuthentication } from '../../contexts/authentication'
import { changeHandle } from '../../utils'

import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import './login.css'

function Login() {
    const [{ authenticatedState }, { setAuthenticatedState, setCsrftoken }] = useAuthentication(useContext(AuthenticationContext))
    const navigation = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('idle')

    useEffect(() => {
        if(login === 'pending') {
            const data = { email, password }
            fetch('/rest-auth/login/', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
              })
              .then(response => response.json())
              .then(response => {
                setLogin('idle')
                setAuthenticatedState('authenticated')
                setCsrftoken(true)
              })
        }
    }, [login, email, password])
    useEffect(() => {
        if(authenticatedState === 'authenticated') {
            navigation('/dashboard')
        }
    }, [authenticatedState])
    return (
        <div className="login" >
            <h3>Login</h3>
            <List sx={{ backgroundColor: 'background.paper', padding: '2rem' }}>
                <ListItem>
                    <TextField color="primary" label="Email" onChange={changeHandle(setEmail)} />
                </ListItem>
                <ListItem>
                    <TextField color="primary" label="Password" type='password' onChange={changeHandle(setPassword)} />
                </ListItem>
                <ListItem>
                    <Button variant="contained"disabled={login === 'pending'}  onClick={() => setLogin('pending')}>Login</Button>
                    <Link href="/registration">
                        <Button className="register" color="error" variant="contained">Register</Button>
                    </Link>
                </ListItem>
            </List>
        </div>
    )
  }
  
  export default Login;