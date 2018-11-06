import React, { Component, Fragment } from 'react';
import toastr from 'toastr';
import requestHandler from '../../api/remote.js';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    onChangeHandler(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onFormSubmith(event) {
        event.preventDefault();

        requestHandler.login(this.state.email, this.state.password).then(res => {

            if (res.success) {
                toastr.success(res.message);
                sessionStorage.setItem('token', res.token);
                sessionStorage.setItem('username', res.user.name);
                this.props.history.push('/');
            } else {
                toastr.error(res.message);
            }
        });
    }

    render() {
        return (
            <Fragment>
                <h2>Log In:</h2>
                <form className="register-form" onSubmit={ this.onFormSubmith.bind(this) }>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        onChange={ this.onChangeHandler.bind(this) }
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                        onChange={ this.onChangeHandler.bind(this) }
                    />

                    <input type="submit" className="login" value="Login" />
                </form>
            </Fragment>
        );
    }
}

export default Login;