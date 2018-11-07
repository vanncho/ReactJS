import { SEARCHED_DATE } from '../actions/actionTypes';

const initState = '';

export function dateReducer(state = initState, actions) {

    switch (actions.type) {

        case SEARCHED_DATE: return '' + actions.date;
        default: return state;
    }
};