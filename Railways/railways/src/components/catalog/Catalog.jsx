import React, { Component, Fragment } from 'react';

class Catalog extends Component {

    render() {
        return (
            <Fragment>
                <div className="train-logo"></div>

                <form className="search-form">

                    <label>Destination:</label>
                    <input type="text" placeholder="Destination" />

                    <label>Origin:</label>
                    <input type="text" placeholder="Origin" />

                    <label>Departure:</label>
                    <input type="text" placeholder="Departure" />

                    <input type="submit" className="search" value="Search" />
                </form>
            </Fragment>
        );
    }
}

export default Catalog;