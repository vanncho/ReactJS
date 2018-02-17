import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import Input from '../common/Input';
import requestHandler from '../../api/remote';

export default class RegisterPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            repeat: '',
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

        if (this.state.password !== this.state.repeat) {
            this._addNotification('Passwords not match.', "error");
        }

        requestHandler.register(this.state.username, this.state.email, this.state.password).then(res => {

            if (res.success) {
                this._addNotification(res.message, "success");
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
                <Redirect to="/login"/>
            )
        }

        return (
            <main>
                <NotificationSystem ref="notificationSystem"/>
                <div className="container">
                    <div className="row space-top">
                        <div className="col-md-12">
                            <h1>Register</h1>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="form-control-label " htmlFor="username">Username</label>
                                        <Input
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChangeHandler}
                                        />
                                </div>
                                <div className="form-group has-success">
                                    <label className="form-control-label" htmlFor="email">E-mail</label>
                                        <Input
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeHandler}
                                        />
                                </div>
                                <div className="form-group has-danger">
                                    <label className="form-control-label" htmlFor="new-password">Password</label>
                                        <Input
                                            name="password"
                                            type="password"
                                            value={this.state.password}
                                            onChange={this.onChangeHandler}
                                        />
                                </div>
                                <div className="form-group has-danger">
                                    <label className="form-control-label" htmlFor="repeat">Repeat password</label>
                                    <Input
                                        name="repeat"
                                        type="password"
                                        value={this.state.repeat}
                                        onChange={this.onChangeHandler}
                                    />
                                </div>
                                <input type="submit" className="btn btn-secondary" value="Register"/>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}