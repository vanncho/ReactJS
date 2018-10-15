import { loginReducer, registerReducer } from './authReducer';

export default () => {
    return {
        login: loginReducer,
        register: registerReducer
    };
} 
