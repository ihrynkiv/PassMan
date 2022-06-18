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
import {useQuery} from "../../hooks/useQuery.hook";

const STYLES = {
  btn: {margin: '0 1px'}
}

export const PasswordList = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    dispatch(fetchPasswords())
      .then(({payload}) => {
      if(payload?.response?.status === 401) {
        history.push('/login')
      }
    })
  }, [])

  const passwordList = useSelector(getPasswords) || []
  const [filteredPasswordList, setFilteredPasswordList] = useState(passwordList)
  const search = query.get('search')

  useEffect(() => {
    if(!search) {
      setFilteredPasswordList(passwordList)
    } else {
      const filteredItems = passwordList.filter(item => {
        const matchWithUrl = item.url.toLowerCase().includes(search.toLowerCase())
        const matchWithName = item.name.toLowerCase().includes(search.toLowerCase())
        const matchWithUsername = item.username.toLowerCase().includes(search.toLowerCase())

        return matchWithUrl || matchWithName || matchWithUsername
      })
      setFilteredPasswordList(filteredItems)
    }

  }, [passwordList, search])

  const copyToClipboard = async (fieldName, selectItemId) =>{
    const entity = passwordList.find(({id}) => id === selectItemId)
    setOpen(true)
    return await navigator.clipboard.writeText(entity[fieldName])
  }

  const editClickHandler = (id) => {
    history.push(`/edit/${id}`)
  }

  return (
    <List style={{overflow: 'scroll', height: '450px'}}>
      {
        filteredPasswordList.length ? filteredPasswordList.map((item) => {
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
