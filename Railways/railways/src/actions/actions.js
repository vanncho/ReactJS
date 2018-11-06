import { GET_TRAINS } from './actionTypes';
import requestHandler from '../api/remote.js';

function getAllTrains(trains) {

    return {
        type: GET_TRAINS,
        trains
    }
}

function getTrainsCatalog() {

    return (dispatch) => {
        requestHandler.trips().then(res => {
            dispatch(getAllTrains(res));
        });
    };
}

export { getTrainsCatalog };