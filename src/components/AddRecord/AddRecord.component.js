/*global chrome*/
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
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {SYMBOLS} from "../../constants/vars";

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
  const [password, setPassword] = useState(window.localStorage.getItem('randomizedPassword') || '')
  const [url, setUrl] = useState('')
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('Record was successfully added')

  useEffect(() => {
    chrome.tabs.query({currentWindow: true, active: true}, async function (tabs) {
      const url = new URL(tabs[0].url)
      if (url.protocol.startsWith('http')) {
        setUrl(url.origin)
        const [name] = url.hostname.split('.').slice(-2)
        const upperName = name.charAt(0).toUpperCase() + name.slice(1)
        setName(upperName)
      }

    });
  }, [])

  useEffect(() => window.localStorage.removeItem('randomizedPassword'), [])

  const cancelClickHandler = () => {
    history.goBack()
  }

  const addRecordClickHandler = () => {
    dispatch(createPassword({name, username, password, url}))
      .then((res) => {
      if(!res.error) {
        setOpen(true)
        history.goBack()
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

  const generatePasswordHandler = async () => {
    const symbolsCount = 16
    const symbols = SYMBOLS.split('')
    const res = []

    for (let i = 0; i < symbolsCount; i++) {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]
      res.push(randomSymbol)
    }
    const generatedPassword = res.join('')
    setOpen(true)
    await navigator.clipboard.writeText(generatedPassword)
    setMessage('Password was copied to clipboard')
    setPassword(generatedPassword)
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
              <IconButton
                aria-label="generate password and copy"
                onClick={generatePasswordHandler}
              >
                <AutorenewIcon/>
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