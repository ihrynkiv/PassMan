import React from 'react';
import './App.css';
import { AddRecord } from "./components/AddRecord/AddRecord.component";
import { Header } from "./components/Header/Header.component";
import { PasswordList } from "./components/PasswordList/PasswordList.component";
import {Route, Switch, useHistory} from 'react-router-dom'
import {Login} from "./components/Login/Login.component";
import {BasicHeader} from "./components/Header/BasicHeader.component";
import {Registration} from "./components/Registration/Registration.component";
import {EditRecordView} from "./components/EditRecord/EditRecord.controller";
import {NoopComponent} from "./components/Noop/Noop.component";
import {Navigation} from "./components/Navigation/Navigation.component";
import {Generator} from "./components/Generator/Generator.component";
import {Settings} from "./components/Settings/Settings.component";
import {useTheme} from "@mui/material";
import {ThemeProvider, createTheme} from "@mui/material/styles";

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const STYLES = {
  DARK_THEME: {
    backgroundColor: '#1e1e1e',
    color: '#eeeeee'
  }
}

const App = () => {
  const history = useHistory()
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'
  const styles = isDarkMode ? STYLES.DARK_THEME : {}
  return (
    <div className='App' style={styles}>
      <Switch>
        <Route exact path="/login" component={BasicHeader} />
        <Route exact path="/registration" component={BasicHeader} />
        <Route path="/" render={() =>
          <Header
            onHomeClick={() => history.push('/')}
            onAddRecordClick={() => history.push('/add')}/>}
        />
      </Switch>

      <div id="content" style={styles}>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/registration" component={Registration}/>
          <Route exact path="/add" component={AddRecord}/>
          <Route exact path="/edit/:id" component={EditRecordView}/>
          <Route exact path="/generator" component={Generator}/>
          <Route exact path="/settings" component={Settings}/>
          <Route exact path="/" component={PasswordList}/>
          <Route exact path="" component={PasswordList}/>
        </Switch>

        <Switch>
          <Route exact path="/login" component={NoopComponent}/>
          <Route exact path="/registration" component={NoopComponent}/>
          <Route path="/" component={Navigation}/>
        </Switch>
      </div>
    </div>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
