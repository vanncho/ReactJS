import React from 'react';

import { useLogic } from './hooks/useLogic';

const Search = (props) => {
  const { onSearch } = props;
  const { search, handleOnChange, handleSearch } = useLogic(onSearch);

  console.log('<Search />');

  return (
    <div className="form-container">
      <div className="input-group mb-3">
        <input
          className="form-control"
          placeholder="enter user name or id"
          value={search}
          onChange={handleOnChange}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Search;