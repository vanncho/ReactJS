import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import requestHandler from '../../api/remote';
import ReviewSection from "../review/ReviewSection";

class HotelDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentHotel: {}
        };
    }

    componentDidMount() {

        requestHandler.getSingleHotel(this.props.match.params.id).then(hotelData => {

            if (hotelData) {
                this.setState({currentHotel: hotelData});
                // reqHandler.pullComments(postData._id).then(commentData => {
                //
                //     this.setState({currentPost: postData});
                //     this.setState({comments: commentData});
                // })
            }
        })
    }

    render() {

        return (
            <article>
                <div>
                    <h1>Hotel Details: {this.state.currentHotel.id}</h1>
                </div>
                <div>
                    <a href={this.state.currentHotel.image}>
                        <img className="hotelImg" src={this.state.currentHotel.image}/>
                    </a>
                </div>
                <div>
                    <div>
                        <p>Name: {this.state.currentHotel.name}</p>
                        <p>Location: {this.state.currentHotel.location}</p>
                        <p>Description: {this.state.currentHotel.description}</p>
                        <p>Rooms: {this.state.currentHotel.numberOfRooms}</p>
                        <p>Parking lots: {this.state.currentHotel.parkingSlots}</p>
                    </div>
                    <div>
                        <div>
                            <ul>
                                <li>
                                    <Link to={`/hotels/edit/${this.state.currentHotel.id}`}>EDIT</Link>
                                </li>
                                <li>
                                    <Link to={`/hotels/delete/${this.state.currentHotel.id}`}>DELETE</Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <br/>
                    <br/>
                    <br/>

                    <ReviewSection hotelId={Number(this.props.match.params.id)}/>

                </div>
            </article>
        )
    }
}

export default HotelDetails;