import React from 'react';

import Search from '../search/Search';
import Users from '../user/users/Users';

import { useLogic } from './hooks/useLogic';

import styles from './App.module.css';

const App = () => {
  const { filterUsers, handleOnSearch } = useLogic();

  console.log('<App />');

  return (
    <div className={styles['app-container']}>
      <Search onSearch={handleOnSearch} />
      <Users users={filterUsers} />
    </div>
  );
}

export default App;
