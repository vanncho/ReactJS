import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import Input from '../common/Input';
import Textarea from '../common/Textarea';
import requestHandler from '../../api/remote';

export default class CreateHotel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            location: '',
            description: '',
            numberOfRooms: 0,
            image: '',
            parkingSlots: 0,
            redirect: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this._addNotification = this._addNotification.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitHandler(e) {
        e.preventDefault();

        let hotelObj = {
            name: this.state.name,
            location: this.state.location,
            description: this.state.description,
            numberOfRooms: this.state.numberOfRooms,
            image: this.state.image,
            parkingSlots: this.state.parkingSlots || 0,
        };

        requestHandler.createHotel(hotelObj).then(res => {

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
    }

    render() {

        if (this.state.redirect) {
            return (
                <Redirect to="/"/>
            )
        }

        return (
            <div className="container">
                <h1>Add Hotel</h1>
                <NotificationSystem ref="notificationSystem"/>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        label="Name"
                    />
                    <Input
                        name="location"
                        value={this.state.location}
                        onChange={this.onChangeHandler}
                        label="Location"
                    />
                    <Textarea
                        name="description"
                        value={this.state.description}
                        onChange={this.onChangeHandler}
                        label="Description"
                    />
                    <Input
                        name="numberOfRooms"
                        value={Number(this.state.numberOfRooms)}
                        onChange={this.onChangeHandler}
                        label="Number of Rooms"
                    />
                    <Input
                        name="image"
                        type="text"
                        value={this.state.image}
                        onChange={this.onChangeHandler}
                        label="Image"
                    />
                    <Input
                        name="parkingSlots"
                        value={Number(this.state.parkingSlots)}
                        onChange={this.onChangeHandler}
                        label="Parking Slots"
                    />
                    <input type="submit" className="btn btn-primary" value="Add"/>
                </form>
            </div>
        );
    }
}