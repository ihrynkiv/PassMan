import React from 'react'
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import ContactMailIcon from '@mui/icons-material/ContactMail';

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
                  <IconButton edge="end" aria-label="Copy username">
                    <ContactMailIcon/>
                  </IconButton>
                  <IconButton edge="end" aria-label="Copy password">
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