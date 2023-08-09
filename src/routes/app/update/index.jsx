import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { changeHandle } from '../../../utils'

import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Link from '@mui/material/Link'
import './update.css'

const update = ({name, description, type, framework, domain_name, appId}) => {
  const data = {
    name,
    description,
    type,
    framework,
    domain_name
  }
  fetch(`/api/v1/apps/${appId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(response => {
    console.log(response)
  })
}

function Update() {
  const { appId } = useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Mobile')
  const [framework, setFramework] = useState('Django')
  const [domainName, setDomainName] = useState('')

  const updateApp = () => update({
    name,
    description,
    type,
    framework,
    domain_name: domainName,
    appId
  })

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
    <div className="update" >
      <h3>Update App</h3>
      <List sx={{ backgroundColor: 'background.paper', padding: '2rem' }}>
        <ListItem>
            <TextField color="primary" label="Name" value={name} onChange={changeHandle(setName)} />
        </ListItem>
        <ListItem>
            <TextField label="Description" value={description} multiline maxRows={4} onChange={changeHandle(setDescription)} />
        </ListItem>
        <ListItem>
            <Select label="Type" value={type} onChange={changeHandle(setType)}>
                <MenuItem value={'Web'}>Web</MenuItem>
                <MenuItem value={'Mobile'}>Mobile</MenuItem>
            </Select>
        </ListItem>
        <ListItem>
            <Select label="Framework" value={framework} onChange={changeHandle(setFramework)}>
                <MenuItem value={'Django'}>Django</MenuItem>
                <MenuItem value={'React Native'}>React Native</MenuItem>
            </Select>
        </ListItem>
        <ListItem>
            <TextField label="Domain Name" value={domainName} onChange={changeHandle(setDomainName)} />
        </ListItem>
        <ListItem>
            <Button variant="contained" onClick={updateApp}>Update App</Button>
            <Link href="/dashboard">
              <Button className="cancel" color="error" variant="contained">Cancel</Button>
            </Link>
        </ListItem>
      </List>
    </div>
  )
}
  
export default Update
