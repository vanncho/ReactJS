import { useState } from 'react';

export const useLogic = (onSearch) => {
  const [search, setSearch] = useState('');

  const handleOnChange = event => {
    const value = event.target.value;

    setSearch(value);
  };

  const handleSearch = () => {
    onSearch(search);
  };

  return {
    search,
    handleOnChange,
    handleSearch,
  };
};
