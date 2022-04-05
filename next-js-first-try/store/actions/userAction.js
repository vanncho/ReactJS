import { GET_USER, STORE_USER } from './actionTypes';

const storeSelectedUser = (user) => {
  return {
    type: STORE_USER,
    payload: user,
  };
};

const getUser = () => {
  return {
    type: GET_USER,
  };
};

export {
  getUser,
  storeSelectedUser,
};
