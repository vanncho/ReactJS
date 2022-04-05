import { GET_USERS, STORE_USERS } from '../actions/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  if (action.type === STORE_USERS) {
    return action.payload;
  }

  if (action.type === GET_USERS) {
    return state;
  }

  return state;
};
