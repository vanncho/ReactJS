import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import requestHandler from '../../api/remote';

export default class Balance extends Component {

    constructor(props) {
        super(props);

        this.getMonthByIndex = this.getMonthByIndex.bind(this);
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

    render() {
        return (
            <div className="col-md-3">
                <div className="card text-white bg-secondary">
                    <div className="card-body">
                        <blockquote className="card-blockquote">
                            <h2>{this.getMonthByIndex(this.props.id)}</h2>
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