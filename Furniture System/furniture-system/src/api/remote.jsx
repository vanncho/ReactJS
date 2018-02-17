let requestHandler = {

    register: (name, email, password) => {

        return fetch('http://localhost:5000/auth/signup', {
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

        return fetch('http://localhost:5000/auth/login', {
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
    }
};

export default requestHandler;