import { GET_USERS, STORE_USERS } from './actionTypes';

const storeSelectedUsers = (users) => {
  return {
    type: STORE_USERS,
    payload: users,
  };
};

const getUsers = () => {
  return {
    type: GET_USERS,
  };
};

export {
  getUsers,
  storeSelectedUsers,
};
