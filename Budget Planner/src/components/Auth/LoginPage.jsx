import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import Input from '../common/Input';
import requestHandler from '../../api/remote';

export default class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            redirect: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this._addNotification = this._addNotification.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitHandler(e) {
        e.preventDefault();

        requestHandler.login(this.state.email, this.state.password).then(res => {

            if (res.success) {
                this._addNotification(res.message, "success");
                sessionStorage.setItem("authToken", res.token);
                sessionStorage.setItem("user", res.user.name);
                setTimeout(() => {
                    this.setState({redirect: true});
                }, 2000);
            } else {
                if (res.errors) {
                    this._addNotification(res.errors, "errors");
                } else {
                    this._addNotification(res.message, "error");
                }
            }
        })
    }

    _addNotification(singleMessage, status) {

        switch (status) {
            case 'error':
                this._notificationSystem.addNotification({
                    message: singleMessage,
                    level: 'error',
                    autoDismiss: 0
                });
                break;
            case 'errors':
                for (let message in singleMessage) {
                    this._notificationSystem.addNotification({
                        title: message,
                        message: singleMessage[message],
                        level: 'error',
                        autoDismiss: 0
                    });
                }
                break;
            case 'success':
                this._notificationSystem.addNotification({
                    message: singleMessage,
                    level: 'success',
                });
                break;
        }
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }

    render() {

        if (this.state.redirect) {
            return (
                <Redirect to="/yearly"/>
            )
        }

        return (
            <main>
                <NotificationSystem ref="notificationSystem"/>
                <div className="container">
                    <div className="row space-top">
                        <div className="col-md-12">
                            <h1>Login</h1>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="row space-top">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="email">E-mail</label>
                                        <Input
                                            type="text"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeHandler}
                                        />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="password">Password</label>
                                        <Input
                                            name="password"
                                            type="password"
                                            value={this.state.password}
                                            onChange={this.onChangeHandler}
                                        />
                                </div>
                                <input type="submit" className="btn btn-secondary" value="Login"/>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}