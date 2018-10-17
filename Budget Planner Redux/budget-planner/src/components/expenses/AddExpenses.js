import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import Input from '../common/Input';
import requestHandler from '../../api/remote';
import monthUtility from '../../utils/monthUtility';

export default class AddExpenses extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            category: '',
            cost: 0,
            paymentDate: 0,
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

        let expenseObj = {
            date: Number(this.state.paymentDate),
            name: this.state.name,
            category: this.state.category,
            amount: Number(this.state.cost)

        };

        requestHandler.addNewExpenses(this.props.match.params.year, this.props.match.params.month, expenseObj).then(res => {

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
            default: break;
        }
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }

    render() {

        if (this.state.redirect) {
            let url = `/monthly/${this.props.match.params.year}/${this.props.match.params.month}`;
            return (
                <Redirect to={url}/>
            )
        }

        return (
            <main>
                <NotificationSystem ref="notificationSystem"/>
                <div className="container">
                    <div className="row space-top">
                        <div className="col-md-12">
                            <h1>Add Expenses</h1>
                            <h3>{monthUtility.getMonthByIndex(Number(this.props.match.params.month))} {this.props.match.params.year}</h3>
                        </div>
                    </div>
                    <div className="row space-top">
                        <div className="col-md-10">
                            <form onSubmit={this.onSubmitHandler}>
                                <legend>Add a new expense</legend>
                                <div className="form-group">
                                    <label className="col-md-2" htmlFor="name">Name:</label>
                                        <Input className="col-md-2"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.onChangeHandler}
                                        />
                                </div>
                                <div className="form-group">
                                    <label className="col-md-2" htmlFor="category">Category:</label>
                                    <select className="col-md-2 pl-2"
                                        onChange={this.onChangeHandler}
                                        value={this.state.category}
                                        name="category">
                                        <option value="">-/-</option>
                                        <option value="Non-essential">Non-essential</option>
                                        <option value="Fixed">Fixed</option>
                                        <option value="Variable">Variable</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-2" htmlFor="cost">Cost:</label>
                                        <Input className="col-md-2"
                                            type="number"
                                            name="cost"
                                            value={this.state.cost}
                                            onChange={this.onChangeHandler}
                                        />
                                </div>
                                <div className="form-group">
                                    <label className="col-md-2" htmlFor="paymentDate">Payment Date:</label>
                                        <Input className="col-md-2"
                                               type="number"
                                               name="paymentDate"
                                               value={this.state.paymentDate}
                                               onChange={this.onChangeHandler}
                                        />
                                </div>
                                <input type="submit" className="btn btn-secondary" value="Add"/>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}