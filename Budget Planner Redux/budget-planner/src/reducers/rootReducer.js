import { registerReducer, loginReducer } from './authReducer';
import { notifications } from './notificationReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    notify: notifications
};
