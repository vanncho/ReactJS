import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getTrainsCatalog, searchTrains, getSearchedDate } from '../../actions/actions.js';
import CatalogUnit from './CatalogUnit.jsx'

class Catalog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            origin: '',
            destination: '',
            date: ''
        }
    }

    componentDidMount() {
        this.props.getTrains();
    }

    onChangeHandler(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    processRequest(event) {
        event.preventDefault();

        this.props.getSearchedDate(this.state.date);
        this.props.searchTrains(this.state.origin, this.state.destination, this.state.date);
    }

    render() {

        const arr = [];

        for (let i = 0; i < this.props.trains.length; i += 3) {

            const innerArr = [];

            innerArr.push(this.props.trains[i]);

            if (this.props.trains[i + 1] !== undefined) {
                innerArr.push(this.props.trains[i + 1]);
            }

            if (this.props.trains[i + 2] !== undefined) {
                innerArr.push(this.props.trains[i + 2]);
            }

            arr.push(innerArr);
        }

        return (
            <Fragment>
                <div className="train-logo"></div>

                <form className="search-form">

                    <label>Destination:</label>
                    <input
                        type="text"
                        name="destination"
                        placeholder="Destination"
                        onChange={this.onChangeHandler.bind(this)}
                    />

                    <label>Origin:</label>
                    <input
                        type="text"
                        name="origin"
                        placeholder="Origin"
                        onChange={this.onChangeHandler.bind(this)}
                    />

                    <label>Departure:</label>
                    <input
                        type="date"
                        name="date"
                        placeholder="Departure"
                        onChange={this.onChangeHandler.bind(this)}
                    />

                    <input type="submit" className="search" value="Search" onClick={this.processRequest.bind(this)}/>
                </form>
                    {
                        arr.map((innerArray, ind) => {
                            switch (innerArray.length) {

                                case 1: return <section className="added-trains" key={ind}>
                                                    <CatalogUnit key={ind + 1} train={arr[ind][0]} date={this.state.date} />
                                                </section>;
                                case 2: return <section className="added-trains" key={ind}>
                                                    <CatalogUnit key={ind + 1} train={arr[ind][0]} date={this.state.date} />
                                                    <CatalogUnit key={ind + 2} train={arr[ind][1]} date={this.state.date} />
                                                </section>;
                                case 3: return <section className="added-trains" key={ind}>
                                                    <CatalogUnit key={ind + 1} train={arr[ind][0]} date={this.state.date} />
                                                    <CatalogUnit key={ind + 2} train={arr[ind][1]} date={this.state.date} />
                                                    <CatalogUnit key={ind + 3} train={arr[ind][2]} date={this.state.date} />
                                                </section>;
                                default: return <section className="added-trains"></section>;
                            }
                        })
                    }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        trains:  state.catalog
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        getTrains: () => dispatch(getTrainsCatalog()),
        searchTrains: (origin, destination, date) => dispatch(searchTrains(origin, destination, date)),
        getSearchedDate: (date) => dispatch(getSearchedDate(date))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);