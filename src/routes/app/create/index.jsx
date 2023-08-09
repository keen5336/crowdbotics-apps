import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { changeHandle } from '../../../utils'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import './create.css'

function Create() {
  const navigation = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Mobile')
  const [framework, setFramework] = useState('Django')
  const [domainName, setDomainName] = useState('')

  const create = (data) => {
    fetch('/api/v1/apps/', {
      method: 'POST',
      credentials: 'include',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      //mock because create app is broken
      navigation(`/app/details/${response.id}`)
    })
  }
  
  return (
    <div className="create" >
      <h3>Create App</h3>
      <List sx={{ backgroundColor: 'background.paper', padding: '2rem' }}>
        <ListItem>
            <TextField color="primary" label="Name" onChange={changeHandle(setName)} />
        </ListItem>
        <ListItem>
            <TextField label="Description" multiline maxRows={4} onChange={changeHandle(setDescription)} />
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
            <TextField label="Domain Name" onChange={changeHandle(setDomainName)} />
        </ListItem>
        <ListItem>
            <Button variant="contained" onClick={() => create({ name, description, type, framework, domain_name: domainName })}>Create App</Button>
            <Link href="/dashboard">
              <Button className="cancel" color="error" variant="contained">Cancel</Button>
            </Link>
        </ListItem>
      </List>
    </div>
  )
}
  
  export default Create