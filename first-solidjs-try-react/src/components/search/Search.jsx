import React from 'react';

import { useLogic } from './hooks/useLogic';

const Search = (props) => {
  const { onSearch } = props;
  const { searchRef, handleSearch } = useLogic(onSearch);

  console.log('<Search />');

  return (
    <div className="form-container">
      <div className="input-group mb-3">
        <input
          ref={searchRef}
          type="text"
          className="form-control"
          placeholder="enter user name or id"
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Search;