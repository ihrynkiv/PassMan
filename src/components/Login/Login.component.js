import React, {useState} from 'react'
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {loginAction} from "../../store/auth/auth.slice";
import {useHistory} from "react-router-dom";
import {Toast} from "../Toast/Toast.component";

const STYLES = {
  textField: { padding: '8px' },
  btn: { margin: '15px' },
  btnBlock: { display: 'flex', justifyContent: 'center', flexDirection: 'column'},
  mainBlock: { margin: '5px' }
}

const defaultError = {
  password: {
    hasError: false,
    helperText: ''
  }
}

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(defaultError)
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  const passwordValidation = (value) => {
    if (value.length < 6) {
      setError({...error, password: {hasError: true, helperText: 'password should contain at least 6 characters'}})
    } else {
      setError(defaultError)
    }
  }

  const usernameChangeHandler = (e) => setUsername(e.target.value)
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value)
    passwordValidation(e.target.value)
  }

  const loginClickHandler = () => {
    passwordValidation(password)
    if (error.password.hasError) return

    const user = {username, password}
    dispatch(loginAction(user)).then((res) => {
      if (res.error) {
        setOpen(true)
      } else {
        history.push('/')
      }
    })
  }

  return (
    <div style={STYLES.mainBlock}>
      <TextField
        id="userName"
        label="Username or email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={usernameChangeHandler}
        styles={STYLES.textField}/>
      <TextField
        error={error.password.hasError}
        helperText={error.password.helperText}
        id="password"
        label="Password"
        variant="outlined"
        fullWidth
        type="password"
        margin="normal"
        value={password}
        onChange={passwordChangeHandler}
        styles={STYLES.textField}/>
      <div style={STYLES.btnBlock}>
        <Button variant="contained" style={STYLES.btn} onClick={loginClickHandler}>
          Login
        </Button>
        <Button href="/registration">Registration</Button>
      </div>
      <Toast message="Wrong username or password" open={open} setOpen={setOpen}/>
    </div>
  )
}