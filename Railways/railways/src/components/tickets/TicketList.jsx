import React, { Component, Fragment } from 'react';
import Ticket from './Ticket';
import requestHandler from '../../api/remote.js';

class TicketList extends Component {

    constructor() {
        super();

        this.state = {
            tickets: []
        }
    }

    componentDidMount() {

        requestHandler.cartHistory().then(res => {
            this.setState({ tickets: res });
        });
    }

    render() {

        return (
            <Fragment>
                <h2>Your Trains</h2>
                {
                    this.state.tickets.map((ticket, ind) => {
                        return <Ticket key={ind} ticket={ticket}></Ticket>
                    })
                }
                
            </Fragment>
        );
    }
}

export default TicketList;