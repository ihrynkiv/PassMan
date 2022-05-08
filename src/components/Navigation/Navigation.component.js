/*global chrome*/
import {BottomNavigation, BottomNavigationAction, useTheme} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react'
import {useHistory} from "react-router-dom";

export const Navigation = () => {
  const [value, setValue] = React.useState(0);

  const history = useHistory()
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  const navigationHandle = (url) => history.push(url)

  // chrome.tabs.query({currentWindow: true, active: true}, async function (tabs) {
  //   console.log(tabs[0].url)
  // });

  return (
      <BottomNavigation
        showLabels
        value={value}
        style={{backgroundColor: isDarkMode ? '#1c1b1b' : '#e0e0e0'}}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="My Vault" icon={<LockIcon />} onClick={() => navigationHandle('/')}/>
        <BottomNavigationAction label="Generator" icon={<ShuffleIcon />} onClick={() => navigationHandle('/generator')}/>
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} onClick={() => navigationHandle('/settings')}/>
      </BottomNavigation>
  );
}