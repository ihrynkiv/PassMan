import React, {useEffect, useState} from 'react'
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch, useSelector} from "react-redux";
import {fetchPasswords} from "../../store/passwords/passwords.slice";
import {getPasswords} from "../../store/passwords/passwords.selector";
import {useHistory} from "react-router-dom";
import {Toast} from "../Toast/Toast.component";
import {NoItems} from "../NoItems/NoItems.component";

const STYLES = {
  btn: {margin: '0 1px'}
}

export const PasswordList = () => {
  const [open, setOpen] = useState(false)
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

  const passwordList = useSelector(getPasswords) || []

  const copyToClipboard = async (fieldName, selectItemId) =>{
    const entity = passwordList.find(({id}) => id === selectItemId)
    setOpen(true)
    return await navigator.clipboard.writeText(entity[fieldName])
  }

  const editClickHandler = (id) => {
    history.push(`/edit/${id}`)
  }

  return (
    <List>
      {
        passwordList.length ? passwordList.map((item) => {
          return (
            <ListItem
              key={item.id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="Edit"
                    style={STYLES.btn}
                    title="Edit"
                    onClick={() => editClickHandler(item.id)}
                  >
                    <EditIcon/>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="Copy username"
                    style={STYLES.btn}
                    title="Copy username"
                    onClick={() => copyToClipboard('username', item.id)}
                  >
                    <ContactMailIcon/>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="Copy password"
                    style={STYLES.btn}
                    title="Copy password"
                    onClick={() => copyToClipboard('password', item.id)}
                  >
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
        }) : <NoItems/>
      }
      <Toast severity="success" message="Copied successfully" setOpen={setOpen} open={open}/>
    </List>
  )
}