import React, { Component } from 'react';
import { Route, Switch, withRouter, NavLink } from 'react-router-dom';

import Header from './components/common/Header';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import CreateHotel from './components/hotel/CreateHotel';
import HotelLists from "./components/hotel/HotelLists";
import HotelDetails from "./components/hotel/HotelDetails";
import EditHotel from "./components/hotel/EditHotel";

class App extends Component {

    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        sessionStorage.clear();
        this.props.history.push('/');
    }

    render() {

        return (
            <div className="App">
                <Header loggedIn={sessionStorage.getItem('authToken') !== null} onLogout={this.onLogout} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/view/:page" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/addHotel" component={CreateHotel} />
                    <Route path="/hotels/details/:id" component={HotelDetails} />
                    <Route path="/hotels/edit/:id" component={EditHotel} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);