import React, {useState} from 'react'
import { Button, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createPassword} from "../../store/passwords/passwords.slice";
import {Toast} from "../Toast/Toast.component";

const STYLES = {
  textField: { padding: '8px' },
  btn: { margin: '0 8px' },
  mainBlock: { margin: '5px' }
}

export const AddRecord = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [url, setUrl] = useState('')
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('Record was successfully added')

  const history = useHistory()
  const dispatch = useDispatch()

  const cancelClickHandler = () => {
    history.push('/')
  }

  const addRecordClickHandler = () => {
    dispatch(createPassword({name, username, password, url}))
      .then((res) => {
        console.log('res = ', res)
      if(!res.error) {
        setOpen(true)
        history.push('/')
      } else if(res.payload?.response?.status === 401) {
        history.push('/login')
      } else if (res.error) {
        setMessage(res.payload?.message)
        setOpen(true)
      }
    })
  }

  return (
    <div style={STYLES.mainBlock}>
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        styles={STYLES.textField}
      />
      <TextField
        id="userName"
        label="Username or email"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        styles={STYLES.textField}/>
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        margin="normal"
        styles={STYLES.textField}/>
      <TextField
        id="url"
        label="WebSite URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        margin="normal"
        styles={STYLES.textField}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>
          <Button variant="contained" endIcon={<CancelIcon/>} style={STYLES.btn} onClick={cancelClickHandler}>
            Cancel
          </Button>
        </div>
        <div>
          <Button variant="contained" endIcon={<SaveIcon/>} style={STYLES.btn} onClick={addRecordClickHandler}>
            Save
          </Button>
        </div>
      </div>
      <Toast message={message} open={open} setOpen={setOpen}/>
    </div>
  )
}