import { LOGIN_SUCCESS, REGISTER_SUCCESS, REDIRECT } from './actions';

function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

function registerSuccess() {
    return {
        type: REGISTER_SUCCESS
    }
}

function redirect() {
    return {
        type: REDIRECT
    }
}

export { loginSuccess, registerSuccess, redirect };