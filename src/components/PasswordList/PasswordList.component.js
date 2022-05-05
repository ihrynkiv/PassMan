import React, {useEffect} from 'react'
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch, useSelector} from "react-redux";
import {fetchPasswords} from "../../store/passwords/passwords.slice";
import {getPasswords} from "../../store/passwords/passwords.selector";
import {useHistory} from "react-router-dom";

const STYLES = {
  btn: {margin: '0 1px'}
}

export const PasswordList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchPasswords())
      .then(({payload}) => {
      if(payload?.response?.status === 401) {
        history.push('/login')
      }
    })
  }, [])

  const passwordList = useSelector(getPasswords)

  return (
    <List>
      {
        passwordList.map((item) => {
          return (
            <ListItem
              key={item.id}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="Edit" style={STYLES.btn} title="Edit">
                    <EditIcon/>
                  </IconButton>
                  <IconButton edge="end" aria-label="Copy username" style={STYLES.btn}>
                    <ContactMailIcon/>
                  </IconButton>
                  <IconButton edge="end" aria-label="Copy password" style={STYLES.btn}>
                    <KeyIcon/>
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={item.name}
                secondary={item.url}
              />
            </ListItem>
          )
        })
      }
    </List>
  )
}