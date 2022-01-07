import React from 'react';

import Search from '../search/Search';
import Users from '../user/users/Users';

import { useLogic } from './hooks/useLogic';

import logo from '../../logo.svg';

const App = () => {
  const { filterUsers, handleOnSearch } = useLogic();

  console.log('<App />');

  return (
    <>
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
        <div className="fake-header">{'{JSON} Placeholder'}</div>
      </div>
      <div className="app-container">
        <Search onSearch={handleOnSearch} />
        <Users users={filterUsers} />
      </div>
    </>
  );
}

export default App;
