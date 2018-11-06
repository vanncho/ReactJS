import { GET_TRAINS } from '../actions/actionTypes.js';

const initState = [];

export function catalogReducer(state = initState, action) {

    switch (action.type) {

        case GET_TRAINS: return [...action.trains];
        default: return state;
    }
};