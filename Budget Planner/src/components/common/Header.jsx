import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class Header extends Component {

    getBalanceByYear() {

        let currentTime = new Date();
        let thisYear = (currentTime.getFullYear());
        this.setState({thisYear: thisYear});
        let nextYear = (currentTime.getFullYear()) + 1;
        let currMonth = currentTime.getMonth() + 1;
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
                                {loggedIn && <a className="nav-link" href="javascript:void(0)" onClick={onLogout}>Logout</a>}
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