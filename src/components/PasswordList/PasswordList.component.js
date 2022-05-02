import React from 'react'
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import EditIcon from '@mui/icons-material/Edit';

const MOCK_DATA = [
  {
    id: 1,
    name: 'Google',
    url: 'google.com',
  },
  {
    id: 2,
    name: 'Reddit',
    url: 'reddit.com',
  },
  {
    id: 3,
    name: 'Facebook',
    url: 'facebook.com',
  },
]

const STYLES = {
  btn: {margin: '0 1px'}
}

export const PasswordList = () => {
  return (
    <List>
      {
        MOCK_DATA.map((item) => {
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