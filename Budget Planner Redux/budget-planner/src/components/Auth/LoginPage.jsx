import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import { loginAction, redirectAction } from '../../actions/actions';
import Input from '../common/Input';

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
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

        this.props.loginUser(this.state.email, this.state.password);
    }

    _addNotification(singleMessage, status) {

        switch (status) {
            case 'error':
                this._notificationSystem.addNotification({
                    message: singleMessage,
                    level: 'error',
                    autoDismiss: 7
                });
                break;
            case 'errors':
                for (let message in singleMessage) {
                    this._notificationSystem.addNotification({
                        title: message,
                        message: singleMessage[message],
                        level: 'error',
                        autoDismiss: 7
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

    componentWillReceiveProps(newProps) {

        this._addNotification(newProps.nofificationMessage, newProps.nofificationType);

        if (newProps.loginSuccess) {

            setTimeout(() => {
                this.props.redirect();
                this.props.history.push('/yearly');
            }, 2000);
        }
    }

    render() {

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

const mapStateToProps = (state) => {
    return {
        loginSuccess: state.auth.success,
        nofificationMessage: state.notify.message,
        nofificationType: state.notify.errorType,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (email, password) => dispatch(loginAction(email, password)),
        redirect: () => dispatch(redirectAction())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);