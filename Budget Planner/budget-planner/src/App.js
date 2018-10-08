import React, { Component } from 'react';
import { Route, Switch, withRouter, NavLink } from 'react-router-dom';

import Header from './components/common/Header';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import BalanceLists from "./components/balance/BalanceLists";
import MonthlyBalance from "./components/balance/MonthlyBalance";
import AddExpenses from "./components/expenses/AddExpenses";
import Footer from "./components/common/Footer";

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
                    <Route exact path="/yearly" component={BalanceLists} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/expenses/:year/:month" component={AddExpenses} />
                    <Route path="/monthly/:year/:month" component={MonthlyBalance} />
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(App);