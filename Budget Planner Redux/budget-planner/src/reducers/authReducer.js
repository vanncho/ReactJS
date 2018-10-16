import { REGISTER_SUCCESS, LOGIN_SUCCESS, REDIRECT } from '../actions/actionTypes';

const initState = {
    success: false
}

export function registerReducer(state = initState, action) {

    switch (action.type) {
        case REGISTER_SUCCESS:
            return Object.assign({}, state, { success: true });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, { success: false });
        case REDIRECT:
            return Object.assign({}, state, { success: false });
        default:
            return state;
    }
}

export function loginReducer(state = initState, action) {

    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
            };
        case LOGIN_SUCCESS:
            return {
            };
        case REDIRECT:
            return {
            };
        default:
            return state;
    }
}