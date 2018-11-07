import React from 'react';
import trainStation from '../../static/img/train-station.jpg'

const Ticket = (props) => {

    return (
        <section className="purchased-ticket">
            <div className="purchased-left">
                <img src={trainStation} alt="" />
            </div>
            <div className="purchased-right">
                <div>
                    <h3>{props.ticket.destination}</h3>
                    <span>{props.ticket.date}</span>
                </div>
                <div>
                    from {props.ticket.origin} <span>14:00</span>
                </div>
                <div>
                    arrives <span>{props.ticket.arrives}</span>
                </div>
                <div>
                    duration <span>{props.ticket.duration}</span>
                </div>
                <p>{props.ticket.count} x {props.ticket.price}$ ({props.ticket.class === 'firstClass' ? 'First Class' : 'Second Class'}) </p>
            </div>

        </section>
    );
}

export default Ticket;