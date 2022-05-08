import {BottomNavigation, BottomNavigationAction, useTheme} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import FolderIcon from '@mui/icons-material/Folder';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const TAB_ID_BY_PATH = {
  tab: 0,
  vault: 1,
  generator: 2,
  settings: 3,
  'index.html': 0,
}

export const Navigation = () => {
  const path = window.location.pathname.replace('/', '')

  const [value, setValue] = useState(TAB_ID_BY_PATH[path] || 0)

  const history = useHistory()
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  const navigationHandle = (url) => history.push(url)

  useEffect(() => {
    const tabId = TAB_ID_BY_PATH[path]
    if (tabId !== undefined) {
      setValue(tabId)
    }
  }, [path])

  return (
      <BottomNavigation
        showLabels
        value={value}
        style={{backgroundColor: isDarkMode ? '#1c1b1b' : '#e0e0e0'}}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Tab" icon={<FolderIcon />} onClick={() => navigationHandle('/tab')}/>
        <BottomNavigationAction label="My Vault" icon={<LockIcon />} onClick={() => navigationHandle('/vault')}/>
        <BottomNavigationAction label="Generator" icon={<AutorenewIcon />} onClick={() => navigationHandle('/generator')}/>
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} onClick={() => navigationHandle('/settings')}/>
      </BottomNavigation>
  );
}