import { REGISTER_SUCCESS, LOGIN_SUCCESS, REDIRECT } from '../actions/actionTypes';

const initState = {
    success: false
}

export function authReducer(state = initState, action) {

    switch (action.type) {
        case REGISTER_SUCCESS:
            return  { success: true };
        case LOGIN_SUCCESS:
            return  { success: true };
        case REDIRECT:
            return  { success: false };
        default:
            return state;
    }
}
