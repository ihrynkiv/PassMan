import React from 'react';
import './App.css';
import { withCookies } from 'react-cookie';
import { AddRecord } from "./components/AddRecord/AddRecord.component";
import { Header } from "./components/Header/Header.component";
import { PasswordList } from "./components/PasswordList/PasswordList.component";
import {Route, Switch, useHistory} from 'react-router-dom'
import {Login} from "./components/Login/Login.component";
import {BasicHeader} from "./components/Header/BasicHeader.component";
import {Registration} from "./components/Login/Registration.component";
import {EditRecordView} from "./components/EditRecord/EditRecord.controller";

const App = () => {
  const history = useHistory()
  return (
    <div className='App'>
      <Switch>
        <Route exact path="/login" component={BasicHeader} />
        <Route exact path="/registration" component={BasicHeader} />
        <Route path="/" render={() =>
          <Header
            onHomeClick={() => history.push('/')}
            onAddRecordClick={() => history.push('/add')}/>}
        />
      </Switch>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/registration" component={Registration}/>
          <Route exact path="/add" component={AddRecord}/>
          <Route exact path="/edit/:id" component={EditRecordView}/>
          <Route exact path="/" component={PasswordList}/>
          <Route exact path="" component={PasswordList}/>
        </Switch>
    </div>
  );
}

export default withCookies(App);
