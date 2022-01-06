import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { storeSelectedUsers } from '../../../../store/actions/usersAction';

import { getUsers } from '../../../../api/userRemote';

export const useLogic = () => {
  const dispatch = useDispatch();

  const [filterUsers, setFilterUsers] = useState([]);

  const users = useSelector((store) => store.users);

  useEffect(async () => {
    const allUsers = await getUsers();

    setFilterUsers(allUsers);
    dispatch(storeSelectedUsers(allUsers));
  }, []);

  const handleOnSearch = value => {
    if (!value) {
      setFilterUsers(users);
      return;
    }

    let filtered;

    if (Number(value)) {
      filtered = users.filter(currUser => currUser.id == value);
    } else {
      filtered = users.filter(currUser => (currUser.name).toLowerCase().indexOf(value) >= 0);
    }

    setFilterUsers(filtered);
  }

  return {
    filterUsers,
    handleOnSearch,
  };
};
