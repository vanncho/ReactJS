import { GET_TRAINS, SEARCHED_DATE } from './actionTypes';
import requestHandler from '../api/remote.js';
import toastr from 'toastr';

function getSearchedDate(date) {

    return {
        type: SEARCHED_DATE,
        date
    }
}

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

function searchTrains(origin, destination, date) {

    return (dispatch) => {
        requestHandler.searchTrains(origin, destination, date).then(res => {
            
            const error = res.error;

            if (error) {
                return toastr.error(error);
            }

            dispatch(getAllTrains(res));
        });
    }
}

export { getTrainsCatalog, searchTrains, getSearchedDate };