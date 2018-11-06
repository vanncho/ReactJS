import React, { Component, Fragment } from 'react';
import toastr from 'toastr';
import requestHandler from '../../api/remote.js';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            repeatPassword: ''
        }
    }

    onChangeHandler(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onFormSubmith(event) {
        event.preventDefault();

        if (this.state.password !== this.state.repeatPassword) {
            toastr.error('Password and repeat password not match!');
        } else {

            requestHandler.register(this.state.email, this.state.name, this.state.password).then(res => {
    
                if (res.success) {
                    toastr.success(res.message);
                    this.props.history.push('/login');
                } else {

                    if (res.errors) {
                        Object.keys(res.errors).map(key => toastr.error(res.errors[key], key));
                    } else {
                        toastr.error(res.message);
                    }
                }
            });
        }
    }

    render() {
        return (
            <Fragment>
                <h2>Create your account:</h2>
                <form className="register-form" onSubmit={ this.onFormSubmith.bind(this) } >

                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={ this.onChangeHandler.bind(this) } 
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={ this.onChangeHandler.bind(this) }
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={ this.onChangeHandler.bind(this) }
                    />

                    <label>Repeat Password:</label>
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        name="repeatPassword"
                        onChange={ this.onChangeHandler.bind(this) }
                    />

                    <input type="submit" className="register" value="Register" />
                </form>
            </Fragment>
        )
    }
}

export default Register;