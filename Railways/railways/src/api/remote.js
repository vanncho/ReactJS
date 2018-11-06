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
    login: (email, password) =>{

        return fetch(host + 'auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }).then(res => res.json());
    }
};

export default requestHandler;