import React, { useState } from 'react';
import './App.css';
import { withCookies } from 'react-cookie';
import { AddRecord } from "./components/AddRecord/AddRecord.component";
import { Header } from "./components/Header/Header.component";
import { PAGES } from "./constants/pages.constants";
import { PasswordList } from "./components/PasswordList/PasswordList.component";

const App = () => {
  const [page, setPage] = useState(PAGES.MAIN_PAGE)
  return (
    <div className='App'>
      <Header
        onHomeClick={() => setPage(PAGES.MAIN_PAGE)}
        onAddRecordClick={() => setPage(PAGES.ADD_RECORD)}
      />
      {page === PAGES.MAIN_PAGE && <PasswordList/>}
      {page === PAGES.ADD_RECORD && <AddRecord/>}
    </div>
  );
}

export default withCookies(App);
