import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { storeSelectedUsers } from '../../store/actions/usersAction';

import { getUsers } from '../../api/userRemote';

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
