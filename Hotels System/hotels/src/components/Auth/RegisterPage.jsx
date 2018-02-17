import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import Input from '../common/Input';
import requestHandler from '../../api/remote';

export default class RegisterPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
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

        requestHandler.register(this.state.name, this.state.email, this.state.password).then(res => {

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
            <div className="container">
                <h1>Register</h1>
                <NotificationSystem ref="notificationSystem"/>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        label="Name"
                    />
                    <Input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        label="E-mail"
                    />
                    <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        label="Password"
                    />
                    <Input
                        name="repeat"
                        type="password"
                        value={this.state.repeat}
                        onChange={this.onChangeHandler}
                        label="Repeat password"
                    />
                    <input type="submit" className="btn btn-primary" value="Register"/>
                </form>
            </div>
        );
    }
}