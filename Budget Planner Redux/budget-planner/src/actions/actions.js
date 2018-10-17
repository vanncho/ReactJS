import { REGISTER_SUCCESS, LOGIN_SUCCESS, REDIRECT, NOTIFICATION } from './actionTypes';
import requestHandler from '../api/remote';

function notifications(message, errorType) {
    return {
        type: NOTIFICATION,
        message,
        errorType
    }
}

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

function redirectAction() {
    return {
        type: REDIRECT
    }
}

function registerAction(username, email, password) {

    return (dispatch) => {
        requestHandler.register(username, email, password).then(res => {

            if (res.success) {

                dispatch(notifications(res.message, "success"));
                dispatch(registerSuccess());
    
            } else {
                if (res.errors) {

                    dispatch(notifications(res.errors, "errors"));
                } else {
                    
                    dispatch(notifications(res.message, "error"));
                }
            }
        });
    };
}

function loginAction(email, password) {

    return (dispatch) => {
        requestHandler.login(email, password).then(res => {

            if (res.success) {

                dispatch(notifications(res.message, "success"));
                sessionStorage.setItem("authToken", res.token);
                sessionStorage.setItem("user", res.user.name);
                dispatch(loginSuccess());
            } else {
                if (res.errors) {

                    dispatch(notifications(res.errors, "errors"));
                } else {
                    
                    dispatch(notifications(res.message, "error"));
                }
            }
        })
    };
}

export { loginSuccess, redirectAction, registerAction, loginAction, notifications };