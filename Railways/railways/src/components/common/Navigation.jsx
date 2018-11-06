import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cartImage from '../../static/img/cart.png';

class Navigation extends Component {

    render() {

        const name = sessionStorage.getItem('username');
        const token = sessionStorage.getItem('token');

        return(
            <nav className="nav-register">
                <div className="left-container">
                    <ul>
                        <li><Link to="/catalog">Trains</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </div>
                { name && token &&
                    <div className="right-container">
                        <span>Welcome, {name} |</span>
                        <Link to="" className="log-out" onClick={this.props.logout}>Logout</Link>
                        <Link to="/addCart"><img src={cartImage} alt="cart" className="cart" /></Link>
                    </div>
                }
            </nav>
        );
    }
}

export default Navigation;