import React, { Component, Fragment } from 'react';
import requestHandler from '../../api/remote.js';
import toastr from 'toastr';
import Cart from './Cart';

class CartList extends Component {

    constructor() {
        super();

        this.state = {
            cart: [],
            total: 0
        }
    }

    checkout() {

        requestHandler.checkout().then(res => {

            if (res.success) {
                toastr.success(res.message);
            } else {
                toastr.error(res.message);
            }
        });
    }

    getTotalSum() {

        const totalSum = this.state.cart.reduce((accumulator, ticket) => {
            return accumulator + (ticket.count * ticket.price);
        }, 0);

        this.setState({ total: totalSum.toFixed(2) });
    }

    deleteTicketFromCart(ticketId) {

        requestHandler.deleteTicket(ticketId).then(res => {
            toastr.success('Tickets removed from cart');
            this.getCartContent();
        });
    }

    getCartContent() {

        requestHandler.getCart().then(res => {
            this.setState({ cart: res });
            this.getTotalSum();
        });
    }

    componentDidMount() {

        this.getCartContent();
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.cart.map((ticket, ind) => {

                        return <Cart key={ind} ticket={ticket} onClick={this.deleteTicketFromCart.bind(this)}></Cart>
                    })
                }
                <section className="ticket-checkout">
                    <div className="total">Sub total: {this.state.total}$</div>
                    <button className="checkout" onClick={this.checkout.bind(this)}>Checkout</button>
                </section>
            </Fragment>
        );
    }
}

export default CartList;