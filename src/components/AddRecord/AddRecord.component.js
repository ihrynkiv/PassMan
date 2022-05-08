import React, {useEffect, useState} from 'react'
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createPassword} from "../../store/passwords/passwords.slice";
import {Toast} from "../Toast/Toast.component";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {whoAmIAction} from "../../store/auth/auth.slice";

const STYLES = {
  textField: { padding: '8px' },
  btn: { margin: '0 8px' },
  mainBlock: { margin: '5px' }
}

export const AddRecord = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(whoAmIAction())
  }, [])

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [url, setUrl] = useState('')
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('Record was successfully added')

  const cancelClickHandler = () => {
    history.push('/')
  }

  const addRecordClickHandler = () => {
    dispatch(createPassword({name, username, password, url}))
      .then((res) => {
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

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

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
        margin="normal"
        styles={STYLES.textField}
        type={showPassword ? "text" : "password"}
        InputProps={{ // <-- This is where the toggle button is added.
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPassword}
                onMouseDown={handleShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <div>
          <Button color="secondary"
                  variant="contained"
                  endIcon={<CancelIcon/>}
                  style={STYLES.btn}
                  onClick={cancelClickHandler}
          >
            Cancel
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            endIcon={<SaveIcon/>}
            style={STYLES.btn}
            onClick={addRecordClickHandler}
          >
            Save
          </Button>
        </div>
      </div>
      <Toast message={message} open={open} setOpen={setOpen}/>
    </div>
  )
}