import React from 'react';
import './App.css';
import { withCookies } from 'react-cookie';
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

      <div id="content">
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

export default withCookies(App);
