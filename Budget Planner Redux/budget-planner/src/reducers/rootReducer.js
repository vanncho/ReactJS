import { authReducer } from './authReducer';
import { notifications } from './notificationReducer';

export default {
    auth: authReducer,
    notify: notifications
};
