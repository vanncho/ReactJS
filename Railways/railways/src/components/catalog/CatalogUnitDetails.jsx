import React, { Component } from 'react';
import requestHandler from '../../api/remote';
import stationImg from '../../static/img/Sheffield.png';
import { connect } from 'react-redux';
import { getSearchedDate } from '../../actions/actions.js';
import toastr from 'toastr';

class CatalogUnitDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            train: {},
            date: '',
            class: '',
            count: '',
        }
    }

    onChangeHandler(event) {
        this.setState({ class: event.target.name });
        this.setState({ count: event.target.value });
    }

    processRequest(event) {
        event.preventDefault();

        const bodyObj = {
            "tripId": this.props.match.params.id,
            "date": this.state.date,
            "class": this.state.class,
            "count": this.state.count
        };

        requestHandler.addTicketsToCart(bodyObj).then(res => {
            toastr.success(res.message);
        });
    }

    componentDidMount() {

        requestHandler.singleTrip(this.props.match.params.id).then(res => {
            this.setState({train: res});
        });

        if (this.props.date !== '') {

            // export to utils file
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const date = new Date(this.props.date);

            this.setState({ date: ('' + date.getDay() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear())});
        }
    }

    componentWillUnmount() {
        this.props.getSearchedDate('');
    }

    render () {

        let hasFirstClass = false;

        if (this.state.train.tickets) { 
            hasFirstClass = this.state.train.tickets.firstClass !== undefined;
        }

        return(
            <React.Fragment>
                    <section className="ticket-area">
                        <div className="ticket-area-left">
                            <img src={stationImg} alt="" />
                        </div>
                        <div className="ticket-area-right">
                            <h3>{this.state.train.destination}</h3>
                            <div>from {this.state.train.origin}</div>
                            <div className="data-and-time">{this.state.date !== '' && this.state.date} {this.state.train.time}</div>
                            <div className="data-and-time">arrives {this.state.train.arrives}</div>
                            <div className="data-and-time">duration {this.state.train.duration}</div>
                        </div>
                    </section>
                    {hasFirstClass &&
                        <section className="train-details">
                            <form action="" className="seat-form">
                                <span>{this.state.train.tickets.firstClass}$</span><span>First Class</span>
                                <input
                                    type="number"
                                    name="firstClass"
                                    placeholder="Add Number"
                                    onChange={this.onChangeHandler.bind(this)}
                                />
                                <input
                                    type="submit"
                                    className="create-seat"
                                    value="Add to Cart"
                                    onClick={this.processRequest.bind(this)}
                                />
                                <button className="delete" onClick={(e) => { e.preventDefault(); return e.target.previousSibling.previousSibling.value = ''}}>X</button>
                            </form>
                        </section>
                    }
                    <section className="train-details">
                        <form action="" className="seat-form">
                            <span>{this.state.train.tickets && this.state.train.tickets.secondClass}$</span><span>Second Class</span>
                            <input
                                type="number"
                                name="secondClass"
                                placeholder="Add Number"
                                onChange={this.onChangeHandler.bind(this)}
                            />
                            <input
                                type="submit"
                                className="create-seat"
                                value="Add to Cart"
                                onClick={this.processRequest.bind(this)}
                            />
                            <button className="delete" onClick={(e) => { e.preventDefault(); return e.target.previousSibling.previousSibling.value = ''}}>X</button>
                        </form>
                    </section>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        date: state.date
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        getSearchedDate: (emptyDate) => dispatch(getSearchedDate(emptyDate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogUnitDetails);