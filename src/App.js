import React from 'react';
import './App.css';
import { withCookies } from 'react-cookie';
import { AddRecord } from "./components/AddRecord/AddRecord.component";
import { Header } from "./components/Header/Header.component";
import { PasswordList } from "./components/PasswordList/PasswordList.component";
import {Route, Switch, useHistory} from 'react-router-dom'

const App = () => {
  const history = useHistory()
  return (
    <div className='App'>
      <Header
        onHomeClick={() => history.push('/')}
        onAddRecordClick={() => history.push('/add')}
      />
        <Switch>
          <Route exact path="/" component={PasswordList}/>
          <Route exact path="/add" component={AddRecord}/>
        </Switch>
    </div>
  );
}

export default withCookies(App);
