import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerAction, loginAction} from "../../actions/authActions";

import Input from './Input';

class RegisterPage extends Component {

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
    }

    onChangeHandler(e) {
        //// LONG VER
        // const target = e.target;
        // const prop = target.name;
        // const value = target.value;
        // const newState = {};
        // newState[prop] = value;
        // this.setState(newState);

        //// SHORT
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitHandler(e) {
        e.preventDefault();

        this.props.register(this.state.name, this.state.email, this.state.password);
    }

    componentWillReceiveProps(newProps) {

        if (newProps.registerSuccess) {
            this.props.login(this.state.email, this.state.password);
        }
    }

    render() {

        if (this.props.loginSuccess) {
            return (
                <Redirect to="/"/>
            )
        }

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Register</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="row space-top">
                        <div className="col-md-4">
                            <Input name="name"
                                   value={this.state.name}
                                   onChange={this.onChangeHandler}
                                   label="Name"/>
                            <Input name="email"
                                   value={this.state.email}
                                   onChange={this.onChangeHandler}
                                   label="Email"/>
                            <Input name="password"
                                   type="password"
                                   value={this.state.password}
                                   onChange={this.onChangeHandler}
                                   label="Password"/>
                            <Input name="repeat"
                                   type="password"
                                   value={this.state.repeat}
                                   onChange={this.onChangeHandler}
                                   label="Repeat password"/>
                            <input type="submit" className="btn btn-primary" value="Register"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        registerSuccess: state.register.success,
        loginSuccess: state.login.success
    }
}

function mapDispatchToProps(dispatch) {

    return {
        register: (name, email, password) => dispatch(registerAction(name, email, password)),
        login: (email, password) => dispatch(loginAction(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);