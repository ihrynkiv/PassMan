import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react'
import {useHistory} from "react-router-dom";

export const Navigation = () => {
  const [value, setValue] = React.useState(0);

  const history = useHistory()

  const navigationHandle = (url) => history.push(url)

  return (
      <BottomNavigation
        showLabels
        value={value}
        style={{backgroundColor: '#e0e0e0'}}
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