import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import monthUtility from '../../utils/monthUtility';

export default class Balance extends Component {

    render() {
        return (
            <div className="col-md-3">
                <div className="card text-white bg-secondary">
                    <div className="card-body">
                        <blockquote className="card-blockquote">

                            <h2>{monthUtility.getMonthByIndex(this.props.id)}</h2>
                            <h4>Year {this.props.year}</h4>
                            <label htmlFor="budget">Budget:</label>
                            <input className="col-md-9" name="budget" disabled="disabled" value={this.props.budget}/>
                            <label htmlFor="balance">Balance:</label>
                            <input className="col-md-9" name="balance" disabled="disabled" value={this.props.balance}/>
                            <div className="space-top">
                                <Link className="btn btn-secondary" to={`/monthly/${this.props.year}/${this.props.id}`}>Details</Link>
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>
        )
    }
};