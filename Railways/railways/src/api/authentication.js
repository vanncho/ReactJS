const authentication = {

    isAuthenticated: () => {

        let isLoggedIn = true;
        const token = sessionStorage.getItem('token');
        const username = sessionStorage.getItem('username');

        if (token === null || username === null) {
            isLoggedIn = false;
        }

        return isLoggedIn;
    },
    getAuthName: () => {
        return sessionStorage.getItem('username');
    },
    getToken: () => {
        return sessionStorage.getItem('token');
    }
}

export default authentication;