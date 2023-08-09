import React, { useContext, useEffect, useState } from 'react'
import { AuthenticationContext, useAuthentication } from '../../../../contexts/authentication'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import AodIcon from '@mui/icons-material/Aod'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'


const mockApps = [{
    id: '45',
    name: 'first app',
    description: 'this is the firest app I made',
    type: 'Mobile',
    framework: 'React Native',
    domain_name: 'tada'
},{
    id: '47',
    name: 'second app',
    description: 'you would think this is my second app, but I deleted it',
    type: 'Web',
    framework: 'Django',
    domain_name: 'whatever'
}]

const deleteApp = ({ appId }) => {
    fetch(`/api/v1/apps/${appId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ appId })
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
}


const AppList = () => {
    const [{ authenticatedState }] = useAuthentication(useContext(AuthenticationContext))
    const [apps, setApps] = useState([])

    useEffect(() => {
      if (authenticatedState === 'authenticated') {
        fetch('/api/v1/apps/', { credentials: 'include' })
        .then(response => response.json())
        .then(() => {
          // mock because create app is broken
          return mockApps
        })
        .then(response => {
            setApps(response)
        })
      }
    }, [authenticatedState])
    return (
        <>
        <h3>Applications</h3>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            { apps.map(app => (
                    <ListItem
                    key={`app-${app.id}`}
                    secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteApp({ appId: app.id })}>
                        <DeleteIcon />
                    </IconButton>
                    }
                >
                    <Link href={`app/details/${app.id}`}>
                        <ListItemAvatar>
                            <Avatar>
                                <AodIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                        primary={`${app.name}`}
                        secondary={`${app.description}`}
                        />
                    </Link>
                </ListItem>
            ))}
        </List>
        <Link href="/app/create">
            <Button variant="contained">New App</Button>
        </Link>
      </>
    )
}

export default AppList