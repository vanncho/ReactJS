import React, {Component} from 'react';
import NotificationSystem from 'react-notification-system';

import Textarea from '../common/Textarea';
import requestHandler from '../../api/remote';
import Review from "./Review";

export default class ReviewSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: 5,
            comment: '',
            reviews: []
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this._addNotification = this._addNotification.bind(this);
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;

        requestHandler.getAllReviews(this.props.hotelId).then(res => {

            if (res) {
                this.setState({reviews: res});
            }
        })
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitHandler(e) {
        e.preventDefault();

        requestHandler.createReview(this.props.hotelId, this.state.comment, Number(this.state.rating)).then(res => {

            if (res.success) {
                this._addNotification(res.message, "success");
            } else {
                if (res.errors) {
                    this._addNotification(res.errors, "errors");
                } else {
                    this._addNotification(res.message, "error");
                }
            }

            // DYNAMIC ADD REVIEW TO VIEW !!! LIKE REFRESH
            let reviews = this.state.reviews.slice();
            reviews.push(res.review);
            this.setState({reviews: reviews});
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

    render() {

        return (
            <article>
                <NotificationSystem ref="notificationSystem"/>
                <div>
                    <form onSubmit={this.onSubmitHandler}>
                        <h2>Reviews: </h2>
                        <div>
                            <span>Rating: </span>
                            <select
                                onChange={this.onChangeHandler}
                                value={this.state.rating}
                                name="rating">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <span>Comment: </span>
                        <Textarea
                            name="comment"
                            value={this.state.comment}
                            onChange={this.onChangeHandler}
                        />
                        <input type="submit" value="Add review"/>
                    </form>
                </div>
                {this.state.reviews.map((r, i) => (
                    <Review
                        key={i}
                        user={r.user}
                        rating={r.rating}
                        comment={r.comment}
                        date={r.createdOn}
                    />
                ))}
            </article>
        )
    }
}