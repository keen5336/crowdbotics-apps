import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLocalStorage } from 'usehooks-ts'

const AuthenticationContext = createContext()


const useAuthentication = () => {
    const navigation = useNavigate()
    const [authenticatedState, setAuthenticatedState] = useLocalStorage('authentication', 'unknown')
    const [user, setUser] = useState({})
    const [csrftoken, setCsrftoken] = useLocalStorage('csrftoken', false)

    const logout = () => {
        fetch('/rest-auth/logout/', { credentials: 'include' })
        .then(response => response.json())
        .then(response => {
            setAuthenticatedState('unauthenticated')
            setCsrftoken(false)
            setUser({})
            navigation('/login')
        })
    }

    useEffect(() => {
        if(csrftoken) {
          fetch('/rest-auth/user/', { credentials: 'include' })
          .then(response => response.json())
          .then(response => {
            if(response.pk) {
                setAuthenticatedState('authenticated')
                setUser(response)
            } else {
                setAuthenticatedState('unauthenticated')
                setUser({})
                navigation('/login')
            }
          })
        }
      }, [csrftoken])

    return [{
        authenticatedState,
        user
    },{
        setAuthenticatedState,
        setUser,
        setCsrftoken,
        logout
    }]
}

export {
    AuthenticationContext,
    useAuthentication
}