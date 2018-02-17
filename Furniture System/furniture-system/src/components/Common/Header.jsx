import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class Header extends Component {

    render() {

        return(
            <header>
                <nav className="navbar navbar-dark bg-primary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <Link className="navbar-brand" to="/">FS</Link>
                                <NavLink className="nav-link active" activeClassName="active" exact to="/">Home</NavLink>
                                <NavLink className="nav-link" activeClassName="active" to="/create">Create Furniture</NavLink>
                                <NavLink className="nav-link" activeClassName="active" to="/profile">My Furniture</NavLink>
                                <NavLink className="nav-link" activeClassName="active" to="/logout">Logout</NavLink>
                                <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
                                <NavLink className="nav-link" activeClassName="active" to="/register">Register</NavLink>
                                <span>72 items in catalog</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;