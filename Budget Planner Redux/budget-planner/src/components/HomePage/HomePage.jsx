import React, {Component} from 'react';

import BalanceLists from './../balance/BalanceLists';

export default class HomePage extends Component {

    render() {

        return (
            <div className="container">
                <h1>Home Page</h1>
                <p>Welcome to our site.</p>
                <BalanceLists/>
            </div>
        );
    }
}