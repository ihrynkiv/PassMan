import {useHistory} from "react-router-dom";
import {Button, Typography} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React from 'react'

const STYLES = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '40px 10px'
  },
  btn: {
    marginTop: '10px'
  }
}

export const NoItems = ({message = 'There are no Items'}) => {
  const history = useHistory()
  const handleCreate = () => history.push('/add')

  return (
    <div style={STYLES.wrapper}>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        textAlign="center"
      >
        {message}
      </Typography>
      <Button
        variant="contained"
        style={STYLES.btn}
        endIcon={<AddCircleIcon />}
        onClick={handleCreate}
      >
        Create
      </Button>
    </div>
  )
}