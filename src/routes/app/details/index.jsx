import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Link from '@mui/material/Link'
import './details.css'

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

function Details() {
  const { appId } = useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Mobile')
  const [framework, setFramework] = useState('Django')
  const [domainName, setDomainName] = useState('')

  useEffect(() => {
    if(appId) {
      const data = {
          name,
          description,
          type,
          framework,
          domain_name: domainName
      }
      fetch(`/api/v1/apps/${appId}`, {
        credentials: 'include'
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        // fallback because app create is broken
        return response.detail === 'Not found.'
        ? {
          name: 'My App',
          description: 'This is my first app.',
          type: 'Mobile',
          framework: 'React Native',
          domain_name: 'first'
        } : response
      })
      .then(response => {
        setName(response.name)
        setDescription(response.description)
        setType(response.type)
        setFramework(response.framework)
        setDomainName(response.domain_name)
      })
    }

  }, [appId])
  return (
    <div className="details" >
      <h3>App Details</h3>
      <List sx={{ backgroundColor: 'background.paper', padding: '2rem' }}>
        <ListItem>
            <TextField color="primary" label="Name" value={name} disabled />
        </ListItem>
        <ListItem>
            <TextField label="Description" value={description} multiline maxRows={4} disabled />
        </ListItem>
        <ListItem>
            <Select label="Type" value={type} disabled >
                <MenuItem value={'Web'}>Web</MenuItem>
                <MenuItem value={'Mobile'}>Mobile</MenuItem>
            </Select>
        </ListItem>
        <ListItem>
            <Select label="Framework" value={framework} disabled >
                <MenuItem value={'Django'}>Django</MenuItem>
                <MenuItem value={'React Native'}>React Native</MenuItem>
            </Select>
        </ListItem>
        <ListItem>
            <TextField label="Domain Name" value={domainName} disabled />
        </ListItem>
        <ListItem>
            <Link href={`/app/update/${appId}`}>
                <Button variant="contained" >Update</Button>
            </Link>
            <Button className="button" color="error" variant="contained" onClick={() => deleteApp({ appId })}>Delete</Button>
            <Link href="/dashboard">
              <Button className="button" variant="contained">Back</Button>
            </Link>
        </ListItem>
      </List>
    </div>
  )
}
  
export default Details
