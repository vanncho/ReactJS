import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {

    getBalanceByYear() {

        let currentTime = new Date();
        let thisYear = (currentTime.getFullYear());
        this.setState({thisYear: thisYear});
    }

    render() {
        const {loggedIn, onLogout} = this.props;

        return (
            <header>
                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <NavLink exact className="nav-link" to={`/monthly/${((new Date()).getFullYear())}/${((new Date()).getMonth())}`}>Monthly Balance</NavLink>
                                <NavLink exact to="/yearly" className="nav-link">Yearly Balance</NavLink>
                                {loggedIn && <button type="button" className="btn btn-link logout" onClick={onLogout}>Logout</button>}
                                {!loggedIn && <NavLink to="/login" className="nav-link">Login</NavLink>}
                                {!loggedIn && <NavLink to="/register" className="nav-link">Register</NavLink>}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}