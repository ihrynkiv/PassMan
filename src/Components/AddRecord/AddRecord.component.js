import React from 'react'
import { Button, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const STYLES = {
  textField: { padding: '8px' },
  btn: { margin: '0 8px' },
  mainBlock: { margin: '5px' }
}

export const AddRecord = () => {
  return (
    <div style={STYLES.mainBlock}>
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        styles={STYLES.textField}
      />
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
        margin="normal"
        styles={STYLES.textField}/>
      <TextField
        id="url"
        label="WebSite URL"
        variant="outlined"
        fullWidth
        margin="normal"
        styles={STYLES.textField}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>
          <Button variant="contained" endIcon={<CancelIcon/>} style={STYLES.btn}>
            Cancel
          </Button>
        </div>
        <div>
          <Button variant="contained" endIcon={<SaveIcon/>} style={STYLES.btn}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}