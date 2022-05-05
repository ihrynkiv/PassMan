import React, {useEffect} from 'react'
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {registrationAction} from "../../store/auth/auth.slice";
import {Toast} from "../Toast/Toast.component";
import {fetchUserNames} from "../../store/users/users.slice";
import {getUserNames} from "../../store/users/users.selector";

const STYLES = {
  textField: { padding: '8px' },
  btn: { margin: '15px' },
  btnBlock: { display: 'flex', justifyContent: 'center', flexDirection: 'column'},
  mainBlock: { margin: '5px' }
}

const noError = {
  hasError: false,
  helperText: ''
}

const defaultError = {
  userName: noError,
  password: noError,
  rePassword: noError
}

const defaultErrorMessage = 'something went wrong';

export const Registration = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [error, setError] = useState(defaultError)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(defaultErrorMessage)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchUserNames())
  }, [])

  const userNames = useSelector(getUserNames)

  const usernameChangeHandler = (e) => {
    console.log('userNames = ', userNames)
    console.log('e?.target?.value = ', e?.target?.value)
    if (userNames.includes(e?.target?.value?.toLowerCase())) {
      console.log('here = ')
      setError({...error, userName: {hasError: true, helperText: 'userName is already taken'}})
    } else {
      setError({...error, userName: noError})
    }
    setUsername(e?.target?.value)
  }

  const rePasswordValidation = (value) => {
    if (value.length < 6) {
      setError({...error, rePassword: {hasError: true, helperText: 'password should contain at least 6 characters'}})
    } else {
      setError({...error, rePassword: noError})
    }
  }

  const passwordValidation = (value) => {
    if (value.length < 6) {
      setError({...error, password: {hasError: true, helperText: 'password should contain at least 6 characters'}})
    } else {
      setError({...error, password: noError})
    }
  }

  const rePasswordChangeHandler = (e) => {
    setRePassword(e?.target?.value)
    rePasswordValidation(e?.target?.value)
  }

  const passwordChangeHandler = (e) => {
    setPassword(e?.target?.value)
    passwordValidation(e?.target?.value)
  }

  const registrationClickHandler = () => {
    if (password !== rePassword) {
      setMessage("passwords doesnt match")
      setOpen(true)
      return
    }

    passwordValidation(password)
    rePasswordValidation(rePassword)
    if (error.password.hasError) return

    const user = {username, password}
    dispatch(registrationAction(user)).then((res) => {
      if (res.error) {
         setMessage(res.error.message || defaultErrorMessage)
        setOpen(true)
      } else {
        history.push('/')
      }
    })
  }
console.log('error = ', error)
  return (
    <div style={STYLES.mainBlock}>
      <TextField
        id="userName"
        label="Username or email"
        variant="outlined"
        error={error.userName.hasError}
        helperText={error.userName.helperText}
        fullWidth
        margin="normal"
        value={username}
        onChange={usernameChangeHandler}
        styles={STYLES.textField}/>
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        error={error.password.hasError}
        helperText={error.password.helperText}
        fullWidth
        type="password"
        margin="normal"
        value={password}
        onChange={passwordChangeHandler}
        styles={STYLES.textField}/>
      <TextField
        id="re-password"
        label="Repeat password"
        variant="outlined"
        error={error.rePassword.hasError}
        helperText={error.rePassword.helperText}
        fullWidth
        type="password"
        margin="normal"
        value={rePassword}
        onChange={rePasswordChangeHandler}
        styles={STYLES.textField}/>
      <div style={STYLES.btnBlock}>
        <Button variant="contained" style={STYLES.btn} onClick={registrationClickHandler}>
          Registration
        </Button>
        <Button href="/login">Login</Button>
      </div>
      <Toast message={message} open={open} setOpen={setOpen}/>
    </div>
  )
}