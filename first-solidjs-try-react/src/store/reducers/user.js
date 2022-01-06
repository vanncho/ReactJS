import { GET_USER, STORE_USER } from '../actions/actionTypes';

const initialState = null;

export default (state = initialState, action) => {
  if (action.type === STORE_USER) {
    return action.payload || null;
  }

  if (action.type === GET_USER) {
    return state;
  }

  return state;
};
