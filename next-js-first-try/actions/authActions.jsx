import requestHandler from './../api/remote';
import {REGISTER_SUCCESS, LOGIN_SUCCESS} from "./actionTypes"

function registerSuccess() {

    return {
        type: REGISTER_SUCCESS
    }
}

function loginSuccess() {

    return {
        type: LOGIN_SUCCESS
    }
}

function registerAction (name, email, password) {

    return (dispatch) => {

        return requestHandler.register(name, email, password).then(res => {

            if (res.success) {
                dispatch(registerSuccess());
            }
        })
    };
}

function loginAction(email, password) {

    return (dispatch) => {

        return requestHandler.login(email, password).then(token => {
            sessionStorage.setItem('authToken', token.token);
            sessionStorage.setItem('user', token.user.name);
            dispatch(loginSuccess());
        });
    }
}

export {registerAction, loginAction};