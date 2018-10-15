import { INCREMENT, DECREMENT, CLEAR } from '../actions/actionTypes';

const intiState = {
    count: 0
}

const countReducer = (state = intiState, action) => {

    switch(action.type) {

        case INCREMENT: 
            return {
                ...state,
                count: state.count + 1 
                };
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1 
                }
        case CLEAR:
            return {
                ...state,
                count: 0 
                }
        default:
            return state;
    }
};

export default countReducer;