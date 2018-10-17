import { NOTIFICATION } from '../actions/actionTypes';

const initState = {
    message: '',
    errorType: ''
}

export function notifications(state = initState, action) {

    switch (action.type) {
        case NOTIFICATION:
            return { 
                message: action.message,
                errorType: action.errorType
            };
        default:
            return state;
    }
}