import React, {Component} from 'react';
import { Link, BrowserRouter, withRouter } from 'react-router-dom';

import Input from '../common/Input';
import requestHandler from '../../api/remote';
import NotificationSystem from 'react-notification-system';

class MonthlyBalance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            monthBalance: {
                expenses: []
            }
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this._addNotification = this._addNotification.bind(this);
        this.getMonthByIndex = this.getMonthByIndex.bind(this);
        this.getMonthlyBalance = this.getMonthlyBalance.bind(this);
        this.deleteExpense = this.deleteExpense.bind(this);
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;

        this.getMonthlyBalance();
    }

    getMonthlyBalance() {

        if (sessionStorage.getItem('authToken')) {

            requestHandler.getMonthlyBalance(this.props.match.params.year, this.props.match.params.month).then(data => {

                if (data) {
                    this.setState({monthBalance: data});
                }
            });
        } else {
            this.props.history.push("/login");
        }
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitHandler(e) {
        e.preventDefault();

        let balance = {
            income: Number(this.state.income || this.state.monthBalance.income),
            budget: Number(this.state.budget || this.state.monthBalance.budget)
        };

        requestHandler.updateMonthlyBalance(this.props.match.params.year, this.props.match.params.month, balance).then(res => {
            console.log(res);
            if (res.success) {
                this._addNotification(res.message, "success");
                this.getMonthlyBalance();
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

    getMonthByIndex(index) {

        let month = '';

        switch (index) {
            case 1: month = 'January'; break;
            case 2: month = 'February'; break;
            case 3: month = 'March'; break;
            case 4: month = 'April'; break;
            case 5: month = 'May'; break;
            case 6: month = 'June'; break;
            case 7: month = 'July'; break;
            case 8: month = 'August'; break;
            case 9: month = 'September'; break;
            case 10: month = 'October'; break;
            case 11: month = 'November'; break;
            case 12: month = 'December'; break;
        }

        return month;
    }

    deleteExpense(expenseId) {

        requestHandler.deleteExpense(expenseId).then(res => {

            if (res.success) {
                this._addNotification(res.message, "success");
                this.getMonthlyBalance();
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
        return (
            <main>
                <NotificationSystem ref="notificationSystem"/>
                <div className="container">
                    <div className="row space-top">
                        <div className="col-md-12">
                            <h1>Welcome to Budget Planner</h1>
                        </div>
                    </div>
                    <div className="row space-top ">
                        <div className="col-md-12 ">
                            <div className="card bg-secondary">
                                <div className="card-body">
                                    <blockquote className="card-blockquote">
                                        <h2 id="month">{this.getMonthByIndex(Number(this.props.match.params.month))} {this.props.match.params.year}</h2>
                                        <div className="row">
                                            <div className="col-md-3 space-top">
                                                <h4>Planner</h4>
                                                <form onSubmit={this.onSubmitHandler}>
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="income">Income:</label>
                                                        <Input
                                                            className="form-control"
                                                            type="number"
                                                            name="income"
                                                            value={this.state.income || this.state.monthBalance.income}
                                                            onChange={this.onChangeHandler}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="budget">Budget:</label>
                                                        <Input
                                                            className="form-control"
                                                            type="number"
                                                            name="budget"
                                                            value={this.state.budget || this.state.monthBalance.budget}
                                                            onChange={this.onChangeHandler}
                                                        />
                                                    </div>
                                                    <input type="submit" className="btn btn-secondary" value="Save"/>
                                                </form>
                                            </div>
                                            <div className="col-md-8 space-top">
                                                <div className="row">
                                                    <h4 className="col-md-9">Expenses</h4>
                                                    <Link className="btn btn-secondary ml-2 mb-2" to={`/expenses/${this.props.match.params.year}/${this.props.match.params.month}`}>Add expenses</Link>
                                                </div>
                                                <table className="table">
                                                    <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Category</th>
                                                        <th>Cost</th>
                                                        <th>Payment Date</th>
                                                        <th></th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.monthBalance.expenses.map((b, i) => {
                                                        return <tr key={i}>
                                                            <td>{b.name}</td>
                                                            <td>{b.category}</td>
                                                            <td>{b.amount}</td>
                                                            <td>{b.date}-{this.getMonthByIndex(Number(this.props.match.params.month))}-{this.props.match.params.year}</td>
                                                            <td>
                                                                <a className="btn btn-secondary" href="javascript:void(0)" onClick={(() => this.deleteExpense(b.id))}>Delete</a>
                                                            </td>
                                                        </tr>
                                                    })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default withRouter(MonthlyBalance);