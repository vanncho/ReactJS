const host = 'http://localhost:5000';

let requestHandler = {

    register: (name, email, password) => {

        return fetch(host + '/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(data => {
            return data.json()
        });
    },
    login: (email, password) => {

        return fetch(host + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(data => {
            return data.json()
        });
    },
    createHotel: (hotel) => {

        return fetch(host + '/hotels/create/', {
            method: 'POST',
            headers: {
                Authorization: 'bearer ' + sessionStorage.getItem('authToken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hotel)
        }).then(data => {
            return data.json()
        });
    },
    deleteHotel: (hotelId) => {

        return fetch(host + '/hotels/' + hotelId, {
            method: 'DELETE',
            headers: {
                Authorization: 'bearer ' + sessionStorage.getItem('authToken')
            }
        });
    },
    getAllHotels: () => {

        return fetch(host + '/hotels/all/', {
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + sessionStorage.getItem('authToken')
            }
        }).then(resData => {
            return resData.json();
        });
    },
    getAllHotelsByPage: (page) => {

        return fetch(host + '/hotels/all?page=' + page, {
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + sessionStorage.getItem('authToken')
            }
        }).then(resData => {
            return resData.json();
        });
    },
    getSingleHotel: (hotelId) => {

        return fetch(host + '/hotels/details/' + hotelId, {
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + sessionStorage.getItem('authToken')
            }
        }).then(resData => {
            return resData.json();
        });
    },
    createReview: (hotelId, comment, rating) => {

        return fetch(host + '/hotels/details/' + hotelId + '/reviews/create', {
            method: 'POST',
            headers: {
                Authorization: 'bearer ' + sessionStorage.getItem('authToken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comment, rating})
        }).then(data => {
            return data.json()
        });
    },
    getAllReviews: (hotelId) => {

        return fetch(host + '/hotels/details/' + hotelId + '/reviews', {
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + sessionStorage.getItem('authToken')
            }
        }).then(resData => {
            return resData.json();
        });
    },
};

export default requestHandler;