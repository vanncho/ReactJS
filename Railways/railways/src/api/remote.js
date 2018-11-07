import authentication from '../api/authentication.js';

const host = 'http://localhost:5000/';

let requestHandler = {

    register: (email, name, password) => {

        return fetch(host + 'auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, name, password}) 
        }).then(data => data.json());
    },
    login: (email, password) => {

        return fetch(host + 'auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }).then(res => res.json());
    },
    trips: () => {

        return fetch(host + 'trips', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    },
    singleTrip: (tripId) => {

        return fetch(host + 'trips/' + tripId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    },
    searchTrains: (origin, destination, date) => {

        return fetch(host + `search?origin=${origin}&destination=${destination}&date=${date}`, {
           method: 'GET',
           headers: {
                'Content-Type': 'application/json'
           } 
        }).then(res => res.json());
    },
    addTicketsToCart: (bodyObj) => {

        return fetch(host + 'cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + authentication.getToken()
            },
            body: JSON.stringify(bodyObj)
        }).then(res => res.json());
    },
    getCart: () => {

        return fetch(host + 'cart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + authentication.getToken()
            },
        }).then(res => res.json());
    },
    deleteTicket: (ticketId) => {
        
        return fetch(host + `cart/${ticketId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'bearer ' + authentication.getToken()
            },
        }).then(res => res.json());
    },
    checkout: () => {

        return fetch(host + 'cart/checkout', {
            method: 'POST',
            headers: {
                'Authorization': 'bearer ' + authentication.getToken()
            },
        }).then(res => res.json());
    },
    cartHistory: () => {

        return fetch(host + 'cart/history', {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + authentication.getToken()
            },
        }).then(res => res.json());
    }
};

export default requestHandler;