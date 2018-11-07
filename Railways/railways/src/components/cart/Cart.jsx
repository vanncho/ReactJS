import React from 'react';
import trainStation from '../../static/img/train-station.jpg'

const Cart = (props) => {

    return (
        <section className="single-ticket">
            <div className="left-ticket-container">
                <img src={trainStation} alt="" className="destination-img" />
                <div className="train-parameters">
                    <span className="ticket-price">Price: {props.ticket.price}$</span>
                    <span className="ticket-className">Second class</span>
                </div>
            </div>
            <div className="right-ticket-container">
                <h2>{props.ticket.destination}</h2>
                <p>from {props.ticket.origin}</p>
                <p>{props.ticket.date} {props.ticket.time}</p>
                <p>arrives {props.ticket.arrives} (duration {props.ticket.duration})</p>
                <p></p>
                <div>
                    <span className="number-of-tickets">{props.ticket.count}</span>
                        <button className="remove" onClick={() => props.onClick(props.ticket._id)}>REMOVE</button>
                </div>
             </div>
        </section>
    );
}

export default Cart;