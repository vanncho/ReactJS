import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import Input from '../common/Input';
import Textarea from '../common/Textarea';
import requestHandler from '../../api/remote';

class EditHotel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentHotel: {},
            redirect: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this._addNotification = this._addNotification.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    _addNotification(singleMessage, status) {

        switch (status) {
            case 'error':
                this._notificationSystem.addNotification({
                    message: singleMessage,
                    level: 'error',
                    autoDismiss: 0
                });
                break;
            case 'errors':
                for (let message in singleMessage) {
                    this._notificationSystem.addNotification({
                        title: message,
                        message: singleMessage[message],
                        level: 'error',
                        autoDismiss: 0
                    });
                }
                break;
            case 'success':
                this._notificationSystem.addNotification({
                    message: singleMessage,
                    level: 'success',
                });
                break;
        }
    }

    componentDidMount() {

        this._notificationSystem = this.refs.notificationSystem;

        requestHandler.getSingleHotel(this.props.match.params.id).then(hotel => {

            if (hotel) {
                this.setState({currentHotel: hotel});
            }
        });


    }

    onSubmitHandler(e) {
        e.preventDefault();

        let hotelObj = {
            name: this.state.name,
            location: this.state.location,
            description: this.state.description,
            numberOfRooms: Number(this.state.numberOfRooms),
            image: this.state.image,
            parkingSlots: Number(this.state.parkingSlots) || 0,
        };

        requestHandler.editHotel(hotelObj, this.props.match.params.id).then(res => {

            console.log(res);
            if (res.success) {
                this._addNotification(res.message, "success");
                setTimeout(() => {
                    this.setState({redirect: true});
                }, 2000);

            } else {
                if (res.errors) {
                    this._addNotification(res.errors, "errors");
                } else {
                    this._addNotification(res.message, "error");
                }
            }
        })
    }

    render() {

        if (this.state.redirect) {
            let redirectUrl = '/hotels/details/' + this.props.match.params.id;
            return (
                <Redirect to={redirectUrl}/>
            )
        }

        return (
            <div className="container">
                <h1>Edit Hotel</h1>
                <NotificationSystem ref="notificationSystem"/>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="name"
                        value={this.state.name ? this.state.name : this.state.currentHotel.name}
                        onChange={this.onChangeHandler}
                        label="Name"
                    />
                    <Input
                        name="location"
                        value={this.state.location ? this.state.location : this.state.currentHotel.location}
                        onChange={this.onChangeHandler}
                        label="Location"
                    />
                    <Textarea
                        name="description"
                        value={this.state.description ? this.state.description : this.state.currentHotel.description}
                        onChange={this.onChangeHandler}
                        label="Description"
                    />
                    <Input
                        name="numberOfRooms"
                        value={this.state.numberOfRooms ? this.state.numberOfRooms : this.state.currentHotel.numberOfRooms}
                        onChange={this.onChangeHandler}
                        label="Number of Rooms"
                    />
                    <Input
                        name="image"
                        type="text"
                        value={this.state.image ? this.state.image : this.state.currentHotel.image}
                        onChange={this.onChangeHandler}
                        label="Image"
                    />
                    <Input
                        name="parkingSlots"
                        value={this.state.parkingSlots ? this.state.parkingSlots : this.state.currentHotel.parkingSlots}
                        onChange={this.onChangeHandler}
                        label="Parking Slots"
                    />
                    <input type="submit" className="btn btn-primary" value="Edit"/>
                </form>
            </div>
        )
    }
}

export default EditHotel;