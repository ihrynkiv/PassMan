import React from 'react'
import {AppBar, Button, IconButton, TextField, Toolbar, Typography} from "@mui/material";

const STYLES = {
  textField: { padding: '8px' },
  btn: { margin: '15px' },
  btnBlock: { display: 'flex', justifyContent: 'center', flexDirection: 'column'},
  mainBlock: { margin: '5px' }
}


export const Login = () => {
  return (
    <div style={STYLES.mainBlock}>
      <TextField
        id="userName"
        label="Username or email"
        variant="outlined"
        fullWidth
        margin="normal"
        styles={STYLES.textField}/>
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        fullWidth
        type="password"
        margin="normal"
        styles={STYLES.textField}/>
      <div style={STYLES.btnBlock}>
        <Button variant="contained" style={STYLES.btn}>
          Login
        </Button>
        <Button href="/registration">Registration</Button>
      </div>
    </div>
  )
}