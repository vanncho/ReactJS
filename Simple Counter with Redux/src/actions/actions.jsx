import { INCREMENT, DECREMENT, CLEAR } from './actionTypes';

function incrementAction() {
    return {
        type: INCREMENT
    };
}

function decrementAction() {
    return {
        type: DECREMENT
    };
}

function clearAction() {
    return {
        type: CLEAR
    };
}

export { incrementAction, decrementAction, clearAction };