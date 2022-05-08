import React, {useState} from 'react'
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deletePassword, updatePassword} from "../../store/passwords/passwords.slice";
import {Toast} from "../Toast/Toast.component";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect} from "react";
import {whoAmIAction} from "../../store/auth/auth.slice";

const STYLES = {
  textField: { padding: '8px' },
  btn: { margin: '0 8px' },
  mainBlock: { margin: '5px' }
}

export const EditRecord = ({configuration, id}) => {
  const [name, setName] = useState(configuration.name)
  const [username, setUsername] = useState(configuration.username)
  const [password, setPassword] = useState(configuration.password)
  const [url, setUrl] = useState(configuration.url)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('Record was successfully updated')

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(whoAmIAction())
  }, [])

  const cancelClickHandler = () => {
    history.goBack()
  }

  const deleteClickHandler = () => {
    dispatch(deletePassword({id})).then((res) => {
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
    history.goBack()
  }

  const updateRecordClickHandler = () => {
    dispatch(updatePassword({data: {name, username, password, url, id}, id: id}))
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
        type={showPassword ? "text" : "password"}
        margin="normal"
        styles={STYLES.textField}
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px'}}>
        <div>
          <Button
            color="error"
            variant="contained"
            style={STYLES.btn}
            endIcon={<DeleteIcon/>}
            onClick={deleteClickHandler}>
            Delete
          </Button>
        </div>
        <div>
          <Button
            color="secondary"
            variant="contained"
            style={STYLES.btn}
            endIcon={<CancelIcon/>}
            onClick={cancelClickHandler}>
            Cancel
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            style={STYLES.btn}
            endIcon={<SaveIcon/>}
            onClick={updateRecordClickHandler}>
            Update
          </Button>
        </div>
      </div>
      <Toast message={message} open={open} setOpen={setOpen}/>
    </div>
  )
}