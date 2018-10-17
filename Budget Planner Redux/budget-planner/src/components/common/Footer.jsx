import React, { Component } from 'react';

export default class Footer extends Component {

    constructor() {
        super();

        this.state = {
            year: 0
        }

        this.getCurrentYear = this.getCurrentYear.bind(this);
    }

    componentDidMount() {
        this.getCurrentYear();
    }

    getCurrentYear() {
        let date = new Date();
        let currYear = date.getFullYear();
        this.setState({['year']: currYear});
    }

    render() {
        return (
            <footer>
                <div className="container modal-footer">
                    <p>Budget Planner © SoftUni {this.state.year}</p>
                </div>
            </footer>
        );
    }
}