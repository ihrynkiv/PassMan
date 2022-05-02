import {AppBar, Toolbar, Typography} from "@mui/material";
import React from "react";

export const BasicHeader = () => {
  return (
    <AppBar position="static" color="primary" style={{ width: '396px' }} title="PassMan">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PassMan
        </Typography>
      </Toolbar>
    </AppBar>
  )
}