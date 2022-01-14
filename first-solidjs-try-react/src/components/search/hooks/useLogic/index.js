import { useRef } from 'react';

export const useLogic = (onSearch) => {
  const searchRef = useRef('');

  const handleSearch = () => {
    onSearch(searchRef.current.value);
  };

  return {
    searchRef,
    handleSearch,
  };
};
