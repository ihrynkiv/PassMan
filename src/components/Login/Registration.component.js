import React from 'react'
import {Button, TextField} from "@mui/material";

const STYLES = {
  textField: { padding: '8px' },
  btn: { margin: '15px' },
  btnBlock: { display: 'flex', justifyContent: 'center', flexDirection: 'column'},
  mainBlock: { margin: '5px' }
}


export const Registration = () => {
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
      <TextField
        id="re-password"
        label="Repeat password"
        variant="outlined"
        fullWidth
        type="password"
        margin="normal"
        styles={STYLES.textField}/>
      <div style={STYLES.btnBlock}>
        <Button variant="contained" style={STYLES.btn}>
          Registration
        </Button>
        <Button href="/login">Login</Button>
      </div>
    </div>
  )
}