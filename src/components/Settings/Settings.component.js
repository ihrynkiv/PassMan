import React, {useContext} from 'react'
import {ColorModeContext} from "../../App";
import {Box, useTheme} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {useHistory} from "react-router-dom";

export const Settings = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext);
  const history = useHistory()

  const logoutHandler = () => {
    window.localStorage.clear()
    history.push('/login')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '80%',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        {theme.palette.mode} mode
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        Update user info
        <IconButton sx={{ ml: 1 }} color="inherit" onClick={() => history.push('/update-user-info')}>
          <AccountCircleIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          marginTop: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'red',
          borderRadius: 1,
          p: 3,
        }}
      >
        Logout
        <IconButton sx={{ ml: 1 }} color="inherit" onClick={logoutHandler}>
          <LogoutIcon/>
        </IconButton>
      </Box>
    </Box>
  )
}