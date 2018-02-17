import React, {Component} from 'react';

import HotelLists from "../hotel/HotelLists";

export default class HomePage extends Component {

    render() {
        const page = Number(this.props.match.params.page) || 1;

        return (
            <div className="container">
                <h1>Home Page</h1>
                <p>Welcome to our site.</p>
                <HotelLists page={page}/>
            </div>
        );
    }
}