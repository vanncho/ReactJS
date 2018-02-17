import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import requestHandler from '../../api/remote';

export default class Hotel extends Component {

    constructor(props) {
        super(props);

        this.deleteHotel = this.deleteHotel.bind(this);
    }

    deleteHotel() {

        requestHandler.deleteHotel(this.props.props.id).then(res => {
            console.log(res);
        });
    }

    render() {
        return (
            <article>
                {console.log(this.props)}
                <div>
                    <span>{this.props.index}</span>
                </div>
                <div>
                    <p>Name: {this.props.props.name}</p>
                    <a href={this.props.props.image}>
                        <img className="hotelImg" src={this.props.props.image}/>
                    </a>
                </div>
                <div>
                    <div>
                        <p>Location: {this.props.props.location}</p>
                        <p>{this.props.props.description}</p>
                    </div>
                    <div>
                        <div>
                            <ul>
                                <li>
                                    <Link to={`/hotels/details/${this.props.props.id}`}>DETAILS</Link>
                                </li>
                                <li>
                                    <Link to={`/hotels/edit/${this.props.props.id}`}>EDIT</Link>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"
                                       onClick={this.deleteHotel}>Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
};