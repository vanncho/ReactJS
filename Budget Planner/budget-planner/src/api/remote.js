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
    getBalanceByYear: (year) => {

        return fetch(host + '/plan/' + year, {
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + sessionStorage.getItem('authToken')
            }
        }).then(resData => {
            return resData.json();
        });
    },
    getMonthlyBalance: (year, month) => {

        return fetch(host + '/plan/' + year + '/' + month, {
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + sessionStorage.getItem('authToken')
            }
        }).then(resData => {
            return resData.json();
        });
    },
    updateMonthlyBalance: (year, month, balance) => {

        return fetch(host + '/plan/' + year + '/' + month, {
            method: 'POST',
            headers: {
                Authorization: 'bearer ' + sessionStorage.getItem('authToken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(balance)
        }).then(data => {
            return data.json()
        });
    },
    addNewExpenses: (year, month, expense) => {

        return fetch(host + '/plan/' + year + '/' + month + '/expense', {
            method: 'POST',
            headers: {
                Authorization: 'bearer ' + sessionStorage.getItem('authToken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
        }).then(data => {
            return data.json()
        });
    },
    deleteExpense: (expenseId) => {

        return fetch(host + '/plan/expense/' + expenseId, {
            method: 'DELETE',
            headers: {
                Authorization: 'bearer ' + sessionStorage.getItem('authToken')
            }
        }).then(data => {
            return data.json()
        });
    }
};

export default requestHandler;