import React, { Component } from 'react';
import Input from './../Auth/Input';

class LoginPage extends Component {

    render() {

        return(
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Login</h1>
                    </div>
                </div>
                <form>
                    <div className="row space-top">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="email">E-mail</label>
                                <input className="form-control" id="email" type="text"/>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label" for="password">Password</label>
                                <input className="form-control" id="password" type="password"/>
                            </div>
                            <input type="submit" className="btn btn-primary" value="Login"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginPage;