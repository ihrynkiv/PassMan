import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const Header = ({ onHomeClick, onAddRecordClick }) => {
  return (
    <AppBar position="static" color="primary" style={{ width: '396px' }} title="PassMan2">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onHomeClick}
        >
          <HomeIcon/>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PassMan
        </Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={onAddRecordClick}
        >
          <AddCircleIcon/>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}