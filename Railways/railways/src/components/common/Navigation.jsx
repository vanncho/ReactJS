import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cartImage from '../../static/img/cart.png';
import authentication from '../../api/authentication.js';

class Navigation extends Component {

    render() {

        const isLoggedIn = authentication.isAuthenticated();
        const name = authentication.getAuthName();

        return(
            <nav className="nav-register">
                <div className="left-container">
                    <ul>
                        <li><Link to="/">Trains</Link></li>
                        { !isLoggedIn &&
                            <span>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </span>
                        }
                        { isLoggedIn && <li><Link to="/myTickets">My Tickets</Link></li>}
                    </ul>
                </div>
                { isLoggedIn &&
                    <div className="right-container">
                        <span>Welcome, {name}</span>
                        <Link to="" className="log-out" onClick={this.props.logout}>Logout</Link>
                        <Link to="/cart"><img src={cartImage} alt="cart" className="cart" /></Link>
                    </div>
                }
            </nav>
        );
    }
}

export default Navigation;